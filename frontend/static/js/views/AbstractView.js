export default class {
  constructor(params){
    this.params = params;
    // console.log(this.params)
  }
  
  /**
   * @param  {string} title
   */
  setTitle(title) {
    document.title = title
  }

  async getHtml() {
    return ""
  }
}