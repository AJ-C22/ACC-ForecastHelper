document.addEventListener("mouseup", function(event) {
    let selectedText = window.getSelection().toString().trim();
    console.log("Selected text:", selectedText);

    if (selectedText !== "") {
        chrome.runtime.sendMessage({ message: "highlightedCode", highlightedCode: selectedText }, function(response) {
            console.log("Received response from background.js:", response);

            if (response && response.category) {
                chrome.runtime.sendMessage({ message: "showPopup", category: response.category });
            }
        });
    }
});
