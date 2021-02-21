import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    return `
      <h1>Welcome back, Chris</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, cumque voluptate eligendi sunt officiis sequi debitis? Ipsa veniam totam minus dignissimos accusamus, quod provident autem cumque aspernatur, cum maxime corrupti!
      </p>
      <p>
        <a href="/posts" data-link>View recent posts</a>
      </p>
    `
  }

}