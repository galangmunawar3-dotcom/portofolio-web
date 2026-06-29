async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error('Gagal load', file, err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar-placeholder', 'components/navbar.html');
  loadComponent('footer-placeholder', 'components/footer.html');
  loadComponent('hero-placeholder', 'sections/hero.html');
  loadComponent('about-placeholder', 'sections/about.html');
  loadComponent('skills-placeholder', 'sections/skills.html');
  loadComponent('music-placeholder', 'sections/music.html');
  loadComponent('motivation-placeholder', 'sections/motivation.html');
  loadComponent('contact-placeholder', 'sections/contact.html');

  document.addEventListener('click', (e) => {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (toggle && menu) {
      if (e.target.closest('#navToggle')) {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
      } else if (!e.target.closest('#navMenu')) {
        toggle.classList.remove('active');
        menu.classList.remove('active');
      }
    }
  });

  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });
});

function loadMusic() {
  const grid = document.getElementById('musicGrid');
  if (!grid || grid.dataset.loaded) return;
  grid.dataset.loaded = 'true';

  const songs = [
    {
      title: 'Insya Allah',
      artist: 'Juicy Luicy',
      file: 'assets/music/insya-allah.mp3',
      image: 'assets/images/music/insyaallah.jpg',
    },
    {
      title: 'Mendarah',
      artist: 'Nadin Amizah',
      file: 'assets/music/mendarah.mp3',
      image: 'assets/images/music/mendarah.jpg',
    },
    {
      title: 'Merry Christmas, i miss you',
      artist: 'Alex Crichton',
      file: 'assets/music/merry-christmas.mp3',
      image: 'assets/images/music/merry-christmas.jpg',
    },
  ];

  grid.innerHTML = songs.map((s, i) => {
    const ext = s.file.split('.').pop();
    const type = ext === 'mp3' ? 'audio/mpeg' : 'audio/mp4';
    return `
    <div class="music-card fade-in-up">
      <div class="music-image">
        <img src="${s.image}" alt="${s.title}">
      </div>
      <div class="music-info">
        <h3 class="music-title">${s.title}</h3>
        <p class="music-artist">${s.artist}</p>
        <div class="music-player">
          <audio id="audio-${i}" controls preload="metadata">
            <source src="${s.file}" type="${type}">
            Browser tidak mendukung audio player.
          </audio>
        </div>
      </div>
    </div>
  `}).join('');

  const allAudios = grid.querySelectorAll('audio');
  allAudios.forEach(audio => {
    audio.addEventListener('play', () => {
      allAudios.forEach(a => { if (a !== audio) a.pause(); });
    });
  });
}

let musicLoaded = false;

const observer = new MutationObserver(() => {
  const mg = document.getElementById('musicGrid');
  if (mg && !musicLoaded) { loadMusic(); musicLoaded = true; observer.disconnect(); }
});
observer.observe(document.body, { childList: true, subtree: true });
