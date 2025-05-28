import { ProgressBlock } from "./progressBlock.js";

const container = document.querySelector(".progress-block");
const progress = new ProgressBlock(container);

const inputValue = document.getElementById("controlInput");
const animateToggle = document.getElementById("animateToggle");
const hideToggle = document.getElementById("hideToggle");

progress.update({
    value: Number(inputValue.value),
    animated: animateToggle.checked,
    hidden: hideToggle.checked,
});

inputValue.addEventListener("input", () => {
    const val = Number(inputValue.value);
    progress.setValue(val);
});

animateToggle.addEventListener("change", () => {
    progress.setAnimated(animateToggle.checked);
});

hideToggle.addEventListener("change", () => {
    progress.setHidden(hideToggle.checked);
});
