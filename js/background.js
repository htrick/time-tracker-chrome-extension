chrome.runtime.onMessage.addListener((req, sender, res) => {
    chrome.storage.sync.get(["times"], (result) => {
        let times = result.times;
        if (times[req.site] == undefined) {
            times[req.site] = req.time;
        }
        else {
            times[req.site] += req.time;
        }
        chrome.storage.sync.set({"times": times});
    });
});

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.create({url: "../html/popup.html"})
});
