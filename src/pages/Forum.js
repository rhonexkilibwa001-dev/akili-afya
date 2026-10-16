// Simple in-memory forum mock
let posts = [
  { id: 1, author: 'Alice', title: 'Coping strategies?', body: 'How do you deal with stress at work?', comments: [{ id:1, author:'Bob', text:'I try short walks.' }] },
];

export default function Forum(){
  const el = document.createElement('div');
  el.className = 'page';
  el.innerHTML = `
    <h1>Community Forum</h1>
    <section id="new-post">
      <input id="post-title" placeholder="Title" />
      <textarea id="post-body" placeholder="Share something..."></textarea>
      <button id="post-submit">Post</button>
    </section>
    <section id="posts"></section>
  `;

  const postsEl = el.querySelector('#posts');
  function renderPosts(){
    postsEl.innerHTML = '';
    posts.slice().reverse().forEach(p => {
      const item = document.createElement('article');
      item.className = 'post';
      item.innerHTML = `
        <h3>${escapeHtml(p.title)}</h3>
        <div class="meta">by ${escapeHtml(p.author)}</div>
        <p>${escapeHtml(p.body)}</p>
        <details>
          <summary>Comments (${p.comments.length})</summary>
          <div class="comments">${p.comments.map(c => `<div class=\"comment\"><strong>${escapeHtml(c.author)}:</strong> ${escapeHtml(c.text)}</div>`).join('')}</div>
          <input class="comment-input" placeholder="Add a comment" />
          <button class="comment-submit">Add</button>
        </details>
      `;
      // comment handling
      item.querySelector('.comment-submit').addEventListener('click', ()=>{
        const input = item.querySelector('.comment-input');
        if(!input.value) return;
        p.comments.push({ id: Date.now(), author: 'You', text: input.value });
        renderPosts();
      });
      postsEl.appendChild(item);
    });
  }

  el.querySelector('#post-submit').addEventListener('click', ()=>{
    const title = el.querySelector('#post-title').value.trim();
    const body = el.querySelector('#post-body').value.trim();
    if(!title || !body) return alert('Please add title and body');
    posts.push({ id: Date.now(), author: 'You', title, body, comments: [] });
    el.querySelector('#post-title').value = '';
    el.querySelector('#post-body').value = '';
    renderPosts();
  });

  renderPosts();
  return el;
}

function escapeHtml(s){
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;');
}
