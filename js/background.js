chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((msg) => {
        chrome.storage.local.get(["times"], (result) => {
            let times = result.times;
            if (times == undefined) {
                times = {};
            }
            if (times[msg.site] == undefined) {
                times[msg.site] = msg.time;
            }
            else {
                times[msg.site] += msg.time;
            }
            chrome.storage.local.set({"times": times});
        });
    });
});

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.create({url: "../html/popup.html"})
});
