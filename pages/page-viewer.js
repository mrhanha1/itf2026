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

(function () {
  const frame = document.querySelector(".viewer-frame");
  const stageId = frame.dataset.stage;
  const stage = stagesData.find(s => s.id === stageId);
  const subPages = stage.subPages;

  let current = 0;
  let isTransitioning = false;

  const imgBase = document.getElementById("viewer-image");

  /* ---- Lớp overlay dùng cho crossfade giữa các subpage ---- */
  const imgOverlay = document.createElement("img");
  imgOverlay.id = "viewer-image-overlay";
  imgOverlay.className = "viewer-image viewer-image-overlay";
  imgBase.insertAdjacentElement("afterend", imgOverlay);

  /* ---- Lớp phủ dùng khi vào trang / thoát trang (không phải trắng) ---- */
  const pageOverlay = document.createElement("div");
  pageOverlay.className = "page-fade-overlay active";
  frame.appendChild(pageOverlay);

  function preloadImage(src) {
    return new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(src);
      im.onerror = reject;
      im.src = src;
    });
  }

  /* Crossfade thật giữa ảnh hiện tại (lớp dưới) và ảnh mới (lớp trên) */
  function crossfadeTo(src) {
    return preloadImage(src).then(() => {
      imgOverlay.src = src;
      // ép reflow để transition chạy đúng từ opacity 0
      void imgOverlay.offsetWidth;
      imgOverlay.classList.add("is-active");

      return new Promise(resolve => {
        const onEnd = (e) => {
          if (e.propertyName !== "opacity") return;
          imgOverlay.removeEventListener("transitionend", onEnd);
          // ảnh mới trở thành lớp dưới, dọn lớp trên
          imgBase.src = src;
          imgOverlay.classList.remove("is-active");
          imgOverlay.removeAttribute("src");
          resolve();
        };
        imgOverlay.addEventListener("transitionend", onEnd);
      });
    });
  }

  function goTo(index) {
    if (index === current || isTransitioning) return;
    isTransitioning = true;
    const target = "../" + subPages[index];
    crossfadeTo(target).then(() => {
      current = index;
      isTransitioning = false;
    });
  }

  /* Fade lớp phủ (màu nền app) che kín màn hình rồi mới điều hướng ra
     ngoài trang này -> khi trang index.html bắt đầu load, người dùng
     đang nhìn thấy màu nền đồng nhất chứ không phải màn trắng chớp. */
  function leaveToIndex() {
    if (isTransitioning) return;
    isTransitioning = true;
    pageOverlay.classList.add("active");
    const onEnd = (e) => {
      if (e.propertyName !== "opacity") return;
      pageOverlay.removeEventListener("transitionend", onEnd);
      window.location.href = "../index.html";
    };
    pageOverlay.addEventListener("transitionend", onEnd);
  }

  function renderHitAreas() {
    // xoá vùng bấm cũ, vẽ lại vì trang cuối cần đổi "next" thành home
    document.querySelectorAll(".hit-area").forEach(el => el.remove());

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

  /* ---- Khởi động: đặt ảnh đầu tiên, chờ load xong rồi fade lớp phủ ra ---- */
  const firstSrc = "../" + subPages[current];
  preloadImage(firstSrc).then(() => {
    imgBase.src = firstSrc;
    // ép reflow rồi fade lớp phủ (che bằng màu nền) biến mất, lộ ảnh ra
    requestAnimationFrame(() => {
      pageOverlay.classList.remove("active");
      const onEnd = (e) => {
        if (e.propertyName !== "opacity") return;
        pageOverlay.removeEventListener("transitionend", onEnd);
        isTransitioning = false;
      };
      pageOverlay.addEventListener("transitionend", onEnd);
    });
  });

  renderHitAreas();
})();