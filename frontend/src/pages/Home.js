export default function Home(){
  const el = document.createElement('div');
  el.className = 'page';
  el.innerHTML = `
    <h1>Welcome to Akili Afya</h1>
    <p>A community hub focusing on mental health wellbeing — resources, self-assessment, and a supportive forum.</p>
    <section class="features">
      <div class="card"><h3>Resources</h3><p>Curated articles and tools.</p></div>
      <div class="card"><h3>Self-Assessment</h3><p>Quick quizzes to reflect on your mental health.</p></div>
      <div class="card"><h3>Community Forum</h3><p>Share, ask, and support each other.</p></div>
    </section>
  `;
  return el;
}
