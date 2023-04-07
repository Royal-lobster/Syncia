import React from "react";
import { useOpenAIKey } from "../../../../hooks/useOpenAIKey";

const Auth = () => {
	const [, setOpenAiKey] = useOpenAIKey();
	const handleOpenAiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const key = data.get("openAiKey");
		if (key) {
			setOpenAiKey(key as string);
		}
	};
	return (
		<form
			onSubmit={handleOpenAiKeySubmit}
			className="ChatDockX-flex ChatDockX-flex-col ChatDockX-p-6 ChatDockX-text-center ChatDockX-justify-center ChatDockX-items-center ChatDockX-h-full"
		>
			<div className="ChatDockX-text-2xl ChatDockX-mt-48">
				Enter your OpenAI API key
			</div>
			<div className="ChatDockX-text-sm ChatDockX-text-gray-400 ChatDockX-mt-2">
				You can get one{" "}
				<a
					href="https://beta.openai.com/account/api-keys"
					target="_blank"
					rel="noreferrer"
					className="text-blue-400"
				>
					here
				</a>
			</div>
			<div className="ChatDockX-text-sm ChatDockX-text-gray-400 ChatDockX-mt-2">
				It should look something like this:
			</div>
			<div className="ChatDockX-text-sm ChatDockX-text-gray-400 ChatDockX-mt-2">
				sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
			</div>
			<input
				name="openAiKey"
				placeholder="Enter your OpenAI API key"
				className="ChatDockX-mt-4 ChatDockX-text-center ChatDockX-p-2 ChatDockX-w-full ChatDockX-rounded-md ChatDockX-border dark:ChatDockX-border-neutral-600 ChatDockX-border-neutral-200 dark:ChatDockX-bg-neutral-800/95 ChatDockX-bg-neutral-200/95 focus:ChatDockX-outline-none focus:ChatDockX-ring-2 focus:ChatDockX-ring-blue-900 focus:ChatDockX-ring-opacity-50"
				pattern="sk-[a-zA-Z0-9]{48}"
			/>
			<button
				type="submit"
				className="ChatDockX-mt-4 ChatDockX-p-2 ChatDockX-w-full ChatDockX-rounded-md ChatDockX-border dark:ChatDockX-border-neutral-600 ChatDockX-border-neutral-200 dark:ChatDockX-bg-neutral-800/95 ChatDockX-bg-neutral-200/95 focus:ChatDockX-outline-none focus:ChatDockX-ring-2 focus:ChatDockX-ring-blue-900 focus:ChatDockX-ring-opacity-50"
			>
				Submit
			</button>
			<div className="ChatDockX-text-sm ChatDockX-text-gray-400 ChatDockX-mt-2">
				(Note: we only store your key locally. We do not send it anywhere. You
				can check the{" "}
				<a
					href="https://github.com/Royal-lobster/ChatDockX"
					className="ChatDockX-text-blue-400"
				>
					source code
				</a>{" "}
				and inspect network tab to verify this.)
			</div>
		</form>
	);
};

export default Auth;
