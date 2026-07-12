/* ============================================================
   TRANSITION.JS — dùng chung cho crossfade ảnh
   Dùng cho: main-bg -> subpage đầu tiên, giữa các subpage,
   subpage cuối/đầu -> main-bg. Không cần sửa file này.
   ============================================================ */

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.src = src;
  });
}

/* Crossfade thật giữa ảnh hiện tại (imgBase) và ảnh mới (imgOverlay).
   imgOverlay phải có class "viewer-image-overlay" (đã có transition
   opacity trong CSS) và nằm ngay sau imgBase trong DOM. */
function crossfadeTo(imgBase, imgOverlay, src) {
  return preloadImage(src).then(() => {
    imgOverlay.src = src;
    void imgOverlay.offsetWidth; // ép reflow để transition chạy từ opacity 0
    imgOverlay.classList.add("is-active");

    return new Promise(resolve => {
      const onEnd = (e) => {
        if (e.propertyName !== "opacity") return;
        imgOverlay.removeEventListener("transitionend", onEnd);
        imgBase.src = src;
        imgOverlay.classList.remove("is-active");
        imgOverlay.removeAttribute("src");
        resolve();
      };
      imgOverlay.addEventListener("transitionend", onEnd);
    });
  });
}