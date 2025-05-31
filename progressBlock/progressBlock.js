export class ProgressBlock {
    // Принимает объект опций
    constructor({ circleElement, wrapperElement, displayElement }) {
        if (!circleElement || !wrapperElement) {
            throw new Error(
                "Элементы circleElement и wrapperElement  обязательны для создания экземпляра класса ProgressBlock"
            );
        }
        this.circleProgress = circleElement;
        this.svg = wrapperElement;
        this.valueDisplay = displayElement || null;
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
        if (this.valueDisplay) {
            this.valueDisplay.style.display = visible ? "flex" : "none";
        }
    }

    setDisplayValue(value) {
        if (this.valueDisplay) {
            this.valueDisplay.textContent = `${Math.round(value)}%`;
        }
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
