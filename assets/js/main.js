// ── CONFIG ─────────────────────────────────────────────────
const OWNER = 'cobrabagaskara';
const REPO  = 'cms-pkm';
const BASE  = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main`;

// ── FETCH JSON ─────────────────────────────────────────────
async function fetchJSON(path) {
  const r = await fetch(`${BASE}/${path}?t=${Date.now()}`);
  if (!r.ok) throw new Error(`Gagal memuat: ${path}`);
  return r.json();
}

// ── FORMAT TANGGAL ─────────────────────────────────────────
function formatTanggal(str) {
  const d = new Date(str);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ── NAVBAR ACTIVE ──────────────────────────────────────────
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── HAMBURGER ──────────────────────────────────────────────
function initHamburger() {
  const btn = document.querySelector('.hamburger');
  const links = document.querySelector('.navbar-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
}

// ── RENDER NAVBAR ──────────────────────────────────────────
function renderNavbar(profil) {
  const el = document.getElementById('navbar');
  if (!el) return;
  el.innerHTML = `
    <div class="navbar-inner">
      <a class="navbar-brand" href="index.html">
        <div class="brand-logo">🏥</div>
        <div class="brand-text">
          ${profil.nama}
          <small>Puskesmas</small>
        </div>
      </a>
      <ul class="navbar-links">
        <li><a href="index.html">Beranda</a></li>
        <li><a href="layanan.html">Layanan</a></li>
        <li><a href="jadwal.html">Jadwal Dokter</a></li>
        <li><a href="artikel.html">Artikel</a></li>
        <li><a href="pengumuman.html">Pengumuman</a></li>
        <li><a href="kontak.html" class="btn-nav">Kontak</a></li>
      </ul>
      <button class="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>`;
  setActiveNav();
  initHamburger();
}

// ── RENDER FOOTER ──────────────────────────────────────────
function renderFooter(profil) {
  const el = document.getElementById('footer');
  if (!el) return;
  el.innerHTML = `
    <div class="footer-inner">
      <div>
        <div class="footer-brand navbar-brand">
          <div class="brand-logo">🏥</div>
          <div class="brand-text">${profil.nama}<small>Puskesmas</small></div>
        </div>
        <p class="footer-desc">${profil.tagline}.<br>${profil.alamat}</p>
      </div>
      <div class="footer-col">
        <h4>Navigasi</h4>
        <ul>
          <li><a href="index.html">Beranda</a></li>
          <li><a href="layanan.html">Layanan</a></li>
          <li><a href="jadwal.html">Jadwal Dokter</a></li>
          <li><a href="artikel.html">Artikel</a></li>
          <li><a href="pengumuman.html">Pengumuman</a></li>
          <li><a href="kontak.html">Kontak</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Jam Operasional</h4>
        <ul>
          <li>${profil.jam_operasional.replace('|', '<br>')}</li>
        </ul>
        <h4 style="margin-top:20px">Hubungi Kami</h4>
        <ul>
          <li>${profil.telepon}</li>
          <li>${profil.email}</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} ${profil.nama}. Hak cipta dilindungi.</span>
      <span>Dibangun dengan GitHub Pages</span>
    </div>`;
}

// ── INIT ───────────────────────────────────────────────────
async function initPage(callback) {
  try {
    const profil = await fetchJSON('_data/profil.json');
    renderNavbar(profil);
    renderFooter(profil);
    if (callback) await callback(profil);
  } catch(e) {
    console.error('Init error:', e);
  }
}
