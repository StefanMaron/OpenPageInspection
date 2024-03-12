document.getElementById("openPageInspection").addEventListener("click", openPageInspector);

function openPageInspector() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id, allFrames: true },
            func: function () {
                window.postMessage(JSON.parse('{"type":"designer:start","data":{"designerLevel":8}}'), window.location.origin);
            },
        });
    });
}
document.getElementById("openExtMgt").addEventListener("click", openThirdPartyExtensions);

function openThirdPartyExtensions() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        var urlObj = new URL(activeTab.url);

        const params = new Proxy(new URLSearchParams(urlObj.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        let company = '';
        if (params.company) {
            company = `&company=${params.company}`;
        }
        let tenant = `tenant=${params.tenant}`;
        if (urlObj.origin = 'https://businesscentral.dynamics.com/') {
            tenant = '';
        }

        let myNewUrl = `${urlObj.origin}${urlObj.pathname}?${tenant}${company}&page=2500&filter=%27Published%20Application%27.Publisher%20IS%20%27%3c%3eMicrosoft%27`;
        chrome.tabs.update(activeTab.id, { url: myNewUrl });
    })
}

document.getElementById("installFromAppSource").addEventListener("click", installFromAppSource);

function installFromAppSource() {
    var appID = prompt("Please enter the App ID you want to Install");
    if (appID != null) {
        window.open(`https://businesscentral.dynamics.com/?filter=%27ID%27%20IS%20%${appID}%27&page=2503`)
    }
}

document.getElementById("openInVSCode").addEventListener("click", openInVSCode);

function openInVSCode() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        var urlParts = activeTab.url.split('/');
        var tenantID = urlParts[3];
        var sandboxName = urlParts[4];
        var pageID = urlParts[5].split('&').find((element) => element.startsWith('page=')).split('=')[1];

        window.open(`vscode://ms-dynamics-smb.al/navigateTo?type=page&id=${pageID}&environmentType=Sandbox&environmentName=${sandboxName}&tenant=${tenantID}`)
    })
}

document.getElementById("openTableData").addEventListener("click", openTableData);

function openTableData() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        var urlObj = new URL(activeTab.url);

        const params = new Proxy(new URLSearchParams(urlObj.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        let company = '';
        if (params.company) {
            company = `&company=${params.company}`;
        }
        let tenant = `tenant=${params.tenant}`;
        if (urlObj.origin = 'https://businesscentral.dynamics.com/') {
            tenant = '';
        }

        var tableID = prompt("Please enter the table ID you want to open");
        if (tableID != null) {
            let myNewUrl = `${urlObj.origin}${urlObj.pathname}?${tenant}${company}&Table=${tableID}`;
            window.open(myNewUrl)
        }
    })
}