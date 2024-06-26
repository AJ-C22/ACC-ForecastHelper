chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'compare') {
        let selectedText = request.selectedText;
        let category = getCategory(selectedText);
        sendResponse({ category: category });
    }
});

function getCategory(selectedText) {
    // Implement your logic to compare selectedText with predefined arrays
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
