document.getElementById('exportBtn').addEventListener('click', async () => {
    const { saved = [] } = await chrome.storage.sync.get('saved');
    if (!saved.length) {
        alert('No saved words');
        return;
    }

    let csv = 'English,Persian,Time\n';
    saved.forEach(item => {
        const source = item.source.replace(/"/g, '""');
        const translated = (item.translated || '').replace(/"/g, '""');
        csv += `"${source}","${translated}","${new Date(item.time).toLocaleString()}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'vocabulary.csv';
    a.click();
    URL.revokeObjectURL(url);
});


// Export CSV
document.getElementById('exportBtn').addEventListener('click', async () => {
    const { saved = [] } = await chrome.storage.sync.get('saved');
    if (!saved.length) return alert('No saved words');

    let csv = 'English,Persian,Time\n';
    saved.forEach(item => {
        const source = item.source.replace(/"/g, '""');
        const translated = (item.translated || '').replace(/"/g, '""');
        csv += `"${source}","${translated}","${new Date(item.time).toLocaleString()}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'vocabulary.csv';
    a.click();
    URL.revokeObjectURL(url);
});

// Remove All vocabulary
document.getElementById('removeAllBtn').addEventListener('click', async () => {
    const confirmDelete = confirm('Are you sure you want to remove all saved vocabulary?');
    if (!confirmDelete) return;

    await chrome.storage.sync.set({ saved: [] });
    alert('All saved vocabulary removed!');
});

