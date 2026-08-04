// ano no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// menu mobile
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const navBackdrop = document.getElementById("navBackdrop");

let savedScrollY = 0;

function setMenu(isOpen) {
  if (isOpen === siteNav.classList.contains("is-open")) return;

  siteNav.classList.toggle("is-open", isOpen);
  navBackdrop.classList.toggle("is-open", isOpen);
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");

  // pinning the body is what actually holds the page still on iOS, but it
  // drops the scroll position, so stash it and put it back on close
  if (isOpen) {
    savedScrollY = window.scrollY;
    document.body.style.top = -savedScrollY + "px";
    document.body.classList.add("menu-open");
  } else {
    document.body.classList.remove("menu-open");
    document.body.style.top = "";
    window.scrollTo({ top: savedScrollY, behavior: "instant" });
  }
}

menuToggle.addEventListener("click", () => {
  setMenu(!siteNav.classList.contains("is-open"));
});

navBackdrop.addEventListener("click", () => setMenu(false));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

// animação simples ao rolar a página
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}
