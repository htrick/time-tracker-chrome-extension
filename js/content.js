const startTime = new Date();

window.addEventListener("beforeunload", (event) =>{
    const endTime = new Date();
    chrome.runtime.sendMessage({
        site: window.location.host,
        time: endTime - startTime
    });
});
