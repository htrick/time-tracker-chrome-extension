window.times = {};

chrome.runtime.onMessage.addListener((req, sender, res) => {
    if (window.times[req.site] == undefined) {
        window.times[req.site] = req.time;
    }
    else {
        window.times[req.site] += req.time;
    }
});

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.create({url: "../html/popup.html"})
});
