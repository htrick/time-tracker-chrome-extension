chrome.runtime.onMessage.addListener((req, sender, res) => {
    chrome.storage.local.get(["times"], (result) => {
        let times = result.times;
        if (times == undefined) {
            times = {};
        }
        if (times[req.site] == undefined) {
            times[req.site] = req.time;
        }
        else {
            times[req.site] += req.time;
        }
        chrome.storage.local.set({"times": times});
    });
});

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.create({url: "../html/popup.html"})
});
