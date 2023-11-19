<p align="center">
  <a href="https://plasmo.com">
    <img alt="plasmo logo" width="75%" src="https://www.plasmo.com/assets/banner-black-on-white.png" />
  </a>
</p>

<p align="center">
  <a aria-label="License" href="./LICENSE">
    <img alt="See License" src="https://img.shields.io/npm/l/plasmo"/>
  </a>
  <a aria-label="NPM" href="https://www.npmjs.com/package/@plasmohq/storage">
    <img alt="NPM Install" src="https://img.shields.io/npm/v/@plasmohq/storage?logo=npm"/>
  </a>
  <a aria-label="Twitter" href="https://www.twitter.com/plasmohq">
    <img alt="Follow PlasmoHQ on Twitter" src="https://img.shields.io/twitter/follow/plasmohq?logo=twitter"/>
  </a>
  <a aria-label="Twitch Stream" href="https://www.twitch.tv/plasmohq">
    <img alt="Watch our Live DEMO every Friday" src="https://img.shields.io/twitch/status/plasmohq?logo=twitch&logoColor=white"/>
  </a>
  <a aria-label="Discord" href="https://www.plasmo.com/s/d">
    <img alt="Join our Discord for support and chat about our projects" src="https://img.shields.io/discord/946290204443025438?logo=discord&logoColor=white"/>
  </a>
</p>

# @plasmohq/storage

`@plasmohq/storage` is an utility library from [plasmo](https://www.plasmo.com/) that abstract away the persistent storage API available to browser extension. It fallbacks to localstorage in context where the extension storage API is not available, allowing for state sync between popup - options - contents - background.

> This library will enable the `storage` permission automatically if used with the [Plasmo framework](https://docs.plasmo.com)

## Documentation

Visit: [https://docs.plasmo.com/framework/storage](https://docs.plasmo.com/framework/storage)

## Firefox

To use the storage API on Firefox during development you need to add an addon ID to your manifest, otherwise, you will get this error:

> Error: The storage API will not work with a temporary addon ID. Please add an explicit addon ID to your manifest. For more information see https://mzl.la/3lPk1aE.

To add an addon ID to your manifest, add this to your package.json:

```JSON
"manifest": {
  "browser_specific_settings": {
    "gecko": {
      "id": "your-id@example.com"
    }
  }
}
```

During development, you may use any ID. If you have published your extension, you can use the ID assigned by Mozilla Addons.

## Usage Examples

- [MICE](https://github.com/PlasmoHQ/mice)
- [World Edit](https://github.com/PlasmoHQ/world-edit)
- [with-storage](https://github.com/PlasmoHQ/examples/tree/main/with-storage)
- [with-redux](https://github.com/PlasmoHQ/examples/tree/main/with-redux)

## Why?

> To boldly go where no one has gone before

## License

[MIT](./LICENSE) 🖖 [Plasmo Corp.](https://plasmo.com)
