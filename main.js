(() => {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const SHOP = {
    catalogRoot: ".catalog-stack",
    pillsWrap: ".pills",
    sections: ":scope > section",
    sortSelect: ".catalog-toolbar select",
    searchInputs: ".search-shell input[type='search'], .drawer-search input[type='search']",
    countLabel: ".catalog-toolbar .toolbar-left .muted",
    showingLabel: ".catalog-toolbar .toolbar-left span",
    pillButtons: ".pill",
    productGrids: ".product-grid",
    productCards: ".product-card",
    cardsInSection: ".product-card, .feature-card"
  };
  const SORT_MODE = {
    featured: "featured",
    alphabetical: "alphabetical",
    newest: "newest"
  };

  const onReady = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
      return;
    }
    fn();
  };

  const normalizeText = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const includesAllTokens = (source, query) => {
    const tokens = normalizeText(query).split(" ").filter(Boolean);
    if (!tokens.length) return true;
    const sourceText = normalizeText(source);
    return tokens.every((token) => sourceText.includes(token));
  };

  const initDrawer = () => {
    const menuToggle = qs("[data-menu-toggle]");
    const mobileDrawer = qs("[data-mobile-drawer]");
    const drawerClose = qs("[data-drawer-close]");
    const drawerBackdrop = qs("[data-drawer-backdrop]");
    if (!menuToggle || !mobileDrawer) return;

    const setDrawerState = (isOpen) => {
      mobileDrawer.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    menuToggle.addEventListener("click", () => {
      setDrawerState(!mobileDrawer.classList.contains("is-open"));
    });

    if (drawerClose) {
      drawerClose.addEventListener("click", () => setDrawerState(false));
    }

    if (drawerBackdrop) {
      drawerBackdrop.addEventListener("click", () => setDrawerState(false));
    }

    qsa("[data-drawer-link]").forEach((link) => {
      link.addEventListener("click", () => setDrawerState(false));
    });
  };

  const initAccordions = () => {
    qsa(".accordion-trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".accordion-item");
        if (!item) return;
        const isOpen = item.classList.toggle("open");
        trigger.setAttribute("aria-expanded", String(isOpen));
      });
    });
  };

  const initHeroSlideshow = () => {
    const slideshow = qs("[data-slideshow]");
    if (!slideshow) return;

    const slides = qsa("[data-slide]", slideshow);
    const dots = qsa("[data-slide-dot]", slideshow);
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
        showSlide((activeIndex + 1) % slides.length);
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
    const catalogStack = qs(SHOP.catalogRoot);
    const pillsWrap = qs(SHOP.pillsWrap);
    if (!catalogStack || !pillsWrap) return;

    const sections = qsa(SHOP.sections, catalogStack);
    if (!sections.length) return;

    const sortSelect = qs(SHOP.sortSelect);
    const searchInputs = qsa(SHOP.searchInputs);
    const countLabel = qs(SHOP.countLabel);
    const showingLabel = qsa(SHOP.showingLabel)[0] || null;
    const pillButtons = qsa(SHOP.pillButtons, pillsWrap);

    qsa(SHOP.productGrids, catalogStack).forEach((grid) => {
      qsa(SHOP.productCards, grid).forEach((card, index) => {
        card.dataset.originalIndex = String(index);
      });
    });

    const sectionModels = sections.map((section) => {
      const label = (qs(".section-label", section)?.textContent || "").trim();
      const title = (qs("h2", section)?.textContent || "").trim();
      const cards = qsa(SHOP.cardsInSection, section);
      const key = section.dataset.sectionKey || normalizeText(label).replace(/\s+/g, "-");

      return { element: section, key, label, title, cards };
    });

    const state = {
      filterKey:
        pillButtons.find((pill) => pill.classList.contains("active"))?.dataset.filter || "all",
      search: "",
      sort: normalizeText(sortSelect?.value || SORT_MODE.featured)
    };

    const sortGrid = (grid) => {
      const cards = qsa(`:scope > ${SHOP.productCards}`, grid);
      if (!cards.length) return;

      const sorted = [...cards];
      if (state.sort.includes(SORT_MODE.alphabetical)) {
        sorted.sort((a, b) => {
          const aTitle = qs("h3", a)?.textContent || "";
          const bTitle = qs("h3", b)?.textContent || "";
          return aTitle.localeCompare(bTitle, undefined, { sensitivity: "base" });
        });
      } else if (state.sort.includes(SORT_MODE.newest)) {
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

    const syncSearchInputs = (value, sourceInput) => {
      searchInputs.forEach((input) => {
        if (input !== sourceInput) {
          input.value = value;
        }
      });
    };

    const updateToolbar = () => {
      const activePill = pillButtons.find((pill) => pill.classList.contains("active"));
      const filterLabel = activePill ? activePill.textContent.trim() : "All categories";
      const visibleCards = sectionModels.flatMap((model) =>
        model.cards.filter((card) => !card.hidden && !model.element.hidden)
      );

      if (showingLabel) {
        showingLabel.textContent = filterLabel === "All" ? "All categories" : filterLabel;
      }

      if (countLabel) {
        const count = visibleCards.length;
        countLabel.textContent = `${count} item${count === 1 ? "" : "s"}`;
      }
    };

    const applyCatalogState = () => {
      sectionModels.forEach((model) => {
        const categoryMatch = state.filterKey === "all" || model.key === state.filterKey;

        model.cards.forEach((card) => {
          const searchableText = `${model.label} ${model.title} ${card.textContent || ""}`;
          const searchMatch = includesAllTokens(searchableText, state.search);
          card.hidden = !categoryMatch || !searchMatch;
        });

        model.element.hidden = !model.cards.some((card) => !card.hidden);
        qsa(SHOP.productGrids, model.element).forEach((grid) => sortGrid(grid));
      });

      updateToolbar();
    };

    pillButtons.forEach((pill) => {
      pill.addEventListener("click", () => {
        pillButtons.forEach((btn) => btn.classList.remove("active"));
        pill.classList.add("active");
        state.filterKey = pill.dataset.filter || "all";
        applyCatalogState();
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        state.sort = normalizeText(sortSelect.value);
        applyCatalogState();
      });
    }

    searchInputs.forEach((input) => {
      input.addEventListener("input", () => {
        state.search = input.value.trim();
        syncSearchInputs(state.search, input);
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
