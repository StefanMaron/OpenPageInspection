document.getElementById("openPageInspection").addEventListener("click", openPageInspector);

function openPageInspector() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id, allFrames: true },
            func: function () {
                window.postMessage(JSON.parse('{"type":"designer:start","data":{"designerLevel":8}}'), "https://businesscentral.dynamics.com");
            },
        });
    });
}

document.getElementById("installFromAppSource").addEventListener("click", installFromAppSource);

function installFromAppSource() {
    var x;
    var appID = prompt("Please enter the App ID you want to Install");
    if (appID != null) {
        window.open(`https://businesscentral.dynamics.com/?filter=%27ID%27%20IS%20%${appID}%27&page=2503`)
    }
}

function openInVSCode() {

    window.open(`vscode://ms-dynamics-smb.al/navigateTo?type=page&id=${pageID}&environmentType=Sandbox&environmentName=${sandboxName}&tenant=${tenantID}`)
}
