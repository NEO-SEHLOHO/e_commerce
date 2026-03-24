(() => {
  const onReady = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
      return;
    }
    fn();
  };

  const normalize = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const includesAllTokens = (source, tokenString) => {
    const tokens = normalize(tokenString).split(" ").filter(Boolean);
    if (!tokens.length) return true;
    const normalizedSource = normalize(source);
    return tokens.every((token) => normalizedSource.includes(token));
  };

  const initDrawer = () => {
    const menuToggle = document.querySelector("[data-menu-toggle]");
    const mobileDrawer = document.querySelector("[data-mobile-drawer]");
    const drawerClose = document.querySelector("[data-drawer-close]");
    const drawerBackdrop = document.querySelector("[data-drawer-backdrop]");

    const setDrawerState = (isOpen) => {
      if (!mobileDrawer || !menuToggle) return;
      mobileDrawer.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    if (menuToggle && mobileDrawer) {
      menuToggle.addEventListener("click", () => {
        const isOpen = !mobileDrawer.classList.contains("is-open");
        setDrawerState(isOpen);
      });
    }

    if (drawerClose) {
      drawerClose.addEventListener("click", () => setDrawerState(false));
    }

    if (drawerBackdrop) {
      drawerBackdrop.addEventListener("click", () => setDrawerState(false));
    }

    document.querySelectorAll("[data-drawer-link]").forEach((link) => {
      link.addEventListener("click", () => setDrawerState(false));
    });
  };

  const initAccordions = () => {
    document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".accordion-item");
        if (!item) return;
        const isOpen = item.classList.toggle("open");
        trigger.setAttribute("aria-expanded", String(isOpen));
      });
    });
  };

  const initHeroSlideshow = () => {
    const slideshow = document.querySelector("[data-slideshow]");
    if (!slideshow) return;

    const slides = Array.from(slideshow.querySelectorAll("[data-slide]"));
    const dots = Array.from(slideshow.querySelectorAll("[data-slide-dot]"));
    if (!slides.length || !dots.length) return;

    let activeIndex = 0;
    let timerId = null;

    const showSlide = (index) => {
      activeIndex = index;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });
      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
      });
    };

    const startSlideshow = () => {
      clearInterval(timerId);
      timerId = setInterval(() => {
        const nextIndex = (activeIndex + 1) % slides.length;
        showSlide(nextIndex);
      }, 2500);
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        startSlideshow();
      });
    });

    showSlide(0);
    startSlideshow();
  };

  const initShopCatalog = () => {
    const catalogStack = document.querySelector(".catalog-stack");
    const pillsWrap = document.querySelector(".pills");
    if (!catalogStack || !pillsWrap) return;

    const sections = Array.from(catalogStack.querySelectorAll(":scope > section"));
    if (!sections.length) return;

    const toolbarLeftSpans = Array.from(
      document.querySelectorAll(".catalog-toolbar .toolbar-left span")
    );
    const showingLabel = toolbarLeftSpans[0] || null;
    const countLabel = document.querySelector(".catalog-toolbar .toolbar-left .muted");
    const sortSelect = document.querySelector(".catalog-toolbar select");
    const searchInputs = Array.from(
      document.querySelectorAll(".search-shell input[type='search'], .drawer-search input[type='search']")
    );

    const sectionMeta = sections.map((section) => {
      const label = section.querySelector(".section-label")?.textContent?.trim() || "";
      const title = section.querySelector("h2")?.textContent?.trim() || "";
      const cards = Array.from(section.querySelectorAll(".product-card, .feature-card"));
      cards.forEach((card, index) => {
        card.dataset.originalIndex = String(index);
      });

      return {
        element: section,
        label,
        title,
        key: normalize(label),
        cards
      };
    });

    const pillButtons = Array.from(pillsWrap.querySelectorAll(".pill"));
    const keyAliases = new Map([
      ["all", "all"],
      ["jackets blazers", "jackets blazers"],
      ["pants skirts", "pants skirts"],
      ["jerseys tracksuits", "jerseys tracksuits"],
      ["shirts t shirts", "shirts t shirts"],
      ["customisation branding", "customisation branding"],
      ["printing embroidery", "customisation branding"]
    ]);

    const mapPillToKey = (pillText) =>
      keyAliases.get(normalize(pillText)) || normalize(pillText);

    let activeKey = mapPillToKey(
      pillButtons.find((pill) => pill.classList.contains("active"))?.textContent || "All"
    );
    let searchTerm = "";
    let sortMode = normalize(sortSelect?.value || "featured");

    const getVisibleCards = () =>
      sectionMeta.flatMap((meta) =>
        meta.cards.filter((card) => !card.hidden && !meta.element.hidden)
      );

    const updateToolbar = () => {
      const activePill = pillButtons.find((pill) => pill.classList.contains("active"));
      const label = activePill ? activePill.textContent.trim() : "All categories";
      const totalVisible = getVisibleCards().length;

      if (showingLabel) {
        showingLabel.textContent = label === "All" ? "All categories" : label;
      }
      if (countLabel) {
        countLabel.textContent = `${totalVisible} item${totalVisible === 1 ? "" : "s"}`;
      }
    };

    const sortGrid = (grid) => {
      const cards = Array.from(grid.children).filter((el) =>
        el.classList.contains("product-card")
      );
      if (!cards.length) return;

      const sorted = [...cards];
      if (sortMode.includes("alphabetical")) {
        sorted.sort((a, b) => {
          const aTitle = a.querySelector("h3")?.textContent || "";
          const bTitle = b.querySelector("h3")?.textContent || "";
          return aTitle.localeCompare(bTitle, undefined, { sensitivity: "base" });
        });
      } else if (sortMode.includes("newest")) {
        sorted.sort(
          (a, b) =>
            Number(b.dataset.originalIndex || "0") - Number(a.dataset.originalIndex || "0")
        );
      } else {
        sorted.sort(
          (a, b) =>
            Number(a.dataset.originalIndex || "0") - Number(b.dataset.originalIndex || "0")
        );
      }

      sorted.forEach((card) => grid.appendChild(card));
    };

    const applyCatalogState = () => {
      sectionMeta.forEach((meta) => {
        const isCategoryMatch =
          activeKey === "all" || includesAllTokens(meta.key, activeKey);

        meta.cards.forEach((card) => {
          const searchableText = `${meta.label} ${meta.title} ${card.textContent || ""}`;
          const isSearchMatch = includesAllTokens(searchableText, searchTerm);
          card.hidden = !isCategoryMatch || !isSearchMatch;
        });

        const hasVisibleCards = meta.cards.some((card) => !card.hidden);
        meta.element.hidden = !hasVisibleCards;

        meta.element
          .querySelectorAll(".product-grid")
          .forEach((grid) => sortGrid(grid));
      });

      updateToolbar();
    };

    pillButtons.forEach((pill) => {
      pill.addEventListener("click", () => {
        pillButtons.forEach((btn) => btn.classList.remove("active"));
        pill.classList.add("active");
        activeKey = mapPillToKey(pill.textContent || "");
        applyCatalogState();
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        sortMode = normalize(sortSelect.value);
        applyCatalogState();
      });
    }

    const syncSearchInputs = (value, source) => {
      searchInputs.forEach((input) => {
        if (input !== source) {
          input.value = value;
        }
      });
    };

    searchInputs.forEach((input) => {
      input.addEventListener("input", () => {
        searchTerm = input.value.trim();
        syncSearchInputs(searchTerm, input);
        applyCatalogState();
      });
    });

    applyCatalogState();
  };

  onReady(() => {
    initDrawer();
    initAccordions();
    initHeroSlideshow();
    initShopCatalog();
  });
})();
