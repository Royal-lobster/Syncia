---
"syncia": patch
---

Fix storage quota exceeded error for embeddings

Previously, the application would fail when trying to store large embeddings in localStorage due to quota limitations. This patch:

- Transitions from localStorage to IndexedDB for storing embeddings
- Implements new functions `saveToIndexedDB` and `getFromIndexedDB`
- Resolves the "QuotaExceededError" when storing large datasets

This change improves the application's ability to handle larger embeddings without storage constraints.
