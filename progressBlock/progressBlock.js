export class ProgressBlock {
    constructor(container) {
        this.container = container;
        this.circleProgress = container.querySelector(".circle-line");
        this.svg = container.querySelector(".progress-svg");
        this.valueDisplay = this.svg.querySelector(".progress-value-display");
        if (!this.valueDisplay) {
            this.valueDisplay = document.createElement("div");
            this.valueDisplay.className = "progress-value-display";
            this.svg.appendChild(this.valueDisplay);
        }
        this.radius = this.circleProgress.r.baseVal.value;
        this.circumference = 2 * Math.PI * this.radius;
        this.circleProgress.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.circleProgress.style.strokeDashoffset = this.circumference;
        this.setValue(0);
        this.setDisplayValueVisible(false);
    }

    _setLimit(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    setDisplayValueVisible(visible) {
        this.valueDisplay.style.display = visible ? "flex" : "none";
    }

    setDisplayValue(value) {
        this.valueDisplay.textContent = `${Math.round(value)}%`;
    }

    setValue(rawValue) {
        const value = this._setLimit(rawValue, 0, 100);
        const offset = this.circumference - (value / 100) * this.circumference;
        this.circleProgress.style.strokeDashoffset = offset;
        this.setDisplayValue(value);
    }

    setAnimated(isAnimated) {
        this.circleProgress.classList.toggle("rotating", isAnimated);
    }

    setHidden(isHidden) {
        this.svg.classList.toggle("hidden", isHidden);
    }

    reset() {
        this.setValue(0);
        this.setAnimated(false);
        this.setHidden(false);
    }

    update({ value, animated, hidden }) {
        if (typeof value === "number") this.setValue(value);
        if (typeof animated === "boolean") this.setAnimated(animated);
        if (typeof hidden === "boolean") this.setHidden(hidden);
    }
}
