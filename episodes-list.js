import renderApp from './main.js';

export function render(data) {
  const container = document.createElement('div');
  const episodesListWrapper = document.createElement('div');
  const episodesListTitle = document.createElement('h3');
  const episodesList = document.createElement('ul');

  container.classList.add('container', 'app__container');
  episodesListWrapper.classList.add('episodes');
  episodesListTitle.classList.add('episodes__title');
  episodesList.classList.add('episodes__list');

  data.results.forEach(ep => {
    const item = document.createElement('li');
    const link =document.createElement('a');
    const card = document.createElement('div');
    const epNumber = document.createElement('span');
    const epTitle = document.createElement('h3');
    const epReleaseDate = document.createElement('span');

    item.classList.add('episodes__item');
    link.classList.add('episodes__link');
    card.classList.add('card');
    epNumber.classList.add('card__number-ep');
    epTitle.classList.add('card__title');
    epReleaseDate.classList.add('card__relese-date');

    const filmUrl = new URL(ep.url);

    link.href = `?episode_id=${filmUrl.pathname.split("/")[3]}`;
    link.addEventListener('click', e => {
      e.preventDefault();
      history.pushState(null, '', `?episode_id=${filmUrl.pathname.split("/")[3]}`);
      renderApp();
    });
    epNumber.textContent = `Episode ${ep.episode_id}`;
    epTitle.textContent = ep.title;
    epReleaseDate.textContent = ep.release_date;

    card.append(epNumber, epTitle, epReleaseDate);
    link.append(card);
    item.append(link);

    episodesList.append(item);
  });

  episodesListWrapper.append(episodesListTitle, episodesList);
  container.append(episodesListWrapper);

  return container;
}
