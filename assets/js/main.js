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

document.addEventListener("DOMContentLoaded", () => {
  const hudPanel = document.querySelector(".hud-panel");
  const hudTitle = document.querySelector(".hud-card-title");
  const hudIndicator = document.querySelector(".hud-indicator");

  if (!hudPanel || !hudTitle) return;

  hudTitle.addEventListener("click", () => {
    const isOpen = hudPanel.classList.contains("open");

    if (!isOpen) {
      // 1. ABRIR: Desliza o painel empurrando o layout abaixo
      hudPanel.classList.remove("closed");
      hudPanel.classList.add("open");
      hudTitle.setAttribute("aria-expanded", "true");

      // 2. ACENDER INDICADOR: Aguarda 480ms (fim do slide de descida)
      setTimeout(() => {
        if (hudPanel.classList.contains("open")) {
          hudIndicator.classList.add("active");
        }
      }, 480);

    } else {
      // 1. FECHAR: Apaga a luz imediatamente
      hudIndicator.classList.remove("active");

      // 2. RECOLHER: Recolhe o painel trazendo a seção de Projetos de volta para cima
      hudPanel.classList.remove("open");
      hudPanel.classList.add("closed");
      hudTitle.setAttribute("aria-expanded", "false");
    }
  });

  // Acessibilidade via teclado
  hudTitle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      hudTitle.click();
    }
  });
});

/* =========================================================
MINIATURA FLUTUANTE EM HOVER (APENAS DESKTOP)
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const projectWrappers = document.querySelectorAll(".project-wrapper");
  const previewBox = document.getElementById("project-hover-preview");
  const previewImg = document.getElementById("project-hover-img");

  if (!previewBox || !previewImg || projectWrappers.length === 0) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let isHovering = false;

  // Atualiza a posição do mouse no desktop
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Loop para animação suave da miniatura seguindo o cursor
  // Define o afastamento da imagem em relação ao ponteiro
  const offsetX = 30;  // 30px para a direita
  const offsetY = -20; // 20px para cima do cursor

  // Loop para animação suave da miniatura seguindo o cursor com offset
  function renderPreview() {
    if (isHovering && window.innerWidth >= 768) {
      // Aplica o deslocamento ao destino x e y
      const targetX = mouseX + offsetX;
      const targetY = mouseY + offsetY;

      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      previewBox.style.left = `${currentX}px`;
      previewBox.style.top = `${currentY}px`;
    }
    requestAnimationFrame(renderPreview);
  }
  renderPreview();

  // Ativa a miniatura ao passar o mouse apenas em telas Desktop
  projectWrappers.forEach((wrapper) => {
    const desktopLink = wrapper.querySelector(".project-desktop-link");
    const imgSrc = wrapper.getAttribute("data-image");

    if (desktopLink && imgSrc) {
      desktopLink.addEventListener("mouseenter", (e) => {
        if (window.innerWidth < 768) return;

        previewImg.src = imgSrc;
        isHovering = true;

        currentX = e.clientX;
        currentY = e.clientY;
        previewBox.style.left = `${currentX}px`;
        previewBox.style.top = `${currentY}px`;

        previewBox.classList.add("active");
      });

      desktopLink.addEventListener("mouseleave", () => {
        isHovering = false;
        previewBox.classList.remove("active");
      });
    }
  });
});