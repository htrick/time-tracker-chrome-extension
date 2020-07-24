refreshList();

document.querySelector("#reset").addEventListener("click", () => {
    chrome.storage.local.set({"times": {}});
    document.querySelectorAll("div").forEach((div) => {
        document.body.removeChild(div);
    });
});

setInterval(() => {
    refreshList();
}, 10000);

function convertTime(time) {
    let ms = time;
    const hours = Math.floor(ms / 1000 / 60 / 60);
    ms -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(ms / 1000 / 60);
    ms -= minutes * 1000 * 60;
    const seconds = Math.floor(ms / 1000);
    return `${hours} h, ${minutes} m, ${seconds} s`;
}

function refreshList() {
    document.querySelectorAll("div").forEach((div) => {
        document.body.removeChild(div);
    });
    chrome.storage.local.get(["times"], (result) => {
        let times = result.times;
        if (times != undefined) {
            Object.keys(times).forEach((site) => {
                const div = document.createElement("div");
                div.textContent = `${site}: ${convertTime(times[site])}`;
                document.body.appendChild(div);
            });
        }
    });
}
