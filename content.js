let timer = null;
let lastText = '';
let popupDiv = null;

// Get selection rectangle
function getSelectionRect() {
    const sel = window.getSelection();
    if (!sel.rangeCount) return null;
    const range = sel.getRangeAt(0).cloneRange();
    if (range.collapsed) return null;
    return range.getBoundingClientRect();
}

// Create popup div
function createPopup() {
    if (!popupDiv) {
        popupDiv = document.createElement('div');
        popupDiv.style.position = 'absolute';
        popupDiv.style.zIndex = 9999;
        popupDiv.style.minWidth = '250px';
        popupDiv.style.padding = '8px';
        popupDiv.style.background = '#fff';
        popupDiv.style.border = '1px solid #ccc';
        popupDiv.style.borderRadius = '4px';
        popupDiv.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
        popupDiv.style.fontFamily = 'Arial, sans-serif';

        // Textarea for selected text
        const textarea = document.createElement('textarea');
        textarea.id = 'popupSource';
        textarea.style.width = '100%';
        textarea.style.height = '50px';
        popupDiv.appendChild(textarea);

        // Save button
        const saveBtn = document.createElement('button');
        saveBtn.textContent = '★ Save';
        saveBtn.style.marginTop = '5px';
        popupDiv.appendChild(saveBtn);

        // Translation result div
        const resultDiv = document.createElement('div');
        resultDiv.id = 'translationResult';
        resultDiv.style.marginTop = '8px';
        resultDiv.style.padding = '5px';
        resultDiv.style.background = '#f0f0f0';
        resultDiv.style.borderRadius = '4px';
        resultDiv.style.minHeight = '40px';
        popupDiv.appendChild(resultDiv);

        // Save button click
        saveBtn.onclick = async () => {
            const text = textarea.value.trim(); // English
            const translated = popupDiv.querySelector('#translationResult').textContent.trim(); // Persian
            if (!text || !translated) return;

            const { saved = [] } = await chrome.storage.sync.get('saved');
            const index = saved.findIndex(item => item.source === text);

            if (index >= 0) {
                // Remove saved word
                saved.splice(index, 1);
            } else {
                // Add new word
                saved.unshift({
                    id: crypto.randomUUID(),
                    source: text,
                    translated: translated,
                    time: Date.now()
                });
            }

            await chrome.storage.sync.set({ saved });

            // Update button text
            updateSaveButton(text);
        };


        document.body.appendChild(popupDiv);
    }
    return popupDiv;
}

// Update save button text
async function updateSaveButton(text) {
    if (!popupDiv) return;
    const saveBtn = popupDiv.querySelector('button');
    const { saved = [] } = await chrome.storage.sync.get('saved');
    const exists = saved.some(item => item.source === text);

    saveBtn.textContent = exists ? 'Saved' : '★ Save';
};



// Show popup under selection
function showPopupAtSelection(text) {
    const rect = getSelectionRect();
    if (!rect) return;

    const popup = createPopup();
    popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.querySelector('#popupSource').value = text;
    popup.style.display = 'block';

    // Translate automatically
    translateTextToPersian(text);

    // Update save button
    updateSaveButton(text);
}

// Hide popup
function hidePopup() {
    if (popupDiv) popupDiv.style.display = 'none';
}

// Translate English → Persian
async function translateTextToPersian(text) {
    const resultDiv = popupDiv.querySelector('#translationResult');
    if (!text) {
        resultDiv.textContent = '';
        return;
    }

    resultDiv.textContent = 'Translating…';

    try {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fa&dt=t&q=${encodeURIComponent(text)}`);
        const data = await res.json();
        const translated = data[0].map(item => item[0]).join('');
        resultDiv.textContent = translated;
    } catch (err) {
        resultDiv.textContent = 'Error translating';
        console.error(err);
    }
}

// Listen for selection changes
document.addEventListener('selectionchange', () => {
    clearTimeout(timer);
    const text = window.getSelection().toString().trim();
    if (!text) {
        hidePopup();
        return;
    }

    timer = setTimeout(() => {
        if (text !== lastText) {
            lastText = text;
            showPopupAtSelection(text);
        }
    }, 500);
});

// Hide popup when clicking outside
document.addEventListener('mousedown', (e) => {
    if (popupDiv && !popupDiv.contains(e.target)) hidePopup();
});
