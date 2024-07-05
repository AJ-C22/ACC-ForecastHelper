document.addEventListener("mouseup", (event) => {
    const selectedText = window.getSelection().toString().trim();
    console.log("Selected text:", selectedText);

    if (selectedText !== "") {
        chrome.runtime.sendMessage({ message: "highlightedCode", highlightedCode: selectedText }, (response) => {
            console.log("Received response from background.js:", response);

            // Store the response in local storage
            chrome.storage.local.set({ category: response.category }, () => {
                // Inject the custom popup into the page
                injectCustomPopup();
            });
        });
    }
});

function injectCustomPopup() {
    // Check if the popup already exists
    const existingPopup = document.getElementById('custom-popup');
    if (existingPopup) {
        // If it exists, just update the content
        updatePopupContent();
        return;
    }

    // Create a new iframe element for the popup
    const iframe = document.createElement('iframe');
    iframe.id = 'custom-popup';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '10px';
    iframe.style.right = '10px';
    iframe.style.width = '300px';
    iframe.style.height = 'auto';
    iframe.style.zIndex = '10000';
    iframe.style.border = 'none';
    iframe.src = chrome.runtime.getURL('custom_popup.html');

    // Append the iframe to the body
    document.body.appendChild(iframe);

    // Add an event listener to toggle the popup visibility when clicked
    iframe.addEventListener('click', () => {
        if (iframe.style.display === 'none') {
            iframe.style.display = 'block';
        } else {
            iframe.style.display = 'none';
        }
    });
}

function updatePopupContent() {
    const iframe = document.getElementById('custom-popup');
    iframe.contentWindow.postMessage('updatePopup', '*');
}
