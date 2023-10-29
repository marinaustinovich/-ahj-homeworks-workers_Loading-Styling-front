import DOMService from './DOMService';

export default class Widget {
  constructor(container, url) {
    this.url = url;
    this.container = container;
    this.sectionEl = null;
    this.moduleEl = null;
    this.domService = new DOMService();
    this.drawUi();
  }

  drawUi() {
    const header = DOMService.createHeader('Movie world news');
    const main = DOMService.createMain();
    const moduleDiv = DOMService.createModule(
      "It's impossible to dowloand data. \nCheck your connection to the internet and update the page",
    );

    this.container.appendChild(header);
    this.container.appendChild(main);
    this.container.appendChild(moduleDiv);

    this.moduleEl = document.querySelector('.module');
    this.sectionEl = this.container.querySelector('.section');
  }

  async start() {
    this.addBlock();
    try {
      const newsArray = await this.api();
      this.hiddenModal();
      if (this.sectionEl && newsArray) {
        this.sectionEl.innerHTML = '';
      }
      newsArray.forEach((el) => this.addNews(el));
    } catch (error) {
      console.log('error', error);
      this.showModal();
    }
  }

  addNews(data) {
    const article = DOMService.addNews(data);
    this.sectionEl.appendChild(article);
  }

  addBlock() {
    const block = DOMService.addBlock();
    this.sectionEl.appendChild(block);
  }

  showModal() {
    this.moduleEl.classList.remove('hidden');
  }

  hiddenModal() {
    this.moduleEl.classList.add('hidden');
  }

  async api() {
    try {
      const data = await fetch(this.url);
      const result = await data.json();
      return result;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
