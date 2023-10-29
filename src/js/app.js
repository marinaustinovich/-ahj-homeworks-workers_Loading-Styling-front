import WorkerService from './WorkerService';

const netlifyUrl = 'https://workers-loading-styling.netlify.app/news/';
const container = document.getElementById('loading-container');

window.addEventListener('load', () => {
  const app = new WorkerService(container, netlifyUrl);
  app.start();
});
