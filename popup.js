chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'compare') {
        document.getElementById('category').textContent = request.category;
    }
});
