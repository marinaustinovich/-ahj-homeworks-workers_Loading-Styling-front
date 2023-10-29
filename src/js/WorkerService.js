import Widget from './Widget';

class WorkerService {
  constructor(container, url) {
    if (!container) {
      throw new Error('Container element must not be null');
    }
    this.url = url;
    this.container = container;
    this.widget = null;
    this.registration = null;
  }

  async handleOffline() {
    if (navigator.onLine) return;

    console.log('Приложение в офлайн-режиме');
    this.widget.showModal();

    try {
      const data = await this.widget.api();
      this.widget.addNews(data);
    } catch (error) {
      console.error('Не удалось загрузить данные:', error);
    }
  }

  initializeApp() {
    this.widget = new Widget(this.container, this.url);
    this.widget.start();

    window.addEventListener('offline', () => this.handleOffline());
  }

  static async registerServiceWorker() {
    if (!navigator.serviceWorker) return null;

    try {
      const registration = await navigator.serviceWorker.register(
        './service.worker.js',
        { scope: './' },
      );
      console.log('Service Worker зарегистрирован:', registration);

      return registration;
    } catch (e) {
      console.error('Ошибка регистрации Service Worker:', e);

      return null;
    }
  }

  async start() {
    this.registration = await WorkerService.registerServiceWorker();
    if (this.registration) {
      this.initializeApp();
    }
  }
}

export default WorkerService;
