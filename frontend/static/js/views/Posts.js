import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Posts");
  }

  async getHtml() {
    return `
      <h1>Posts</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <p>
        Dolorem, cumque voluptate eligendi sunt officiis sequi debitis?
      </p>
      <p>
        Ipsa veniam totam minus dignissimos accusamus, quod provident autem cumque aspernatur, cum maxime corrupti!
      </p>
    `
  }

}