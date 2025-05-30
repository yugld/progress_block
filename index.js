import { initProgressBlock } from "./progressBlock/initProgressBlock.js";

document.addEventListener("DOMContentLoaded", () => {
    const mount = document.getElementById("app");
    initProgressBlock(mount);
});
