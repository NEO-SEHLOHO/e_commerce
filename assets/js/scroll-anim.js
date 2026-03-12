(() => {
  const onReady = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
      return;
    }
    fn();
  };

  const addReveal = (elements) => {
    elements.forEach((el) => el.classList.add("reveal"));
  };

  const addStaggeredReveal = (selector) => {
    const items = Array.from(document.querySelectorAll(selector));
    items.forEach((item, index) => {
      item.classList.add("reveal");
      item.classList.add(`delay-${(index % 4) + 1}`);
    });
    return items;
  };

  onReady(() => {
    const baseSelectors = [
      ".hero-copy",
      ".hero-right",
      ".hero-banner",
      ".section-head",
      ".title-stack",
      ".split-section",
      ".catalog-toolbar",
      ".accordion-stack .accordion-item",
      ".info-grid > .card"
    ];

    const staggerSelectors = [
      ".chip-row .category-tile",
      ".feature-grid .feature-card",
      ".audience-grid .audience-card",
      ".product-grid .product-card",
      ".steps-grid .step-card",
      ".footer-grid .footer-block"
    ];

    const baseElements = baseSelectors.flatMap((selector) =>
      Array.from(document.querySelectorAll(selector))
    );
    addReveal(baseElements);

    const staggeredElements = staggerSelectors.flatMap((selector) =>
      addStaggeredReveal(selector)
    );

    const revealElements = Array.from(
      new Set([...baseElements, ...staggeredElements])
    );

    if (!revealElements.length) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      revealElements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const pending = new Set(revealElements);
    let observer = null;

    const revealElement = (el) => {
      if (!pending.has(el)) {
        return;
      }
      el.classList.add("is-visible");
      pending.delete(el);
      if (observer) {
        observer.unobserve(el);
      }
    };

    const revealByViewport = () => {
      const preloadTop = -window.innerHeight * 0.2;
      const preloadBottom = window.innerHeight * 1.45;
      pending.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= preloadBottom && rect.bottom >= preloadTop) {
          revealElement(el);
        }
      });
    };

    // Ensure content near the fold is visible immediately without requiring wheel input.
    revealByViewport();
    requestAnimationFrame(revealByViewport);
    window.addEventListener("load", revealByViewport, { once: true });
    window.addEventListener("scroll", revealByViewport, { passive: true });
    window.addEventListener("resize", revealByViewport);

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    observer = new IntersectionObserver(
      (entries, instance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          revealElement(entry.target);
          instance.unobserve(entry.target);
        });
      },
      {
        threshold: 0.04,
        rootMargin: "0px 0px 22% 0px"
      }
    );

    pending.forEach((element) => observer.observe(element));
  });
})();
