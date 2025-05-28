export class ProgressBlock {
    constructor(container) {
        this.container = container;
        this.circleProgress = container.querySelector(".circle-line");
        this.svg = container.querySelector(".progress-svg");
        this.radius = this.circleProgress.r.baseVal.value;
        this.circumference = 2 * Math.PI * this.radius;

        this.circleProgress.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.circleProgress.style.strokeDashoffset = this.circumference;
    }

    setValue(rawValue) {
        const value = this._setLimit(rawValue, 0, 100);
        const offset = this.circumference - (value / 100) * this.circumference;
        this.circleProgress.style.strokeDashoffset = offset;
    }

    setAnimated(isAnimated) {
        if (isAnimated) {
            this.circleProgress.classList.add("rotating");
        } else {
            this.circleProgress.classList.remove("rotating");
        }
    }

    setHidden(isHidden) {
        if (isHidden) {
            this.svg.classList.add("hidden");
        } else {
            this.svg.classList.remove("hidden");
        }
    }

    update({ value, animated, hidden }) {
        if (typeof value === "number") this.setValue(value);
        if (typeof animated === "boolean") this.setAnimated(animated);
        if (typeof hidden === "boolean") this.setHidden(hidden);
    }

    _setLimit(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }
}
