document.addEventListener('mouseup', function() {
    let selection = window.getSelection().toString().trim();
    if (selection !== '') {
        chrome.runtime.sendMessage({ action: 'compare', selectedText: selection });
    }
});