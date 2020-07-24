const bg = chrome.extension.getBackgroundPage();

Object.keys(bg.times).forEach((site) => {
    const div = document.createElement("div");
    div.textContent = `${site}: ${convertTime(bg.times[site])}`;
    document.body.appendChild(div);
});

function convertTime(time) {
    let ms = time;
    const hours = Math.floor(ms / 1000 / 60 / 60);
    ms -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(ms / 1000 / 60);
    ms -= minutes * 1000 * 60;
    const seconds = Math.floor(ms / 1000);
    return `${hours} h, ${minutes} m, ${seconds} s`;
}
