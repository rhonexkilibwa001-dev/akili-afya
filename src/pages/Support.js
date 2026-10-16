export default function Support(){
  const el = document.createElement('div');
  el.className = 'page';
  el.innerHTML = `
    <h1>Support & Crisis Contacts</h1>
    <p>If you or someone else is in immediate danger, call your local emergency number.</p>
    <ul>
      <li>National helpline: 1-800-XXX-XXXX (replace with local number)</li>
      <li>Suicide prevention hotline: 1-800-273-8255 (US example)</li>
    </ul>
    <p>Local resources and links are available on the Resources page.</p>
  `;
  return el;
}
