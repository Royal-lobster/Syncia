const resetText =
  "[To bot] Do not generate answer with filler words, unnecessary information or sentences that don't add value. No Self Reference, No openers. No Quotes. Just go straight to answer"
const retainLang =
  '[To bot] Respond with same language variety and dialect as the original text.'

export const defaultPrompts = [
  {
    sectionName: 'Review Selection',
    items: [
      {
        name: 'Summarize',
        prompt: [
          '#### Instructions',
          '- I am going to provide you with a text and you will summarize it.',
          `- ${retainLang}`,
          `- ${resetText}`,
          '- No more than half the length of the original text.',
        ].join('\n'),
      },
      {
        name: 'Simplify language',
        prompt: [
          '*Instructions*',
          `- ${resetText}`,
          '- Below is a text that is written in a complex language.',
          '- I want you to simplify it as much as possible.',
          `- ${retainLang}`,
        ].join('\n'),
      },
      {
        name: 'Translate',
        prompt: [
          '#### Instructions',
          '- Take the given text and translate it into a language of my choice.',
          `- ${resetText}`,
          '- Now ask me which language you should translate it into. After which you will translate it into that language.',
        ].join('\n'),
      },
      {
        name: 'Key takeaways',
        prompt: [
          '#### Instructions',
          '- Take in the following text and identify the key takeaways.',
          `- ${resetText}`,
          `- ${retainLang}`,
          '- Present it in a list format.',
          '- Start directly with first point.',
        ].join('\n'),
      },
    ],
  },
  {
    sectionName: 'Edit Selection',
    items: [
      {
        name: 'Fix spelling and grammar',
        prompt: [
          '#### Instructions',
          '- You are a proofreader and you are going to proofread the following text.',
          `- ${resetText}`,
          '- First, you will include the corrected text,',
          'later talk about the mistakes you found and how you corrected them.',
        ].join('\n'),
      },
      {
        name: 'Change tone',
        items: [
          {
            name: 'Professional',
            prompt: [
              '#### Instructions',
              "- Take the following text and change it's tone to professional.",
              `- ${retainLang}`,
              `- ${resetText}`,
            ].join('\n'),
          },
          {
            name: 'Casual',
            prompt: [
              '#### Instructions',
              "- Take the following text and change it's tone to casual.",
              `- ${retainLang}`,
              `- ${resetText}`,
            ].join('\n'),
          },
          {
            name: 'Straight forward',
            prompt: [
              '#### Instructions',
              "- Take the following text and change it's tone to straight forward.",
              `- ${retainLang}`,
              `- ${resetText}`,
            ].join('\n'),
          },
          {
            name: 'Friendly',
            prompt: [
              '#### Instructions',
              "- Take the following text and change it's tone to friendly.",
              `- ${retainLang}`,
              `- ${resetText}`,
            ].join('\n'),
          },
          {
            name: 'Confident',
            prompt: [
              '#### Instructions',
              "- Take the following text and change it's tone to confident.",
              `- ${retainLang}`,
              `- ${resetText}`,
            ].join('\n'),
          },
        ],
      },
      {
        name: 'Make shorter',
        prompt: [
          '#### Instructions',
          '- Read the following text and make it shorter.',
          `- ${retainLang}`,
          `- ${resetText}`,
        ].join('\n'),
      },
      {
        name: 'Make longer',
        prompt: [
          '#### Instructions',
          '- Read the following text and make it longer.',
          `- ${retainLang}`,
          `- ${resetText}`,
        ].join('\n'),
      },
    ],
  },
  {
    sectionName: 'Reply',
    items: [
      {
        name: 'Reply positively',
        prompt: [
          '#### Instructions',
          '- Read the following text and reply positively',
          `- ${resetText}`,
        ].join('\n'),
      },
      {
        name: 'Reply negatively',
        prompt: [
          '#### Instructions',
          '- Read the following text and reply negatively',
          `- ${resetText}`,
        ].join('\n'),
      },
      {
        name: 'Needs information',
        prompt: [
          '#### Instructions',
          '- Read the following text and reply with a question that needs information.',
          `- ${resetText}`,
        ].join('\n'),
      },
    ],
  },
]
