chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message received in background.js:", request);

    if (request.message === "highlightedCode") {
        let highlightedCode = request.highlightedCode;
        console.log("Highlighted code:", highlightedCode);

        // Determine category based on your logic (e.g., using getCategory function)
        let category = getCategory(highlightedCode);

        // Send response back to content script with category and position
        sendResponse({
            category: category,
            position: request.position
        });
    }
});

function getCategory(selectedText) {
    // Implement your logic to compare selectedText with predefined arrays
    // Example logic from earlier implementations
    let linearCodes = ['1.01.010.OTH', '1.01.760.OTH']; 
    let frontLoadedCodes = ['1.02.100.SUB', '1.03.100.MAT']; 
    let rearLoadedCodes = ['1.32.900.SUB', '1.06.200.SUB']; 
    let typicalCodes = ['1.09.200.SUB',]; 

    if (linearCodes.includes(selectedText)) {
        return 'linear';
    } else if (frontLoadedCodes.includes(selectedText)) {
        return 'front loaded';
    } else if (rearLoadedCodes.includes(selectedText)) {
        return 'rear loaded';
    } else if (typicalCodes.includes(selectedText)) {
        return 'typical';
    } else {
        return 'unknown';
    }
}
