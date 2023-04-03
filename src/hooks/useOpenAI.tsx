import React, { useEffect, useState } from "react";
import { SSE } from "sse";
import { useStorage } from "./useStorage";

export enum GPT35 {
  TURBO = "gpt-3.5-turbo",
  TURBO_0301 = "gpt-3.5-turbo-0301",
}

export enum GPT4 {
  BASE = "gpt-4",
  BASE_0314 = "gpt-4-0314",
  BASE_32K = "gpt-4-32k",
  BASE_32K_0314 = "gpt-4-32k-0314",
}

export enum ChatRole {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
}

interface ChatMessageIncomingChunk {
  content?: string;
  role?: string;
}

export interface OpenAIChatMessage {
  content: string;
  role: string;
}

export interface ChatMessageToken extends OpenAIChatMessage {
  timestamp: number;
}

export interface ChatMessageParams extends OpenAIChatMessage {
  timestamp?: number;
  meta?: {
    loading?: boolean;
    responseTime?: string;
    chunks?: ChatMessageToken[];
  };
}

export interface ChatMessage extends ChatMessageParams {
  timestamp: number;
  meta: {
    loading: boolean;
    responseTime: string;
    chunks: ChatMessageToken[];
  };
}

export interface OpenAIStreamingProps {
  apiKey: string;
  model: GPT35 | GPT4;
  systemPrompt?: string;
}

const CHAT_COMPLETIONS_URL = "https://api.openai.com/v1/chat/completions";

// Utility method for transforming a chat message decorated with metadata to a more limited shape
// that the OpenAI API expects.
const officialOpenAIParams = ({
  content,
  role,
}: ChatMessage): OpenAIChatMessage => ({ content, role });

// Utility method for transforming a chat message that may or may not be decorated with metadata
// to a fully-fledged chat message with metadata.
const createChatMessage = ({
  content,
  role,
  ...restOfParams
}: ChatMessageParams): ChatMessage => ({
  content,
  role,
  timestamp: restOfParams.timestamp || Date.now(),
  meta: {
    loading: false,
    responseTime: "",
    chunks: [],
    ...restOfParams.meta,
  },
});

export const useChatCompletion = ({
  model,
  apiKey,
  systemPrompt,
}: OpenAIStreamingProps) => {
  const systemMessage = [
    {
      content: systemPrompt || "",
      role: ChatRole.SYSTEM,
      timestamp: Date.now(),
      meta: {
        loading: false,
        responseTime: "",
        chunks: [],
      },
    },
  ];

  const [storedMessages, setStoredMessages] = useStorage<ChatMessage[]>(
    "CHAT_MESSAGES",
    systemMessage,
    "sync"
  );

  const [messages, setMessages] = useState<ChatMessage[]>(systemMessage);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (storedMessages.length > 1 && messages.length <= 1) {
      setMessages(storedMessages);
    }
  }, [storedMessages]);

  useEffect(() => {
    if (messages.length > 1 && !messages[messages.length - 1].meta.loading) {
      setStoredMessages(messages);
      setLoading(false);
    } else if (messages.length > 1) {
      setLoading(true);
    }
  }, [messages]);

  let source: SSE | null = null;

  const submitQuery = React.useCallback(
    (newMessages?: ChatMessageParams[]) => {
      // If the array is empty or there are no new messages submited, that is a special request to
      // clear the `messages` queue and prepare to start over, do not make a request.
      if (!newMessages || newMessages.length < 1) {
        setMessages(systemMessage);
        return;
      }

      // Don't let two streaming calls occur at the same time. If the last message in the list has
      // a `loading` state set to true, we know there is a request in progress.
      if (messages[messages.length - 1]?.meta?.loading) return;

      // Record the timestamp before the request starts.
      const beforeTimestamp = Date.now();

      // Update the messages list with the new message as well as a placeholder for the next message
      // that will be returned from the API.
      const updatedMessages: ChatMessage[] = [
        ...messages,
        ...newMessages.map(createChatMessage),
        createChatMessage({ content: "", role: "", meta: { loading: true } }),
      ];

      // Set the updated message list.
      setMessages(updatedMessages);

      // The payload of the SSE request itself.
      const payload = JSON.stringify({
        model,
        // Filter out the last message, since technically that is the message that the server will
        // return from this request, we're just storing a placeholder for it ahead of time to signal
        // to the UI something is happening.
        // Map the updated message structure to only what the OpenAI API expects.
        messages: updatedMessages
          .filter((m, i) => updatedMessages.length - 1 !== i)
          .map(officialOpenAIParams),
        stream: true,
      });

      // Define the headers for the request.
      const CHAT_HEADERS = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      // Create the SSE request to the OpenAI chat completion API endpoint
      source = new SSE(CHAT_COMPLETIONS_URL, {
        headers: CHAT_HEADERS,
        method: "POST",
        payload,
      });

      // For each chunk received, process it and store it in the latest message.
      source.addEventListener("message", (e) => {
        // If a DONE token is found, the stream has been terminated.
        if (e?.data !== "[DONE]") {
          // Parse the data from the update.
          const payload = JSON.parse(e?.data || "{}");
          const chunk: ChatMessageIncomingChunk = payload?.choices?.[0]?.delta;

          // Update the messages list, specifically update the last message entry with the most
          // recently received chunk.
          setMessages((msgs) =>
            msgs.map((message, i) => {
              if (updatedMessages.length - 1 === i) {
                return {
                  content: message.content + (chunk?.content || ""),
                  role: message.role + (chunk?.role || ""),
                  timestamp: 0,
                  meta: {
                    ...message.meta,
                    chunks: [
                      ...message.meta.chunks,
                      {
                        content: chunk?.content || "",
                        role: chunk?.role || "",
                        timestamp: Date.now(),
                      },
                    ],
                  },
                };
              }

              return message;
            })
          );
        } else {
          if (source) source.close();
        }
      });

      // Add an event listener for when the connection closes.
      source.addEventListener("readystatechange", (e) => {
        // readyState: 0 - connecting, 1 - open, 2 - closed
        if (e.readyState && e.readyState > 1) {
          // Determine the final timestamp, and calculate the number of seconds the full request took.
          const afterTimestamp = Date.now();
          const diffInSeconds = (afterTimestamp - beforeTimestamp) / 1000;
          const formattedDiff = diffInSeconds.toFixed(2) + " sec.";

          // Update the messages list, specifically update the last message entry with the final
          // details of the full request/response.
          setMessages((msgs) =>
            msgs.map((message, i) => {
              if (updatedMessages.length - 1 === i) {
                return {
                  ...message,
                  timestamp: afterTimestamp,
                  meta: {
                    ...message.meta,
                    loading: false,
                    responseTime: formattedDiff,
                  },
                };
              }

              return message;
            })
          );
        }
      });

      source.stream();
    },
    [messages, setMessages]
  );

  const cancelRequest = React.useCallback(() => {
    if (source) source.close();
    source = null;
  }, [source]);

  const clearMessages = React.useCallback(() => {
    setMessages(systemMessage);
    setStoredMessages(systemMessage);
  }, [setMessages]);

  return { messages, submitQuery, loading, clearMessages, cancelRequest };
};
