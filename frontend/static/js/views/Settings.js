import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Settings");
  }

  async getHtml() {
    return `
      <h1>Settings</h1>
      <p>
        Setting 1
      </p>
      <p>
        Setting 2
      </p>
      <p>
        Setting 3
      </p>
    `
  }

}