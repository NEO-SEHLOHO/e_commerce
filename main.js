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

const filterToggle = document.querySelector("[data-filter-toggle]");
const filterPanel = document.querySelector("[data-filter-panel]");

if (filterToggle && filterPanel) {
  filterToggle.addEventListener("click", () => {
    const isOpen = filterPanel.classList.toggle("is-open");
    filterToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".accordion-item");
    if (!item) return;
    const isOpen = item.classList.toggle("open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  });
});
