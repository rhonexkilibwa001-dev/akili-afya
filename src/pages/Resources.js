import resources from '../../data/resources.json' assert { type: 'json' };

export default function Resources(){
  const el = document.createElement('div');
  el.className = 'page';
  el.innerHTML = '<h1>Resources</h1><div id="resource-list" class="grid"></div>';
  const list = el.querySelector('#resource-list');
  resources.forEach(r => {
    const card = document.createElement('article');
    card.className = 'resource-card';
    card.innerHTML = `
      <h3>${r.title}</h3>
      <p>${r.description}</p>
      <a href="${r.url}" target="_blank" rel="noopener">Open</a>
    `;
    list.appendChild(card);
  });
  return el;
}
