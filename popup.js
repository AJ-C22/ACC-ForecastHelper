chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "showPopup") {
        let category = request.category;
        console.log("Popup received category:", category);

        // Display the category in the popup HTML (modify as per your popup.html structure)
        document.getElementById("category").textContent = category;
    }
});
