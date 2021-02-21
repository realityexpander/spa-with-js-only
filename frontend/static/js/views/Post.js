import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Post View");
  }

  async getHtml() {
    return `
      <h1>Post View </h1>
      <p>
        id = ${this.params.id} ${this.params.abc} ${this.params.xyz}
      </p>
      <p>
        ${JSON.stringify(this.params)}
      </p>
    `
  }

}