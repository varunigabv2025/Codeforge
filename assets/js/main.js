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

  // Hero dashboard video (same animation as notion.com)
  const heroVideo = document.getElementById("heroVideo");
  const playPauseBtn = document.getElementById("heroPlayPause");
  if (heroVideo && playPauseBtn) {
    heroVideo.muted = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tryPlay = () => {
      const playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };
    if (reducedMotion) {
      heroVideo.pause();
    } else {
      tryPlay();
    }

    const pauseIcon = `
      <svg class="frontPauseButton" viewBox="0 0 16 16" style="width: 100%; height: 100%; display: block; fill: inherit; flex-shrink: 0">
        <rect x="1" y="0" width="5" height="16" rx="1"></rect>
        <rect x="9" y="0" width="5" height="16" rx="1"></rect>
      </svg>`;
    const playIcon = `
      <svg class="frontPlayButton" viewBox="0 0 14 16" style="width: 100%; height: 100%; display: block; fill: inherit; flex-shrink: 0">
        <path d="M1.34699 16C1.73805 16 2.07697 15.8756 2.52017 15.6089L12.8703 9.47556C13.6437 9.01333 14 8.62222 14 8C14 7.37778 13.6437 6.98667 12.8703 6.52444L2.52017 0.391111C2.07697 0.133333 1.73805 0 1.34699 0C0.582247 0 0 0.595556 0 1.57333V14.4356C0 15.4044 0.582247 16 1.34699 16Z"></path>
      </svg>`;

    const syncButton = () => {
      const paused = heroVideo.paused;
      const labelText = paused ? "Play" : "Pause";
      playPauseBtn.classList.toggle("is-paused", paused);
      playPauseBtn.setAttribute("aria-label", labelText);
      const icon = playPauseBtn.querySelector(".hero-play-pause-icon");
      const label = playPauseBtn.querySelector(".hero-play-pause-label");
      if (icon) {
        icon.classList.toggle("is-paused", paused);
        icon.innerHTML = paused ? playIcon : pauseIcon;
      }
      if (label) label.textContent = labelText;
    };

    playPauseBtn.addEventListener("click", () => {
      if (heroVideo.paused) {
        tryPlay();
      } else {
        heroVideo.pause();
      }
      syncButton();
    });

    heroVideo.addEventListener("play", syncButton);
    heroVideo.addEventListener("pause", syncButton);
    syncButton();
  }
})();
