export default function Profile(){
  const el = document.createElement('div');
  el.className = 'page';
  el.innerHTML = `
    <h1>Your Profile</h1>
    <p>Profile and settings are not yet implemented. This area is reserved for future authentication and personalization.</p>
  `;
  return el;
}
