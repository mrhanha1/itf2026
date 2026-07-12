function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.src = src;
  });
}

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