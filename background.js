chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in background.js:", request);

    if (request.message === "highlightedCode") {
        const highlightedCode = request.highlightedCode;
        console.log("Highlighted code:", highlightedCode);

        getCategory(highlightedCode).then(category => {
            // Store the category in local storage
            chrome.storage.local.set({ category: category }, () => {
                // Respond to the content script with the category
                sendResponse({ category: category });
            });
        });

        // Keep the message channel open for sendResponse
        return true;
    }
});

async function getCategory(selectedText) {
    const result = await new Promise((resolve) => {
        chrome.storage.local.get(['linearCodes', 'frontLoadedCodes', 'rearLoadedCodes', 'typicalCodes'], resolve);
    });

    const linearCodes = result.linearCodes || [];
    const frontLoadedCodes = result.frontLoadedCodes || [];
    const rearLoadedCodes = result.rearLoadedCodes || [];
    const typicalCodes = result.typicalCodes || [];

    if (selectedText.length > 13) {
        return 'UNKNOWN';
    } else if (linearCodes.some(code => selectedText === code)) {
        return 'LINEAR';
    } else if (frontLoadedCodes.some(code => selectedText === code)) {
        return 'FRONT LOADED';
    } else if (rearLoadedCodes.some(code => selectedText === code)) {
        return 'REAR LOADED';
    } else if (typicalCodes.some(code => selectedText === code)) {
        return 'TYPICAL';
    } else {
        return 'UNKNOWN';
    }
}
