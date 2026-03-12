(() => {
  const itemsRoot = document.getElementById("qb-items");
  const addBtn = document.getElementById("qb-add-item");
  const waBtn = document.getElementById("qb-send-whatsapp");
  const mailBtn = document.getElementById("qb-send-email");
  const requestDateInput = document.getElementById("qb-request-date");

  if (!itemsRoot || !addBtn || !waBtn || !mailBtn) return;

  let rowId = 0;
  const today = new Date();
  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  if (requestDateInput) {
    requestDateInput.value = todayIso;
  }

  const itemOptions = [
    { label: "Select item", value: "" },
    { label: "Blazer", value: "Blazer" },
    { label: "Varsity Jacket", value: "Varsity Jacket" },
    { label: "Hoodie Jacket", value: "Hoodie Jacket" },
    { label: "Sweater", value: "Sweater" },
    { label: "Jersey", value: "Jersey" },
    { label: "Tracksuit", value: "Tracksuit" },
    { label: "Polo / Golfer Shirt", value: "Polo / Golfer Shirt" },
    { label: "School Shirt", value: "School Shirt" },
    { label: "Trousers", value: "Trousers" },
    { label: "Skirt", value: "Skirt" },
    { label: "Dress / Tunic", value: "Dress / Tunic" },
    { label: "Tie", value: "Tie" },
    { label: "Embroidery", value: "Embroidery" },
    { label: "Printing", value: "Printing" },
    { label: "Custom Branding", value: "Custom Branding" }
  ];

  const optionsHtml = itemOptions
    .map((opt) => `<option value="${opt.value}">${opt.label}</option>`)
    .join("");

  const getField = (id) => (document.getElementById(id)?.value || "").trim();

  const createRow = () => {
    rowId += 1;
    const row = document.createElement("div");
    row.className = "line-item-row";
    row.dataset.rowId = String(rowId);
    row.innerHTML = `
      <select class="li-item">${optionsHtml}</select>
      <input type="text" class="li-size" placeholder="Size range (optional)">
      <input type="number" class="li-qty" min="1" step="1" value="1" placeholder="Qty">
      <button type="button" class="btn btn-secondary li-remove">Remove</button>
    `;

    row.querySelector(".li-item")?.addEventListener("change", updateLinks);

    row.querySelector(".li-remove")?.addEventListener("click", () => {
      row.remove();
      if (!itemsRoot.querySelector(".line-item-row")) {
        itemsRoot.appendChild(createRow());
      }
      updateLinks();
    });

    return row;
  };

  const buildMessage = () => {
    const school = getField("qb-school");
    const contact = getField("qb-contact");
    const email = getField("qb-email");
    const phone = getField("qb-phone");
    const reference = getField("qb-reference");
    const province = getField("qb-province");
    const requestDate = getField("qb-request-date") || todayIso;
    const notes = getField("qb-notes");

    const rows = Array.from(itemsRoot.querySelectorAll(".line-item-row"));
    const lines = rows
      .map((row, idx) => {
        const item = (row.querySelector(".li-item")?.value || "").trim();
        const size = (row.querySelector(".li-size")?.value || "").trim();
        const qty = (row.querySelector(".li-qty")?.value || "").trim();
        if (!item) return "";
        return `${idx + 1}. ${item} | Size: ${size || "N/A"} | Qty: ${qty || "1"}`;
      })
      .filter(Boolean);

    const itemBlock = lines.length ? lines.join("\n") : "No list items added yet.";

    return [
      "Hello B&T Apparel, please assist with a quotation.",
      "",
      `Reference: ${reference || "N/A"}`,
      `School/Organisation: ${school || "N/A"}`,
      `Contact Person: ${contact || "N/A"}`,
      `Email: ${email || "N/A"}`,
      `Phone: ${phone || "N/A"}`,
      `Province: ${province || "N/A"}`,
      `Request Date: ${requestDate}`,
      "",
      "Quotation List:",
      itemBlock,
      "",
      `Notes: ${notes || "N/A"}`
    ].join("\n");
  };

  function updateLinks() {
    const message = buildMessage();
    const encoded = encodeURIComponent(message);
    waBtn.href = `https://wa.me/27607711685?text=${encoded}`;
    mailBtn.href = `mailto:bntinnocons@gmail.com?subject=Quotation%20Request&body=${encoded}`;
  }

  const hasAtLeastOneItem = () => {
    const rows = Array.from(itemsRoot.querySelectorAll(".line-item-row"));
    return rows.some((row) => ((row.querySelector(".li-item")?.value || "").trim().length > 0));
  };

  const hasReference = () => getField("qb-reference").length > 0;

  const guardSend = (event) => {
    if (!hasReference()) {
      event.preventDefault();
      window.alert("Please enter a reference: your Name & Surname or School name.");
      return;
    }
    if (hasAtLeastOneItem()) return;
    event.preventDefault();
    window.alert("Please select at least one item for your quotation list.");
  };

  addBtn.addEventListener("click", () => {
    itemsRoot.appendChild(createRow());
    updateLinks();
  });

  waBtn.addEventListener("click", guardSend);
  mailBtn.addEventListener("click", guardSend);

  document.getElementById("quote-builder")?.addEventListener("input", updateLinks);

  itemsRoot.appendChild(createRow());
  updateLinks();
})();
