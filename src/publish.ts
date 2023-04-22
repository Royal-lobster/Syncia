import { publishExtension } from 'publish-browser-extension'

publishExtension({
  dryRun: true,
  chrome: {
    zip: 'artifacts/chrome.zip',
    extensionId: '',
    clientId: process.env.CHROME_CLIENT_ID as string,
    clientSecret: process.env.CHROME_CLIENT_SECRET as string,
    refreshToken: process.env.CHROME_REFRESH_TOKEN as string,
    publishTarget: 'default',
    skipSubmitReview: false,
  },
})
  .then((results) => console.log(results))
  .catch((err) => console.error(err))
