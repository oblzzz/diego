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