/* ============================================================
   PAGE-VIEWER.JS — dùng chung cho mọi trang trong pages/
   Đọc subPages từ data.js theo data-stage khai báo trong HTML.
   Không cần sửa file này khi thêm nội dung.

   CROSSFADE THẬT (2 lớp ảnh, preload trước khi chạy hiệu ứng):
   - #viewer-image       : lớp DƯỚI, luôn hiển thị ảnh hiện tại (opacity 1)
   - #viewer-image-overlay (tạo động): lớp TRÊN, chỉ gán src sau khi ảnh
     đã tải xong (load event), rồi mới fade opacity 0 -> 1.
   - Sau khi fade xong: gán ảnh mới vào lớp dưới, dọn lớp trên,
     sẵn sàng cho lần chuyển tiếp theo.
   => Không có khung hình trống ở giữa (không dip đen/trắng).

   Vào trang / thoát trang (về index.html) cũng dùng crossfade:
   - Khi trang con vừa load: có 1 lớp phủ màu nền (#1a1a1a, KHÔNG
     phải màu trắng) che ảnh, chờ ảnh đầu tiên load xong rồi mới
     fade lớp phủ ra -> không bị chớp trắng.
   - Khi bấm mũi tên trái ở subpage đầu / phải ở subpage cuối để
     về index.html: fade lớp phủ (màu nền, không phải trắng) vào
     che kín rồi mới điều hướng -> không có khung hình trắng lộ ra
     giữa lúc chuyển trang.
   ============================================================ */

/* initViewer(stage): khởi động/khởi động lại viewer cho 1 stage.
   Gọi từ script.js (handleStageClick) khi bấm vào 1 stage.
   Ảnh đầu tiên đã được gán sẵn vào #viewer-image trước khi hàm này
   chạy (xem script.js), nên ở đây không cần preload/fade gì thêm
   lúc khởi động - không có lớp phủ đen/trắng nào cả. */
function initViewer(stage) {
  const frame = document.getElementById("viewer-frame");
  const subPages = stage.subPages;

  let current = 0;
  let isTransitioning = false;

  const imgBase = document.getElementById("viewer-image");

  /* ---- Lớp overlay dùng cho crossfade giữa các subpage ---- */
  let imgOverlay = document.getElementById("viewer-image-overlay");
  if (!imgOverlay) {
    imgOverlay = document.createElement("img");
    imgOverlay.id = "viewer-image-overlay";
    imgOverlay.className = "viewer-image viewer-image-overlay";
    imgBase.insertAdjacentElement("afterend", imgOverlay);
  }

  function goTo(index) {
    if (index === current || isTransitioning) return;
    isTransitioning = true;
    crossfadeTo(imgBase, imgOverlay, subPages[index]).then(() => {
      current = index;
      isTransitioning = false;
    });
  }

  /* Quay lại menu chính: push app-frame về vị trí 0 (từ trái vào),
     đẩy viewer-frame ra bên phải. Không location.href, không crossfade
     ảnh -> không dip to black. */
  function leaveToIndex() {
    if (isTransitioning) return;
    isTransitioning = true;
    const appFrame = document.querySelector(".app-frame");

    appFrame.classList.remove("push-left");
    frame.classList.add("push-right");

    setTimeout(() => {
      isTransitioning = false;
    }, 500); // khớp thời lượng transition transform trong CSS
  }

  function renderHitAreas() {
    // xoá vùng bấm cũ, vẽ lại vì trang cuối cần đổi "next" thành home
    frame.querySelectorAll(".hit-area").forEach(el => el.remove());

    // 3 vùng bấm số bước (nhảy thẳng tới trang tương ứng)
    subPages.forEach((_, i) => {
      const btn = document.createElement("button");
      btn.className = `hit-area hit-step hit-step-${i + 1}`;
      btn.addEventListener("click", () => goTo(i));
      frame.appendChild(btn);
    });

    // Mũi tên trái: lùi 1 trang, hoặc về menu chính nếu đang ở trang đầu
    const prevBtn = document.createElement("button");
    prevBtn.className = "hit-area hit-nav hit-prev";
    prevBtn.addEventListener("click", () => {
      if (current === 0) {
        leaveToIndex();
      } else {
        goTo(current - 1);
      }
    });
    frame.appendChild(prevBtn);

    // Mũi tên phải: tiến 1 trang, hoặc về menu chính (home) nếu đang ở trang cuối
    const nextBtn = document.createElement("button");
    nextBtn.className = "hit-area hit-nav hit-next";
    nextBtn.addEventListener("click", () => {
      if (current === subPages.length - 1) {
        leaveToIndex();
      } else {
        goTo(current + 1);
      }
    });
    frame.appendChild(nextBtn);
  }

  current = 0;
  renderHitAreas();
}