(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const yearEl = document.querySelector("[data-year]");
  const form = document.getElementById("registration-form");
  const formStatus = document.querySelector("[data-form-status]");
  const submitBtn = document.querySelector("[data-submit]");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Sticky header: transparent over hero, elevated on scroll */
  const hero = document.querySelector(".hero");
  const backToTop = document.querySelector("[data-back-to-top]");

  const onScroll = () => {
    if (!header) return;
    const scrolled = window.scrollY > 12;
    header.classList.toggle("is-scrolled", scrolled);

    if (hero) {
      const threshold = Math.max(hero.offsetHeight - header.offsetHeight, 80);
      header.classList.toggle("is-over-hero", window.scrollY < threshold);
    }

    if (backToTop) {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      // Show once past the hero, and keep available toward the bottom
      const show = window.scrollY > window.innerHeight * 0.85 || progress > 0.55;
      backToTop.classList.toggle("is-visible", show);
      if (show) {
        backToTop.removeAttribute("hidden");
      } else {
        backToTop.setAttribute("hidden", "");
      }
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  backToTop?.addEventListener("click", (e) => {
    if (!reduceMotion) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      const top = document.getElementById("top");
      if (top) {
        top.setAttribute("tabindex", "-1");
        top.focus({ preventScroll: true });
      }
    }
  });

  /* Mobile nav */
  const setNavOpen = (open) => {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  };

  navToggle?.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") !== "true";
    setNavOpen(open);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNavOpen(false);
  });

  /* Scroll reveal + staggered entrance */
  const revealEls = document.querySelectorAll(".animate-on-scroll");

  if (reduceMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    let revealIndex = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (!el.style.getPropertyValue("--reveal-delay")) {
            const delay = (revealIndex % 4) * 0.06;
            el.style.setProperty("--reveal-delay", `${delay}s`);
            revealIndex += 1;
          }
          el.classList.add("is-visible");
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Experience gallery: each image drifts at a different rate */
  const parallaxItems = Array.from(document.querySelectorAll("[data-parallax]")).map(
    (frame) => ({
      frame,
      img: frame.querySelector("img"),
      speed: parseFloat(frame.getAttribute("data-parallax-speed") || "0.15", 10),
    })
  );

  const updateGalleryParallax = () => {
    if (reduceMotion || !parallaxItems.length) return;
    const viewH = window.innerHeight || 1;

    parallaxItems.forEach(({ frame, img, speed }) => {
      if (!img) return;
      const rect = frame.getBoundingClientRect();
      if (rect.bottom < -viewH || rect.top > viewH * 2) return;

      const frameMid = rect.top + rect.height / 2;
      const viewMid = viewH / 2;
      const progress = (frameMid - viewMid) / viewH;
      const offset = Math.max(-90, Math.min(90, progress * speed * 200));
      img.style.transform = `scale(1.22) translate3d(0, ${offset}px, 0)`;
    });
  };

  let parallaxTicking = false;
  const onParallaxScroll = () => {
    if (parallaxTicking) return;
    parallaxTicking = true;
    window.requestAnimationFrame(() => {
      updateGalleryParallax();
      parallaxTicking = false;
    });
  };

  updateGalleryParallax();
  window.addEventListener("scroll", onParallaxScroll, { passive: true });
  window.addEventListener("resize", onParallaxScroll, { passive: true });

  /* FAQ accordion — smooth height via grid rows */
  const accordion = document.querySelector("[data-accordion]");
  accordion?.querySelectorAll(".accordion__trigger").forEach((trigger) => {
    const panelId = trigger.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    if (panel) {
      panel.hidden = false;
      panel.setAttribute("aria-hidden", "true");
    }

    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (panel) {
        panel.classList.toggle("is-open", !expanded);
        panel.setAttribute("aria-hidden", expanded ? "true" : "false");
      }
    });
  });

  /* Form validation — prevent errors, clear recovery messages */
  const messages = {
    firstName: "Enter your first name.",
    lastName: "Enter your last name.",
    email: "Enter a valid email address.",
    phone: "Enter a phone number so we can reach you.",
    address: "Enter your street address.",
    city: "Enter your city.",
    state: "Enter a 2-letter state code (e.g. NJ).",
    zip: "Enter a valid ZIP code.",
    consent: "Confirm eligibility to continue.",
  };

  const validators = {
    firstName: (v) => v.trim().length >= 1,
    lastName: (v) => v.trim().length >= 1,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    phone: (v) => v.replace(/\D/g, "").length >= 10,
    address: (v) => v.trim().length >= 3,
    city: (v) => v.trim().length >= 2,
    state: (v) => /^[A-Za-z]{2}$/.test(v.trim()),
    zip: (v) => /^\d{5}(-\d{4})?$/.test(v.trim()),
    consent: (_, el) => el?.checked === true,
  };

  const fieldMap = {
    firstName: "first-name",
    lastName: "last-name",
    email: "email",
    phone: "phone",
    address: "address",
    city: "city",
    state: "state",
    zip: "zip",
    consent: "consent",
  };

  const setFieldError = (id, message) => {
    const input = document.getElementById(id);
    const errorEl = document.querySelector(`[data-error-for="${id}"]`);
    if (!input || !errorEl) return;

    if (message) {
      input.classList.add("is-invalid");
      input.setAttribute("aria-invalid", "true");
      errorEl.hidden = false;
      errorEl.textContent = message;
    } else {
      input.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
      errorEl.hidden = true;
      errorEl.textContent = "";
    }
  };

  const validateField = (name) => {
    const id = fieldMap[name];
    const el = document.getElementById(id);
    if (!el) return true;

    const value = el.type === "checkbox" ? "" : el.value;
    const ok = validators[name](value, el);
    setFieldError(id, ok ? "" : messages[name]);
    return ok;
  };

  Object.keys(fieldMap).forEach((name) => {
    const el = document.getElementById(fieldMap[name]);
    if (!el) return;
    const eventName = el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "blur";
    el.addEventListener(eventName, () => validateField(name));
    if (el.type !== "checkbox") {
      el.addEventListener("input", () => {
        if (name === "state") {
          el.value = el.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
        }
        if (el.classList.contains("is-invalid")) validateField(name);
      });
    }
  });

  const showStatus = (type, text) => {
    if (!formStatus) return;
    formStatus.hidden = false;
    formStatus.classList.remove("is-success", "is-error");
    formStatus.classList.add(type === "success" ? "is-success" : "is-error");
    formStatus.textContent = text;
  };

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const required = Object.keys(validators);
    let firstInvalid = null;
    let allValid = true;

    required.forEach((name) => {
      const ok = validateField(name);
      if (!ok) {
        allValid = false;
        if (!firstInvalid) firstInvalid = document.getElementById(fieldMap[name]);
      }
    });

    if (!allValid) {
      showStatus(
        "error",
        "Please review the highlighted fields and try again."
      );
      firstInvalid?.focus();
      formStatus?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    submitBtn?.setAttribute("disabled", "true");
    if (submitBtn) submitBtn.textContent = "Submitting…";

    // Demo-only submit — no backend
    window.setTimeout(() => {
      form.reset();
      Object.values(fieldMap).forEach((id) => setFieldError(id, ""));
      showStatus(
        "success",
        "Thank you. Your registration request has been received. Check your email for confirmation within two business days."
      );
      if (submitBtn) {
        submitBtn.removeAttribute("disabled");
        submitBtn.textContent = "Submit registration";
      }
      formStatus?.focus?.();
      formStatus?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 700);
  });
})();
