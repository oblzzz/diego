const menu = document.getElementById("side-menu");
const overlay = document.getElementById("menu-overlay");

const openBtn = document.getElementById("menu-toggle");
const closeBtn = document.getElementById("close-menu");

function openMenu(){

  menu.classList.add("active");
  overlay.classList.add("active");

  document.body.classList.add("menu-open");
}

function closeMenu(){

  menu.classList.remove("active");
  overlay.classList.remove("active");

  document.body.classList.remove("menu-open");
}

openBtn.addEventListener("click", openMenu);

closeBtn.addEventListener("click", closeMenu);

overlay.addEventListener("click", closeMenu);

/* FECHA AO CLICAR NOS LINKS */

document.querySelectorAll(".menu-list a").forEach(link => {

  link.addEventListener("click", () => {

    closeMenu();
  });
});


// =====================================

// Vídeo desktop/mobile

// =====================================
const video = document.querySelector('.name-video');
const source = video.querySelector('source');

source.src = window.matchMedia('(max-width: 768px)').matches
  ? 'assets/video/name-mob.mp4'
  : 'assets/video/name.mp4';

video.load();





// =====================================

// CTA Whatsapp 
// =====================================


const cta = document.getElementById('cta-img');

const OFF = 'assets/img/contact/cta-wp-off.webp';
const ON = 'assets/img/contact/cta-wp-on.webp';
const HOVER = 'assets/img/contact/cta-wp-hover.webp';

let hovering = false;
let idleTimeout;
let hoverLoop;

// ============================
// IDLE LOOP (pisca sutil)
// ============================
function startIdle() {
  clearInterval(hoverLoop);

  function loop() {
    if (hovering) return;

    cta.src = OFF;

    idleTimeout = setTimeout(() => {
      if (!hovering) cta.src = ON;

      idleTimeout = setTimeout(loop, 800);
    }, 800);
  }

  loop();
}

// ============================
// HOVER LOOP (efeito ativo)
// ============================
function startHover() {
  clearTimeout(idleTimeout);

  cta.src = HOVER;

  hoverLoop = setInterval(() => {
    if (!hovering) return;

    cta.src = OFF;

    setTimeout(() => {
      if (hovering) cta.src = HOVER;
    }, 80);
  }, 1800);
}

// ============================
// EVENTS
// ============================
cta.parentElement.addEventListener('mouseenter', () => {
  hovering = true;
  startHover();
});

cta.parentElement.addEventListener('mouseleave', () => {
  hovering = false;

  clearInterval(hoverLoop);
  clearTimeout(idleTimeout);

  cta.src = OFF;
  startIdle();
});

// init
startIdle();