const tbody = document.querySelector("tbody");

refreshList();

document.querySelector("#reset").addEventListener("click", () => {
    chrome.storage.local.set({"times": {}});
    document.querySelectorAll("tbody > tr").forEach((tr) => {
        tbody.removeChild(tr);
    });
});

setInterval(() => {
    refreshList();
}, 5000);

function convertTime(time) {
    let ms = time;
    const days = Math.floor(ms / 1000 / 60 / 60 / 24);
    ms -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(ms / 1000 / 60 / 60);
    ms -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(ms / 1000 / 60);
    ms -= minutes * 1000 * 60;
    const seconds = Math.floor(ms / 1000);
    if (days === 0) {
        if (hours === 0) {
            if (minutes === 0) {
                return `${seconds}s`;
            }
            return `${minutes}m:${seconds}s`;
        }
        return `${hours}h:${minutes}m:${seconds}s`;
    }
    return `${days}d:${hours}h:${minutes}m:${seconds}s`;
}

function refreshList() {
    document.querySelectorAll("tbody > tr").forEach((tr) => {
        tbody.removeChild(tr);
    });
    chrome.storage.local.get(["times"], (result) => {
        let times = result.times;
        if (times != undefined) {
            Object.keys(times).sort((a, b) => {
                return times[b] - times[a];
            }).forEach((site) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${site}</td><td>${convertTime(times[site])}</td>`;
                tbody.appendChild(tr);
            });
        }
    });
}
