export function progressBlockElement() {
    const wrapper = document.createElement("div");
    wrapper.className = "progress-block";
    wrapper.innerHTML = `
    <h2 class="progress-title">Progress</h2>

    <div class="progress-svg">
      <svg width="120" height="120">
        <circle class="circle-bg" cx="60" cy="60" r="54"></circle>
        <circle class="circle-line" cx="60" cy="60" r="54"></circle>
      </svg>
    </div>

    <div class="controls">

      <div class="controls-group">

        <div class="control-item">
          <input class="control-input" type="number" min="0" max="100" value="20">
          <span class="control-label">Value</span>
        </div>

        <div class="control-item">
          <label class="switch-label">
            <input type="checkbox" class="animate-toggle" />
            <span class="switch-slider"></span>
          </label>
          <span class="control-label">Animate</span>
        </div>

        <div class="control-item">
          <label class="switch-label">
            <input type="checkbox" class="hide-toggle" />
            <span class="switch-slider"></span>
          </label>
          <span class="control-label">Hide</span>
        </div>

        <div class="additional-controls">

          <div class="control-item">
            <label class="switch-label">
              <input type="checkbox" class="show-value-toggle" />
              <span class="switch-slider"></span>
            </label>
            <span class="control-label">Show Value</span>
          </div>

          <div class="control-item">
            <label class="switch-label">
              <input type="checkbox" class="auto-increase-toggle" />
              <span class="switch-slider"></span>
            </label>
            <span class="control-label">Auto Increase</span>
          </div>

          <div class="control-item">
            <label class="switch-label">
              <input type="checkbox" class="reset-toggle" />
              <span class="switch-slider"></span>
            </label>
            <span class="control-label">Reset</span>
          </div>
        </div>
        
      </div>

      <button class="add-btn">
        More
      </button>

    </div>
  `;
    return wrapper;
}
