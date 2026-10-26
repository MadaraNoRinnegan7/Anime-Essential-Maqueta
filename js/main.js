/* =========================================
   Anime Essential Store × Let's Play — maqueta
   Edita los datos en las listas de abajo (PRODUCTOS, EVENTOS, HORARIO)
   ========================================= */

// WhatsApp de la tienda (formato internacional, solo números)
const WHATSAPP = "56935996658";

// Horario: día (0 domingo … 6 sábado) → [apertura, cierre]. Sin entrada = cerrado
const HORARIO = {
  1: ["11:00", "20:00"],
  2: ["11:00", "20:00"],
  3: ["11:00", "20:00"],
  4: ["11:00", "20:00"],
  5: ["11:00", "20:00"],
  6: ["11:00", "20:00"],
};

// Productos (cat: tcg | kits | mesa | acc · stock: unidades)
const PRODUCTOS = [
  { nombre: "Sobres Pokémon 30 Aniversario", cat: "tcg", stock: 40, color: "#FFD23F" },
  { nombre: "Display Yu-Gi-Oh!", cat: "tcg", stock: 3, color: "#3D6BFF" },
  { nombre: "Sobres Mitos y Leyendas", cat: "tcg", stock: 25, color: "#FF4A0B" },
  { nombre: "Starter Deck One Piece", cat: "tcg", stock: 6, color: "#E63946" },
  { nombre: "Model kit Gundam HG", cat: "kits", stock: 8, color: "#8D99AE" },
  { nombre: "Model kit Gundam RG", cat: "kits", stock: 2, color: "#5C677D" },
  { nombre: "Pinturas y herramientas para kits", cat: "kits", stock: 15, color: "#2EC4B6" },
  { nombre: "Juegos de mesa familiares", cat: "mesa", stock: 10, color: "#9B5DE5" },
  { nombre: "Juegos de mesa de estrategia", cat: "mesa", stock: 0, color: "#6A4C93" },
  { nombre: "Fundas Dragon Shield", cat: "acc", stock: 30, color: "#111111" },
  { nombre: "Deck box y carpetas", cat: "acc", stock: 12, color: "#FF8C42" },
  { nombre: "Playmats", cat: "acc", stock: 5, color: "#1FA855" },
];

// Categorías: tarjetas de inicio, filtros de la tienda y links del footer
const CATEGORIAS = [
  { id: "tcg", nombre: "Cartas TCG", texto: "Pokémon, Yu-Gi-Oh!, Mitos y Leyendas, One Piece y más", tema: "orange" },
  { id: "kits", nombre: "Model kits", texto: "Gundam, pinturas y herramientas", tema: "blue" },
  { id: "mesa", nombre: "Juegos de mesa", texto: "Familiares y de estrategia", tema: "yellow" },
  { id: "acc", nombre: "Accesorios", texto: "Fundas, deck box, carpetas y playmats", tema: "ink" },
];
const nombreCat = (id) => CATEGORIAS.find((c) => c.id === id).nombre;

// Banner principal. tema: orange | blue | yellow | ink · link: "#tienda?cat=tcg" filtra la tienda
const PROMOS = [
  { etiqueta: "Pokémon TCG", titulo: "Llegaron los sobres 30 Aniversario", texto: "Pídelos por WhatsApp y te los dejamos separados para retiro.", boton: "Ver cartas TCG", link: "#tienda?cat=tcg", tema: "orange", arte: ["TCG", "30"] },
  { etiqueta: "Pokéween · 30 de octubre", titulo: "Torneo especial de Halloween", texto: "Premios para el Top 4 y concurso de disfraces el sábado.", boton: "Inscribirme", link: "#eventos", tema: "ink", arte: ["🎃", "Top 4"] },
  { etiqueta: "Academia", titulo: "Aprende a jugar desde cero", texto: "Clases los sábados con mazo de práctica incluido. Ideal para niños y papás.", boton: "Ver la Academia", link: "#academia", tema: "yellow", arte: ["1·2·3", "¡A jugar!"] },
  { etiqueta: "Bandai Hobby", titulo: "Model kits Gundam HG y RG", texto: "Arma el tuyo y encuentra pinturas y herramientas en la tienda.", boton: "Ver model kits", link: "#tienda?cat=kits", tema: "blue", arte: ["HG", "RG"] },
];

