const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const modal = document.getElementById("quick-view-modal");
const modalName = document.getElementById("modal-name");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");

document.querySelectorAll(".quick-view-btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (!modal || !modalName || !modalDesc || !modalPrice) return;
    modalName.textContent = button.dataset.name || "Product";
    modalDesc.textContent = button.dataset.desc || "";
    modalPrice.textContent = button.dataset.price || "";
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

if (modal) {
  const close = modal.querySelector(".modal-close");
  if (close) {
    close.addEventListener("click", () => {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    });
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
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

document.querySelectorAll(".qty").forEach((control) => {
  const value = control.querySelector("span");
  const down = control.querySelector(".qty-down");
  const up = control.querySelector(".qty-up");
  if (!value || !down || !up) return;

  down.addEventListener("click", () => {
    const current = Number(value.textContent || "1");
    value.textContent = String(Math.max(1, current - 1));
  });

  up.addEventListener("click", () => {
    const current = Number(value.textContent || "1");
    value.textContent = String(current + 1);
  });
});

const filterButton = document.querySelector(".mobile-filter-btn");
const filterPanel = document.getElementById("shop-filters");

if (filterButton && filterPanel) {
  filterButton.addEventListener("click", () => {
    const isOpen = filterPanel.classList.toggle("is-open");
    filterButton.setAttribute("aria-expanded", String(isOpen));
  });
}
