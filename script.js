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

  brandsData.forEach(brand => {
    const item = document.createElement("div");
    item.className = "brand-item";
    item.innerHTML = `<img src="${brand.image}" alt="${brand.id}">`;
    container.appendChild(item);
  });
}

// ---- XỬ LÝ KHI BẤM 1 BUTTON GIAI ĐOẠN ----
function handleStageClick(stage, btnEl) {
  // Khoá không cho bấm nhiều lần liên tiếp trong lúc chuyển
  if (btnEl.classList.contains("activating")) return;

  // 1) Animation scale up + fade out cho chính button vừa bấm
  btnEl.classList.add("activating");

  // 2) Đồng thời làm mờ dần toàn màn hình để chuyển mượt
  const overlay = document.getElementById("transition-overlay");
  overlay.classList.add("active");

  // 3) Sau khi animation xong thì điều hướng sang trang tương ứng
  const ANIMATION_DURATION = 550; // khớp với thời lượng keyframes trong CSS
  setTimeout(() => {
    window.location.href = stage.pageUrl; // PLACEHOLDER - trang đích lấy từ data.js
  }, ANIMATION_DURATION);
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