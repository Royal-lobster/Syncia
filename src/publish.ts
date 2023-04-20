import { publishExtension } from 'publish-browser-extension'

publishExtension({
  dryRun: true,
  chrome: {
    zip: 'artifacts/chrome.zip',
    extensionId: '<cws-extension-id>',
    clientId: '<gcp-client-id>',
    clientSecret: '<gcp-client-secret>',
    refreshToken: '<gcp-refresh-token>',
    publishTarget: '<default|trustedTesters>',
    skipSubmitReview: false,
  },
})
  .then((results) => console.log(results))
  .catch((err) => console.error(err))
