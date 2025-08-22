chrome.runtime.onMessage.addListener(async (msg, sender) => {
    if (msg.type === 'showPopupUnderSelection') {
        // Save selected text in local storage
        await chrome.storage.local.set({ injectedSelection: msg.text });
        // Open the popup (default popup from manifest)
        chrome.action.openPopup();
    }
});
