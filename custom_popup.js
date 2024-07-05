chrome.storage.local.get('category', (result) => {
    if (result.category) {
        document.getElementById('category').textContent = result.category;
    } else {
        document.getElementById('category').textContent = 'No category found';
    }
});

// Listen for messages from the parent window to update the popup content
window.addEventListener('message', (event) => {
    if (event.data === 'updatePopup') {
        chrome.storage.local.get('category', (result) => {
            if (result.category) {
                document.getElementById('category').textContent = result.category;
            } else {
                document.getElementById('category').textContent = 'No category found';
            }
        });
    }
});
