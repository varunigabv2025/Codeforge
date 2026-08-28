(() => {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 8), { passive: true });
  toggle?.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    mobileNav.hidden = !isOpen;
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
  mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    mobileNav.hidden = true;
  }));
})();
