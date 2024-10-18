# syncia

## 1.5.1

### Patch Changes

- 7181acf3: bug fix on save settings

## 1.5.0

### Minor Changes

- 14e0dcff: - Support change Base URL
  - Support gpt-4o-mini
  - Scroll to bottom after message list updated

## 1.4.3

### Patch Changes

- 36d7b91e: Fix Stop button not working
- c041ecdd: openAI project apikey input on welcome screen

## 1.4.2

### Patch Changes

- d7193c5a: Marks GPT-4o model as vision model

## 1.4.1

### Patch Changes

- c1b7113f: Adds GPT 4o support

## 1.4.0

### Minor Changes

- bbd3b290: Adds prompt selection and model selection with in sidebar input

### Patch Changes

- c2ec2037: - Refactor class names to inline styles in the ChatHistory component.
  - Update Open AI key links to correct platform URLs.
  - Revise model naming for better readability.
  - Fix typo: change 'modal' to 'model', which affects Local Storage.
  - Update the Chat component to compare using GPT-4 Turbo instead of GPT-4 Vision.

## 1.3.0

### Minor Changes

- 8cffc3c2: Local Model support with ollama

## 1.2.2

### Patch Changes

- 1d6ba89a: Update GPT 4 and 3.5 turbo models to 0125

## 1.2.1

### Patch Changes

- 145983b0: - Fixes unable to select between models
  - Fixes unable to select between modes

## 1.2.0

### Minor Changes

- 7abe7ae9: - adds ability to remove messages
  - makes screenshots to show all with object fit contain
  - fixed model names showing numbers
  - make open ai key show and hide and hide by default
- 97de2b32: Better loading and error handling
- 806e8ce6: Stable Screenshot tool with GPT Vision

### Patch Changes

- 9efbfd67: Fixes screenshot tool images not loading up back to existing chat
- afc23972: Fixes preview to open image in new tab properly
- 1bd4d196: - adds question field not embedding when context is turned on
  - fixes preview bar showing when there is no files

## 1.1.0

### Minor Changes

- 3f1420c5: Adds webpage context
- d4458e3f: Implements image capture for GPT 4 Vision

## 1.0.1

### Patch Changes

- 260a23d3: fix new chat button on light mode

## 1.0.0

### Major Changes

- 0a01afa: - [NEW FEATURE 🌟]: Brings Chat History to Syncia !
  - Now Syncia uses langchain to manage chat

### Minor Changes

- 7382696: Adds ability to select text actions via native context menu

### Patch Changes

- 70a43de: Change package name

## 0.0.3

### Patch Changes

- bd54d42: Fixes workflow to publish
- fdd847e: Adds error state instead of alert on invalid api key on auth screen
