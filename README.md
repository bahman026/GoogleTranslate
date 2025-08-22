# GoogleTranslate


# Translate & Vocab Chrome Extension

**GoogleTranslate** is a Chrome extension that allows you to quickly translate selected English text to Persian, save vocabulary, and manage it across devices. You can also export all saved words as a CSV file for study or reference.

---

## Features

- **Floating Popup:** Automatically appears below selected text on any webpage.
- **Translation:** Translates English text to Persian.
- **Save Vocabulary:** Save English → Persian pairs directly from the floating popup.
- **Toggle Save/Remove:** Click the Save button to save a word, or click again to remove it.
- **Export CSV:** Export all saved vocabulary from the extension popup.
- **Remove All:** Clear all saved vocabulary at once.
- **Sync Across Devices:** Vocabulary is stored in `chrome.storage.sync` and syncs across devices using the same Google account.

---

## Installation (Developer Mode)

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the extension folder.
5. The extension icon will appear near the address bar.

---

## Usage

1. Select any English text on a webpage.
2. A floating popup appears below your selection showing the Persian translation.
3. Click **★ Save** to save the word, or click again to remove it.
4. Click the extension icon to open the main popup:
   - **Export CSV:** Download all saved words in CSV format.
   - **Remove All:** Delete all saved words.

---

## File Structure

```

my\_translate\_extension/
│
├─ manifest.json         # Chrome extension manifest
├─ content.js            # Handles selection, popup, translation, and save
├─ popup.html            # Extension popup UI (Export CSV / Remove All)
├─ popup.js              # Handles export and remove logic
├─ background.js         # Background script (if needed)
├─ icon16.png            # Extension icons
├─ icon48.png
└─ icon128.png

```

---

## Permissions

- `storage` – Save vocabulary and sync across devices.
- `activeTab` – Read selected text on the current tab.
- `scripting` – Inject content scripts into web pages.

---

## License

MIT License © [Your Name]
