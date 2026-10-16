import { renderNavbar } from './components/Navbar.js';
import Home from './pages/Home.js';
import Resources from './pages/Resources.js';
import Forum from './pages/Forum.js';
import Quiz from './pages/Quiz.js';
import Support from './pages/Support.js';
import Profile from './pages/Profile.js';

const routes = {
  '': Home,
  '#/': Home,
  '#/home': Home,
  '#/resources': Resources,
  '#/forum': Forum,
  '#/quiz': Quiz,
  '#/support': Support,
  '#/profile': Profile,
};

export function mountApp(root) {
  if (!root) return;
  root.innerHTML = `
    <header id="app-header"></header>
    <main id="app-main" class="container"></main>
    <footer id="app-footer" class="muted">&copy; ${new Date().getFullYear()} Akili Afya</footer>
  `;

  renderNavbar(document.getElementById('app-header'));

  function render() {
    const key = location.hash || '#/';
    const Page = routes[key] || Home;
    const container = document.getElementById('app-main');
    container.innerHTML = '';
    container.appendChild(Page());
  }

  window.addEventListener('hashchange', render);
  render();
}
