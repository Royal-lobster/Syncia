const resetText =
  "[To bot] Do not generate answer with filler words, unnecessary information or sentences that don't add value. No Self Reference, No openers. No Quotes. Just go straight to answer"
const retainLang =
  '[To bot] Respond with same language variety and dialect as the original text.'

export const promptOptions = [
  {
    sectionName: 'Review Selection',
    items: [
      {
        name: 'Summarize',
        prompt: `#### Instructions
        - I am going to provide you with a text and you will summarize it. 
        - ${retainLang} 
        - ${resetText} 
        - No more than half the length of the original text.`,
      },
      {
        name: 'Simplify language',
        prompt: `*Instructions*
        - ${resetText} 
        - Below is a text that is written in a complex language. 
        - I want you to simplify it as much as possible.
        - ${retainLang}`,
      },
      {
        name: 'Translate',
        prompt: `#### Instructions
        - Take the given text and translate it into a language of my choice.
        - ${resetText} 
        - Now ask me which language you should translate it into. After which you will translate it into that language.`,
      },
      {
        name: 'Key takeaways',
        prompt: `#### Instructions
        - Take in the following text and identify the key takeaways.
        - ${resetText}
        - ${retainLang}
        - Present it in a list format. 
        - Start directly with first point.`,
      },
    ],
  },
  {
    sectionName: 'Edit Selection',
    items: [
      {
        name: 'Fix spelling and grammar',
        prompt: `#### Instructions
        - You are a proofreader and you are going to proofread the following text.
        - ${resetText}
        - First, you will include the corrected text, 
        later talk about the mistakes you found and how you corrected them.`,
      },
      {
        name: 'Change tone',
        items: [
          {
            name: 'Professional',
            prompt: `#### Instructions
            - Take the following text and change it's tone to professional.
            - ${resetText}`,
          },
          {
            name: 'Casual',
            prompt: `#### Instructions
            - Take the following text and change it's tone to casual.
            - ${resetText}`,
          },
          {
            name: 'Straight forward',
            prompt: `#### Instructions
            - Take the following text and change it's tone to straight forward.
            - ${resetText}`,
          },
          {
            name: 'Friendly',
            prompt: `#### Instructions
            - Take the following text and change it's tone to friendly.
            - ${resetText}`,
          },
          {
            name: 'Confident',
            prompt: `#### Instructions
            - Take the following text and change it's tone to confident.
            - ${resetText}`,
          },
        ],
      },
      {
        name: 'Make shorter',
        prompt: `#### Instructions
        - Read the following text and make it shorter.
        - ${retainLang}
        - ${resetText}`,
      },
      {
        name: 'Make longer',
        prompt: `#### Instructions
        - Read the following text and make it longer.
        - ${retainLang}
        - ${resetText}`,
      },
    ],
  },
  {
    sectionName: 'Reply',
    items: [
      {
        name: 'Reply positively',
        prompt: `#### Instructions
        - Read the following text and reply positively
        - ${resetText}`,
      },
      {
        name: 'Reply negatively',
        prompt: `#### Instructions
        - Read the following text and reply negatively
        - ${resetText}`,
      },
      {
        name: 'Needs information',
        prompt: `#### Instructions
        - Read the following text and reply with a question that needs information.
        - ${resetText}`,
      },
    ],
  },
]
