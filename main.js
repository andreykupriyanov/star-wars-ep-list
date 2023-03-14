const cssPromises = {};

function loadResource(src) {
  // JavaScript module
  if (src.endsWith('.js')) {
    return import(src);
  }
  // CSS файл
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  // Данные сервера
  return fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app');

const searchParams = new URLSearchParams(location.search);
const epId = searchParams.get('episode_id');

function renderPage(moduleName, apiUrl, css) {
  Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
    .then(([pageModule, data]) => {
      appContainer.innerHTML = '';
      appContainer.append(pageModule.render(data));
    });
}

export default function renderApp() {
  const searchParams = new URLSearchParams(location.search);
  const epId = searchParams.get('episode_id');

  if (epId) {
    renderPage(
      './episode-details.js',
      `https://swapi.dev/api/films/${epId}`,
      './style.css'
    );
  } else {
    renderPage(
      './episodes-list.js',
      'https://swapi.dev/api/films/',
      './style.css'
    );
  }
}

renderApp();

window.addEventListener('popstate', renderApp);