// Eventos (fechas de ejemplo: actualízalas cada semana)
const EVENTOS = [
  { dia: "30", mes: "Oct", titulo: "Pokéween: torneo especial", texto: "Torneo de Pokémon TCG por la semana de Halloween, con premios para el Top 4.", tags: ["Pokémon", "Viernes 18:00"] },
  { dia: "31", mes: "Oct", titulo: "Concurso de disfraces", texto: "Ven disfrazado de tu personaje favorito y participa por premios.", tags: ["Todas las edades", "Sábado"] },
  { dia: "01", mes: "Nov", titulo: "Academia: clase para principiantes", texto: "Aprende a jugar desde cero con un mazo de práctica.", tags: ["Academia", "Sábado 12:00"] },
  { dia: "07", mes: "Nov", titulo: "Torneo TCG Junior y Senior", texto: "Torneo por categorías de edad para los más chicos.", tags: ["Junior · Senior", "Sábado 16:00"] },
];

/* ---------- Utilidades ---------- */
const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const waLink = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
const aMinutos = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };

// Hora actual en Chile, aunque el visitante esté en otra zona horaria
function horaChile() {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Santiago", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t) => partes.find((p) => p.type === t).value;
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { dia, min: Number(get("hour")) * 60 + Number(get("minute")) };
}

/* ---------- Enlaces de WhatsApp ---------- */
document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = waLink(a.dataset.wa);
});

/* ---------- Menú móvil ---------- */
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", () => {
  const abierto = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", abierto);
  menuBtn.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

/* ---------- Abierto / cerrado ---------- */
function estadoTienda() {
  const { dia, min } = horaChile();
  const hoy = HORARIO[dia];
  if (hoy && min >= aMinutos(hoy[0]) && min < aMinutos(hoy[1])) {
    return { abierto: true, texto: `Abierto ahora · cierra a las ${hoy[1]}` };
  }
  for (let i = 0; i < 7; i++) {
    const d = (dia + i) % 7;
    const h = HORARIO[d];
    if (!h || (i === 0 && min >= aMinutos(h[0]))) continue;
    const cuando = i === 0 ? "hoy" : i === 1 ? "mañana" : `el ${DIAS[d].toLowerCase()}`;
    return { abierto: false, texto: `Cerrado · abre ${cuando} a las ${h[0]}` };
  }
  return { abierto: false, texto: "Cerrado" };
}

const statusEl = document.getElementById("status");
function pintarEstado() {
  const e = estadoTienda();
  statusEl.textContent = e.texto;
  statusEl.classList.toggle("is-open", e.abierto);
}
pintarEstado();
setInterval(pintarEstado, 60000);

// Tabla de horario con el día de hoy destacado
const hoyDia = horaChile().dia;
document.getElementById("hours").innerHTML = [1, 2, 3, 4, 5, 6, 0]
  .map((d) => {
    const h = HORARIO[d];
    return `<li class="${d === hoyDia ? "is-today" : ""}"><span>${DIAS[d]}${d === hoyDia ? " · hoy" : ""}</span><span>${h ? `${h[0]} – ${h[1]}` : "Cerrado"}</span></li>`;
  })
  .join("");

/* ---------- Productos con filtro ---------- */
const productosEl = document.getElementById("products");
const filtrosEl = document.getElementById("filters");

function textoStock(stock) {
  if (stock <= 0) return { clase: "out", texto: "Agotado" };
  if (stock <= 3) return { clase: "low", texto: stock === 1 ? "Última unidad" : `Últimas ${stock} unidades` };
  return { clase: "ok", texto: "En stock" };
}

function pintarProductos(cat) {
  const lista = PRODUCTOS.filter((p) => cat === "all" || p.cat === cat);
  productosEl.innerHTML = lista
    .map((p) => {
      const st = textoStock(p.stock);
      const agotado = p.stock <= 0;
      return `
      <article class="card">
        <div class="card__img" data-color="${p.color}">${p.nombre}</div>
        <div class="card__body">
          <span class="card__cat">${nombreCat(p.cat)}</span>
          <h3 class="card__name">${p.nombre}</h3>
          <span class="card__stock ${st.clase}">${st.texto}</span>
          <a class="btn ${agotado ? "" : "btn--wa"}" href="${waLink(`Hola Anime Essential, ¿tienen disponible "${p.nombre}"? ¿Qué precio tiene?`)}"
             target="_blank" rel="noopener" ${agotado ? 'aria-disabled="true" tabindex="-1"' : ""}>
            ${agotado ? "Agotado" : "Consultar por WhatsApp"}
          </a>
        </div>
      </article>`;
    })
    .join("");

  // Color de fondo de cada "foto" (reemplazar por <img> con fotos reales)
  productosEl.querySelectorAll(".card__img").forEach((el) => {
    const c = el.dataset.color;
    el.style.background = c;
    el.style.color = ["#FFD23F", "#2EC4B6", "#FF8C42"].includes(c) ? "#111" : "#fff";
  });
}

