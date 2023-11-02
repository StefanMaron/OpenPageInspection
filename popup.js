function openPageInspector() {
    window.postMessage(JSON.parse('{"type":"designer:start","data":{"designerLevel":8}}'), "https://businesscentral.dynamics.com");
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id, allFrames: true },
            func: openPageInspector,
        });
    });
}, false);

