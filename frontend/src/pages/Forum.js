const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

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
    <p id="forum-status" role="status" aria-live="polite"></p>
    <section id="posts"></section>
  `;

  const postsEl = el.querySelector('#posts');
  const statusEl = el.querySelector('#forum-status');
  function renderPosts(posts){
    postsEl.innerHTML = '';
    posts.forEach(p => {
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
      item.querySelector('.comment-submit').addEventListener('click', async (event) => {
        const submitButton = event.currentTarget;
        const input = item.querySelector('.comment-input');
        const text = input.value.trim();
        if (!text) return;

        submitButton.disabled = true;
        statusEl.textContent = '';
        try {
          const response = await fetch(`${API_BASE_URL}/api/posts/${encodeURIComponent(p.id)}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
          });
          if (!response.ok) throw new Error(`API request failed (${response.status}).`);
          await loadPosts();
        } catch (error) {
          console.error('Failed to add forum reply:', error);
          statusEl.textContent = 'Unable to add your reply. Please try again.';
          submitButton.disabled = false;
        }
      });
      postsEl.appendChild(item);
    });
  }

  async function loadPosts() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`);
      if (!response.ok) throw new Error(`API request failed (${response.status}).`);
      renderPosts(await response.json());
    } catch (error) {
      console.error('Failed to load forum posts:', error);
      statusEl.textContent = 'Unable to load forum posts. Please try again.';
    }
  }

  el.querySelector('#post-submit').addEventListener('click', async (event) => {
    const submitButton = event.currentTarget;
    const titleInput = el.querySelector('#post-title');
    const bodyInput = el.querySelector('#post-body');
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    if (!title || !body) {
      statusEl.textContent = 'Please add a title and body.';
      return;
    }

    submitButton.disabled = true;
    statusEl.textContent = '';
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      });
      if (!response.ok) throw new Error(`API request failed (${response.status}).`);
      titleInput.value = '';
      bodyInput.value = '';
      await loadPosts();
    } catch (error) {
      console.error('Failed to create forum post:', error);
      statusEl.textContent = 'Unable to create your post. Please try again.';
    } finally {
      submitButton.disabled = false;
    }
  });

  loadPosts();
  return el;
}

function escapeHtml(s){
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;');
}