filtrosEl.innerHTML = `<button class="chip" data-cat="all">Todo</button>` +
  CATEGORIAS.map((c) => `<button class="chip" data-cat="${c.id}">${c.nombre}</button>`).join("");

function filtrar(cat) {
  filtrosEl.querySelectorAll(".chip").forEach((b) => {
    const activo = b.dataset.cat === cat;
    b.classList.toggle("is-active", activo);
    b.setAttribute("aria-pressed", activo);
  });
  pintarProductos(cat);
}

filtrosEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (btn) filtrar(btn.dataset.cat);
});

// Cualquier link "#tienda?cat=xxx" (banner, categorías, footer) filtra y baja a la tienda
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#tienda?cat="]');
  if (!a) return;
  e.preventDefault();
  filtrar(a.getAttribute("href").split("=")[1]);
  document.getElementById("tienda").scrollIntoView({ behavior: "smooth" });
});

/* ---------- Categorías y footer ---------- */
document.getElementById("cats").innerHTML = CATEGORIAS.map((c) => {
  const n = PRODUCTOS.filter((p) => p.cat === c.id).length;
  return `
  <a class="cat cat--${c.tema}" href="#tienda?cat=${c.id}">
    <span class="cat__count">${n} producto${n === 1 ? "" : "s"}</span>
    <h3>${c.nombre}</h3>
    <p>${c.texto}</p>
    <span class="cat__go" aria-hidden="true">→</span>
  </a>`;
}).join("");
document.getElementById("footCats").innerHTML = CATEGORIAS.map((c) => `<li><a href="#tienda?cat=${c.id}">${c.nombre}</a></li>`).join("");
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Banner principal ---------- */
(function initPromo() {
  const track = document.getElementById("promoTrack");
  const dots = document.getElementById("promoDots");
  const promo = track.parentElement;
  track.innerHTML = PROMOS.map((p, i) => `
    <article class="slide slide--${p.tema}" role="group" aria-roledescription="diapositiva" aria-label="${i + 1} de ${PROMOS.length}">
      <div class="container slide__inner">
        <div class="slide__copy">
          <span class="slide__tag">${p.etiqueta}</span>
          <h2>${p.titulo}</h2>
          <p>${p.texto}</p>
          <a class="btn btn--light" href="${p.link}">${p.boton}</a>
        </div>
        <div class="slide__art" aria-hidden="true">
          <span class="sticker sticker--a">${p.arte[0]}</span>
          <span class="sticker sticker--b">${p.arte[1]}</span>
        </div>
      </div>
    </article>`).join("");
  dots.innerHTML = PROMOS.map((_, i) => `<button role="tab" aria-label="Promoción ${i + 1}"></button>`).join("");

  let actual = 0, timer = null;
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function ir(n) {
    actual = (n + PROMOS.length) % PROMOS.length;
    track.style.transform = `translateX(-${actual * 100}%)`;
    dots.querySelectorAll("button").forEach((b, i) => b.setAttribute("aria-selected", i === actual));
    track.querySelectorAll(".slide").forEach((s, i) => s.toggleAttribute("inert", i !== actual));
  }
  const parar = () => clearInterval(timer);
  const auto = () => { parar(); if (!reducido) timer = setInterval(() => ir(actual + 1), 5000); };

  document.getElementById("promoPrev").addEventListener("click", () => { ir(actual - 1); auto(); });
  document.getElementById("promoNext").addEventListener("click", () => { ir(actual + 1); auto(); });
  dots.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) { ir([...dots.children].indexOf(b)); auto(); }
  });
  promo.addEventListener("mouseenter", parar);
  promo.addEventListener("mouseleave", auto);
  let x0 = null;
  track.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; parar(); }, { passive: true });
  track.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) ir(actual + (dx < 0 ? 1 : -1));
    x0 = null; auto();
  });
  ir(0); auto();
})();

/* ---------- Eventos ---------- */
document.getElementById("events").innerHTML = EVENTOS.map(
  (ev) => `
  <article class="event">
    <div class="event__date"><b>${ev.dia}</b><small>${ev.mes}</small></div>
    <div>
      <h3>${ev.titulo}</h3>
      <p>${ev.texto}</p>
      <div class="event__meta">${ev.tags.map((t, i) => `<span class="tag ${i ? "tag--light" : ""}">${t}</span>`).join("")}</div>
      <a class="btn btn--primary" href="${waLink(`Hola Anime Essential, quiero inscribirme en: ${ev.titulo} (${ev.dia} ${ev.mes}).`)}" target="_blank" rel="noopener">Inscribirme</a>
    </div>
  </article>`
).join("");

/* ---------- Inicio ---------- */
filtrar("all");
