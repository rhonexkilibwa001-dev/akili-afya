import quiz from '../../data/quiz.json' assert { type: 'json' };

export default function Quiz(){
  const state = { index: 0, score: 0 };
  const el = document.createElement('div');
  el.className = 'page';
  el.innerHTML = `<h1>Self-Assessment</h1><div id="quiz-root"></div>`;
  const root = el.querySelector('#quiz-root');

  function render(){
    if(state.index >= quiz.length){
      root.innerHTML = `<div class="result"><h2>Your score: ${state.score}</h2><p>Note: This is not a clinical diagnosis. Reach out to support if you are distressed.</p></div>`;
      return;
    }
    const q = quiz[state.index];
    root.innerHTML = `
      <div class="quiz-card">
        <h3>${state.index + 1}. ${q.question}</h3>
        <div class="options">${q.options.map((o,i)=>`<button class="opt" data-val="${i}">${o}</button>`).join('')}</div>
      </div>
    `;
    root.querySelectorAll('.opt').forEach(b=>b.addEventListener('click', ()=>{
      const val = Number(b.dataset.val);
      state.score += q.scores[val] || 0;
      state.index++;
      render();
    }));
  }

  render();
  return el;
}
