export const promptOptions = [
  {
    sectionName: 'Review Selection',
    items: [
      {
        name: 'Summarize',
        prompt:
          'Read the following text and summarize in brief what it is about',
      },
      {
        name: 'Simplify language',
        prompt: "Read the following text and simplify it's language",
      },
      {
        name: 'Translate',
        prompt: 'Read the following text and translate it to language i want.',
      },
      {
        name: 'Key takeaways',
        prompt:
          "Read the following text and list it's key takeaways in bullet points",
      },
    ],
  },
  {
    sectionName: 'Edit Selection',
    items: [
      {
        name: 'Fix spelling and grammar',
        prompt: 'Read the following text and fix spelling and grammar',
      },
      {
        name: 'Change tone',
        items: [
          {
            name: 'Professional',
            prompt:
              "Read the following text and change it's tone to professional",
          },
          {
            name: 'Casual',
            prompt: "Read the following text and change it's tone to casual",
          },
          {
            name: 'Straight forward',
            prompt:
              "Read the following text and change it's tone to straight forward",
          },
          {
            name: 'Friendly',
            prompt: "Read the following text and change it's tone to friendly",
          },
          {
            name: 'Confident',
            prompt: "Read the following text and change it's tone to confident",
          },
        ],
      },
      {
        name: 'Make shorter',
        prompt: 'Read the following text and make it shorter',
      },
      {
        name: 'Make longer',
        prompt: 'Read the following text and make it longer',
      },
    ],
  },
]
