function renderStages() {
  const container = document.getElementById("stage-menu");
  container.innerHTML = "";

  stagesData.forEach((stage, index) => {
    const btn = document.createElement("button");
    btn.className = `stage-btn stage-btn-${index + 1}`;
    btn.dataset.id = stage.id;

    btn.innerHTML = `<img src="${stage.image}" alt="${stage.title}">`;

    btn.addEventListener("click", () => handleStageClick(stage, btn));
    container.appendChild(btn);
  });
}

function renderBrands() {
  const container = document.getElementById("brand-row");
  container.innerHTML = "";

  brandsData.forEach((brand, index) => {
    const item = document.createElement("div");
    item.className = "brand-item";
    item.innerHTML = `<img src="${brand.image}" alt="${brand.id}">`;
    item.appendChild(createBrandGlowSVG(index));
    container.appendChild(item);
  });
}

const brandGlowColors = ["#33ff5c", "#0077ff", "#ff78be"]; // PLACEHOLDER - đổi màu tại đây

function createBrandGlowSVG(index) {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "brand-glow-svg");
  svg.setAttribute("preserveAspectRatio", "none");

  const color = brandGlowColors[index % brandGlowColors.length];
  const defs = document.createElementNS(svgNS, "defs");
  const gradId = `brand-glow-gradient-${index}`;
  const grad = document.createElementNS(svgNS, "linearGradient");
  grad.setAttribute("id", gradId);
  grad.innerHTML = `
    <stop offset="0%" stop-color="${color}" stop-opacity="0" />
    <stop offset="85%" stop-color="${color}" stop-opacity="0.9" />
    <stop offset="100%" stop-color="${color}" stop-opacity="1" />
  `;
  defs.appendChild(grad);
  svg.appendChild(defs);

  const rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("x", "1");
  rect.setAttribute("y", "1");
  rect.setAttribute("width", "calc(100% - 3px)");
  rect.setAttribute("height", "calc(100% - 3px)");
  rect.setAttribute("rx", "15px");
  rect.setAttribute("ry", "15px");
  rect.setAttribute("pathLength", "100");
  rect.setAttribute("stroke-dasharray", "18 82"); // đoạn sáng ngắn ~18% chu vi, còn lại trong suốt
  rect.style.stroke = `url(#${gradId})`;
  svg.appendChild(rect);

  return svg;
}

function handleStageClick(stage, btnEl) {
  
  if (btnEl.classList.contains("activating")) return;

  btnEl.classList.add("activating");

  const firstSrc = stage.subPages[0];
  const appFrame = document.querySelector(".app-frame");
  const viewerFrame = document.getElementById("viewer-frame");
  const viewerBase = document.getElementById("viewer-image");

  const ANIMATION_DURATION = 550; // khớp với thời lượng keyframes trong CSS
  const animationDone = new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION));

  Promise.all([preloadImage(firstSrc), animationDone]).then(() => {
    viewerBase.src = firstSrc;
    viewerFrame.dataset.stage = stage.id;
    btnEl.classList.remove("activating");

    viewerFrame.classList.remove("push-right");
    appFrame.classList.add("push-left");

    initViewer(stage);
  });
}

function renderBackground() {
  const bgEl = document.getElementById("main-bg");
  const overlay = document.getElementById("transition-overlay");

  const im = new Image();
  im.onload = () => {
    bgEl.src = mainBackground;
    requestAnimationFrame(() => {
      overlay.classList.remove("active");
    });
  };
  im.src = mainBackground;
}

renderBackground();
renderStages();
renderBrands();