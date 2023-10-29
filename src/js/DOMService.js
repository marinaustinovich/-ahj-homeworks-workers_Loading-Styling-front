import formatTime from './utils';

export default class DOMService {
  static createHeader(text) {
    const header = document.createElement('header');
    header.classList.add('header');

    const h2 = document.createElement('h2');
    h2.textContent = text;
    header.appendChild(h2);
    const updateDiv = document.createElement('div');
    updateDiv.classList.add('update');
    updateDiv.textContent = 'Update';
    header.appendChild(updateDiv);
    return header;
  }

  static createMain() {
    const main = document.createElement('main');
    main.classList.add('main');

    const section = document.createElement('section');
    section.classList.add('section');
    main.appendChild(section);
    return main;
  }

  static createModule(text) {
    const moduleDiv = DOMService.createElement('div', ['module', 'hidden']);
    text.split('\n').forEach((line, index) => {
      if (index > 0) moduleDiv.appendChild(document.createElement('br'));
      moduleDiv.appendChild(document.createTextNode(line));
    });
    return moduleDiv;
  }

  static createElement(tag, classes = [], attributes = {}, innerHTML = '') {
    const element = document.createElement(tag);
    if (classes.length) element.classList.add(...classes);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    if (innerHTML) {
      element.innerHTML = innerHTML;
    }
    return element;
  }

  static addNews(data) {
    const article = DOMService.createElement('article', ['article'], {
      'data-id': data.id,
    });
    const header = DOMService.createElement(
      'header',
      ['article__header'],
      {},
      formatTime(data.date),
    );
    const summaryDiv = DOMService.createElement('div', ['summary']);
    const avatarDiv = DOMService.createElement('div', ['avatar']);
    const img = DOMService.createElement('img', [], { src: data.avatar });
    const textDiv = DOMService.createElement('div', ['text'], {}, data.text);

    avatarDiv.appendChild(img);
    summaryDiv.appendChild(avatarDiv);
    summaryDiv.appendChild(textDiv);
    article.appendChild(header);
    article.appendChild(summaryDiv);
    return article;
  }

  static addBlock() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 5; i += 1) {
      const article = DOMService.createElement('article', ['article']);
      const header = DOMService.createElement('header', [
        'article__header',
        'cover',
      ]);
      const summaryDiv = DOMService.createElement('div', ['summary']);
      const avatarDiv = DOMService.createElement('div', ['avatar', 'cover']);
      const textDiv = DOMService.createElement('div', ['text', 'cover']);

      summaryDiv.appendChild(avatarDiv);
      summaryDiv.appendChild(textDiv);
      article.appendChild(header);
      article.appendChild(summaryDiv);
      fragment.appendChild(article);
    }
    return fragment;
  }
}
