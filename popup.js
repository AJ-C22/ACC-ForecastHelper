document.addEventListener('DOMContentLoaded', () => {
    // Load and display current lists
    loadLists();

    // Add event listeners for save buttons
    document.getElementById('saveLinear').addEventListener('click', () => saveList('linearCodes'));
    document.getElementById('saveFrontLoaded').addEventListener('click', () => saveList('frontLoadedCodes'));
    document.getElementById('saveRearLoaded').addEventListener('click', () => saveList('rearLoadedCodes'));
    document.getElementById('saveTypical').addEventListener('click', () => saveList('typicalCodes'));
});

function loadLists() {
    chrome.storage.local.get(['linearCodes', 'frontLoadedCodes', 'rearLoadedCodes', 'typicalCodes'], (result) => {
        document.getElementById('linearCodes').value = result.linearCodes ? result.linearCodes.join(', ') : '';
        document.getElementById('frontLoadedCodes').value = result.frontLoadedCodes ? result.frontLoadedCodes.join(', ') : '';
        document.getElementById('rearLoadedCodes').value = result.rearLoadedCodes ? result.rearLoadedCodes.join(', ') : '';
        document.getElementById('typicalCodes').value = result.typicalCodes ? result.typicalCodes.join(', ') : '';
    });
}

function saveList(listName) {
    const value = document.getElementById(listName).value;
    const list = value.split(',').map(item => item.trim());
    chrome.storage.local.set({ [listName]: list }, () => {
        console.log(`${listName} saved`);
    });
}
