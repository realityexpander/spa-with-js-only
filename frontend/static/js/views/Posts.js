import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Posts");
  }

  async getHtml() {
    return `
      <h1>Posts</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        <a href="/post/1/2" data-link>View Post 1</a>
      </p>
      <p>
        Dolorem, cumque voluptate eligendi sunt officiis sequi debitis?
        <a href="/post/2/2" data-link>View Post 2</a>
      </p>
      <p>
        Ipsa veniam totam minus dignissimos accusamus, quod provident autem cumque aspernatur, cum maxime corrupti!
        <a href="/post/3/2" data-link>View Post 3</a>
      </p>
    `
  }

}