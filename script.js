/* ============================================================
   SCRIPT.JS — ENGINE HIỂN THỊ
   Không cần sửa file này khi thêm/sửa nội dung.
   Mọi thay đổi nội dung → sửa trong data.js
   ============================================================ */

// ---- RENDER 5 BUTTON GIAI ĐOẠN ----
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

// ---- RENDER 3 NHÃN HÀNG ----
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

// Màu riêng cho từng đường glow (theo thứ tự brandsData)
const brandGlowColors = ["#33ff5c", "#0077ff", "#ff78be"]; // PLACEHOLDER - đổi màu tại đây

// ---- TẠO SVG GLOW CHẠY VIỀN CHO 1 BRAND ITEM ----
// Dùng rect + stroke-dasharray/dashoffset thay cho conic-gradient
// để đường sáng có đầu đậm - đuôi fade, chạy đều theo chu vi thực,
// không bị dồn cục ở các góc bo tròn.
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

// ---- XỬ LÝ KHI BẤM 1 BUTTON GIAI ĐOẠN ----
function handleStageClick(stage, btnEl) {
  // Khoá không cho bấm nhiều lần liên tiếp trong lúc chuyển
  if (btnEl.classList.contains("activating")) return;

  // 1) Animation scale up + fade out cho chính button vừa bấm
  btnEl.classList.add("activating");

  // 2) Preload ảnh subpage đầu tiên, xong mới push-trượt viewer-frame
  //    vào và đẩy app-frame ra (không location.href, không dip đen)
  const firstSrc = stage.subPages[0];
  const appFrame = document.querySelector(".app-frame");
  const viewerFrame = document.getElementById("viewer-frame");
  const viewerBase = document.getElementById("viewer-image");

  const ANIMATION_DURATION = 550; // khớp với thời lượng keyframes trong CSS
  const animationDone = new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION));

  // Chờ cả ảnh preload xong VÀ animation của button chạy đủ thời lượng,
  // rồi mới bắt đầu push (đảm bảo animation không bị cắt ngang)
  Promise.all([preloadImage(firstSrc), animationDone]).then(() => {
    viewerBase.src = firstSrc;
    viewerFrame.dataset.stage = stage.id;
    btnEl.classList.remove("activating");

    // push: viewer-frame trượt từ phải vào (0), app-frame trượt sang trái
    viewerFrame.classList.remove("push-right");
    appFrame.classList.add("push-left");

    initViewer(stage);
  });
}

// ---- GÁN ẢNH NỀN (preload xong mới fade overlay ra, tránh chớp trắng) ----
function renderBackground() {
  const bgEl = document.getElementById("main-bg");
  const overlay = document.getElementById("transition-overlay");

  const im = new Image();
  im.onload = () => {
    bgEl.src = mainBackground;
    // ép reflow rồi fade lớp phủ biến mất, lộ ảnh nền ra
    requestAnimationFrame(() => {
      overlay.classList.remove("active");
    });
  };
  im.src = mainBackground;
}

// ---- KHỞI ĐỘNG ----
renderBackground();
renderStages();
renderBrands();