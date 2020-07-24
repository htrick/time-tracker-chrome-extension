startTime = new Date();

setInterval(sendTime, 5000);

window.addEventListener("beforeunload", sendTime);

function sendTime() {
    const endTime = new Date();
    chrome.runtime.sendMessage({
        site: window.location.host,
        time: endTime - startTime
    });
    startTime = endTime;
}
