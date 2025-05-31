import { ProgressBlock } from "./progressBlock.js";
import { progressBlockElement } from "./progressBlockElement.js";
export function initProgressBlock(mountPoint) {
    const element = progressBlockElement();
    mountPoint.appendChild(element);

    const circle = element.querySelector(".circle-line");
    const svgWrapper = element.querySelector(".progress-svg");
    let valueDisplay = element.querySelector(".progress-value-display");
    if (!valueDisplay) {
        valueDisplay = document.createElement("div");
        valueDisplay.className = "progress-value-display";
        svgWrapper.appendChild(valueDisplay);
    }
    const progress = new ProgressBlock({
        circleElement: circle,
        displayElement: valueDisplay,
        wrapperElement: svgWrapper,
    });

    const inputValue = element.querySelector(".control-input");
    const animateToggle = element.querySelector(".animate-toggle");
    const hideToggle = element.querySelector(".hide-toggle");
    const resetToggle = element.querySelector(".reset-toggle");
    const autoIncreaseToggle = element.querySelector(".auto-increase-toggle");
    const showValueToggle = element.querySelector(".show-value-toggle");
    const additionalControls = element.querySelector(".additional-controls");
    const toggleAdditionalBtn = element.querySelector(".add-btn");
    let isAdditionalVisible = false;
    let autoIncreaseInterval = null;

    toggleAdditionalBtn.addEventListener("click", () => {
        isAdditionalVisible = !isAdditionalVisible;
        additionalControls.classList.toggle("expanded", isAdditionalVisible);
        toggleAdditionalBtn.textContent = isAdditionalVisible ? "Less" : "More";
    });

    resetToggle.addEventListener("click", () => {
        progress.reset();
        inputValue.value = 0;
        animateToggle.checked = false;
        hideToggle.checked = false;
        showValueToggle.checked = false;
        progress.setDisplayValueVisible(false);

        if (autoIncreaseInterval) {
            clearInterval(autoIncreaseInterval);
            autoIncreaseInterval = null;
        }
        autoIncreaseToggle.checked = false;
    });

    inputValue.addEventListener("input", () => {
        progress.setValue(Number(inputValue.value));
    });

    animateToggle.addEventListener("change", () => {
        progress.setAnimated(animateToggle.checked);
        if (animateToggle.checked && autoIncreaseToggle.checked) {
            autoIncreaseToggle.checked = false;
            stopAutoIncrease();
        }
    });

    autoIncreaseToggle.addEventListener("change", () => {
        if (autoIncreaseToggle.checked) {
            if (animateToggle.checked) {
                animateToggle.checked = false;
                progress.setAnimated(false);
            }
            startAutoIncrease();
        } else {
            stopAutoIncrease();
        }
    });

    hideToggle.addEventListener("change", () => {
        progress.setHidden(hideToggle.checked);
    });

    showValueToggle.addEventListener("change", () => {
        progress.setDisplayValueVisible(showValueToggle.checked);
    });

    function startAutoIncrease() {
        if (autoIncreaseInterval) return;
        autoIncreaseInterval = setInterval(() => {
            let currentValue = Number(inputValue.value);
            if (currentValue < 100) {
                currentValue++;
                inputValue.value = currentValue;
                progress.setValue(currentValue);
            } else {
                stopAutoIncrease();
                autoIncreaseToggle.checked = false;
            }
        }, 100);
    }

    function stopAutoIncrease() {
        clearInterval(autoIncreaseInterval);
        autoIncreaseInterval = null;
    }

    progress.setDisplayValueVisible(showValueToggle.checked);
    progress.update({
        value: Number(inputValue.value),
        animated: animateToggle.checked,
        hidden: hideToggle.checked,
    });

    return progress;
}
