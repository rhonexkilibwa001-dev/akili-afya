export function renderNavbar(container){
  container.innerHTML = `
    <nav class="nav">
      <a href="#/home" class="brand">Akili Afya</a>
      <ul class="nav-links">
        <li><a href="#/resources">Resources</a></li>
        <li><a href="#/forum">Forum</a></li>
        <li><a href="#/quiz">Self-Assessment</a></li>
        <li><a href="#/support">Support</a></li>
        <li><a href="#/profile">Profile</a></li>
      </ul>
    </nav>
  `;
}
