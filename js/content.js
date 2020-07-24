startTime = new Date();

const port = chrome.runtime.connect();

window.addEventListener("beforeunload", sendTime);

setInterval(sendTime, 5000);

function sendTime() {
    const endTime = new Date();
    port.postMessage({
        site: window.location.host,
        time: endTime - startTime
    });
    startTime = endTime;
}
