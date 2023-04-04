## Minimalist OpenAI Chrome Extension Starter Using React, Vite, TailwindCSS and OpenAI

## Installation

Replace `.env.example` with `.env` and insert your OpenAI key as the value for `VITE_Open_AI_Key`

In the `src/utils` folder, you will find the reconfigured openai function to be imported and used within other modules.

## Loading unpacked extension

1. Go to the Extensions page by entering chrome://extensions in a new tab. (By design chrome:// URLs are not linkable.)

Alternatively, click on the Extensions menu puzzle button and select Manage Extensions at the bottom of the menu.
Or, click the Chrome menu, hover over More Tools, then select Extensions.

2. Enable Developer Mode by clicking the toggle switch next to Developer mode.

3. Click the Load unpacked button and select the extension directory.

## CRXJS Vite Plugin

This starter uses CRXJS Vite plugin.

CRXJS Vite Plugin is a tool that helps you make Chrome Extensions using modern web development technology.

Things like HMR and static asset imports work out of the box so you can get started making a modern Chrome Extension, not configuring build tools.

CRXJS parses manifest.json to find the files to include in your extension. The manifest is the central document that declares most of the files and configuration for your extension, why do we need more?

[Docs](https://crxjs.dev/vite-plugin/)

## Chrome extension guidelines

- If you update content script, refresh the extension in chrome 'manage extensions' page
