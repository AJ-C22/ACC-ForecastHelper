document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('category', (result) => {
        if (result.category) {
            document.getElementById('category').textContent = result.category;
        } else {
            document.getElementById('category').textContent = 'No category found';
        }
    });
});
