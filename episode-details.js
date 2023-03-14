import renderApp from './main.js';

export function render(data) {
  const details = [
    {
      name: getKeyByValue(data, data.planets),
      data: (data.planets),
    },
    {
      name: getKeyByValue(data, data.species),
      data: (data.species),
    },
    {
      name: getKeyByValue(data, data.starships),
      data: (data.starships),
    },
    {
      name: getKeyByValue(data, data.vehicles),
      data: (data.vehicles),
    }
  ]

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  const container = document.createElement('div');
  const title = document.createElement('h2');
  const backButton = document.createElement('button');
  const epDescr = document.createElement('p');
  const detailsBlock = document.createElement('div');

  container.classList.add('container');
  title.classList.add('episode__title');
  backButton.classList.add('back-button');
  detailsBlock.classList.add('details');


  title.textContent = data.title;
  backButton.textContent = '← Back to Episodes';
  epDescr.textContent = data.opening_crawl;

  backButton.addEventListener('click', e => {
    e.preventDefault();
    const searchParams = new URLSearchParams(location.search);
    const epId = searchParams.get('episode_id');
    const currentLocation = window.location.href;
    const episodesPage = currentLocation.replace(`?episode_id=${epId}`, '');
    history.pushState(null, '', episodesPage);
    renderApp();
  });

  container.append(backButton, title, epDescr);

  function createDetailBlock(data, name) {
    const wrapper = document.createElement('li');
    const title = document.createElement('h3');
    const list = document.createElement('ul');

    wrapper.classList.add('detail');
    title.classList.add('detail__title');
    list.classList.add('detail__list');

    title.textContent = name;

    for (const elem of data) {
      const item = document.createElement('li');
      item.classList.add('detail__item');
      item.textContent = elem.name;
      list.append(item);
    }

    wrapper.append(title, list);
    return wrapper;
  }

  details.map(elem => {
    return Promise.all(elem.data.map(src => fetch(src).then(res => res.json())))
      .then(data => {
        detailsBlock.append(createDetailBlock(data, elem.name));
        container.append(detailsBlock);
      });
  });

  return container;
}
