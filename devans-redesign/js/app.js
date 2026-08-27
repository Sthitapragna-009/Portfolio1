/* DEVAN'S — redesign — shared app logic */

const money = (n) => `₹${n.toLocaleString("en-IN")}`;

const brewIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 8h13a3 3 0 0 1 0 6h-1"/><path d="M4 8v8a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V8"/><path d="M7 4c0 1-1 1-1 2M11 4c0 1-1 1-1 2M15 4c0 1-1 1-1 2"/></svg>`;

/* ---------------------------------- coffee card ---------------------------------- */
function coffeeCardHTML(p) {
  const brewsShown = p.brews.slice(0, 3);
  return `
  <article class="product-card">
    <div class="product-photo">
      <a href="product.html?slug=${p.slug}" class="product-link-overlay" aria-label="${p.name}"></a>
      ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ""}
      <img src="${p.image}" alt="${p.name} — ${p.sub}" loading="lazy" width="500" height="500" />
    </div>
    <div class="product-body">
      <div class="product-name-row">
        <h3 class="product-name">${p.name}<span>${p.sub}</span></h3>
        <span class="product-price">${money(p.price)}</span>
      </div>
      <div class="gauge-row">
        <span class="gauge-row-label">${ROAST_LEVELS[p.roast]}</span>
        ${roastGauge(p.roast)}
      </div>
      ${tasteScale(p.metrics)}
      <div class="card-brew-row">
        <span class="card-brew-label">Brews well as</span>
        <div class="card-brew-chips">
          ${brewsShown.map((b) => `<span class="brew-chip brew-chip-sm">${brewIcon}${b}</span>`).join("")}
          ${p.brews.length > 3 ? `<span class="brew-chip brew-chip-sm brew-chip-more">+${p.brews.length - 3}</span>` : ""}
        </div>
      </div>
    </div>
  </article>`;
}

function renderGrid(el, products) {
  if (!el) return;
  el.innerHTML = products.map(coffeeCardHTML).join("");
}

/* ---------------------------------- toast ---------------------------------- */
function showToast(msg) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = `<span class="dot"></span><span class="toast-msg"></span>`;
    document.body.appendChild(t);
  }
  t.querySelector(".toast-msg").textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------------------------------- nav active state ---------------------------------- */
function markActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", markActiveNav);
