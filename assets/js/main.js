(() => {
  const words = ["Think", "Scale", "Build", "Plan", "Ship"];
  const thinkWord = document.getElementById("thinkWord");
  let wordIndex = 0;

  if (thinkWord && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      thinkWord.style.opacity = "0";
      thinkWord.style.transform = "translateY(8px)";
      thinkWord.style.transition = "opacity 180ms ease, transform 180ms ease";
      setTimeout(() => {
        thinkWord.textContent = words[wordIndex];
        thinkWord.style.opacity = "1";
        thinkWord.style.transform = "translateY(0)";
      }, 180);
    }, 2200);
  }

  // Duplicate marquee content for seamless loop
  function duplicateTrack(id) {
    const track = document.getElementById(id);
    if (!track) return;
    track.innerHTML += track.innerHTML;
  }
  duplicateTrack("logoTrack");
  duplicateTrack("statsTrack");

  // Sticky header border on scroll
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Desktop dropdowns
  const dropdowns = document.querySelectorAll("[data-dropdown]");
  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".nav-dropdown-btn");
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains("open");
      dropdowns.forEach((d) => {
        d.classList.remove("open");
        const b = d.querySelector(".nav-dropdown-btn");
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        dropdown.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", () => {
    dropdowns.forEach((d) => {
      d.classList.remove("open");
      const b = d.querySelector(".nav-dropdown-btn");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  });

  // Mobile menu
  const toggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      mobileNav.hidden = !open;
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        mobileNav.hidden = true;
      });
    });
  }
})();
