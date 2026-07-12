function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.src = src;
  });
}

function pushTo(imgBase, imgOverlay, src, direction) {
  return preloadImage(src).then(() => {
    const offFrom = direction === "next" ? "100%" : "-100%";
    const offTo = direction === "next" ? "-100%" : "100%";

    imgOverlay.style.transition = "none";
    imgBase.style.transition = "none";
    imgOverlay.src = src;
    imgOverlay.style.transform = `translateX(${offFrom})`;
    imgBase.style.transform = "translateX(0)";
    void imgOverlay.offsetWidth; // ép reflow

    imgOverlay.style.transition = "";
    imgBase.style.transition = "";

    requestAnimationFrame(() => {
      imgOverlay.style.transform = "translateX(0)";
      imgBase.style.transform = `translateX(${offTo})`;
    });

    return new Promise(resolve => {
      const onEnd = (e) => {
        if (e.propertyName !== "transform") return;
        imgOverlay.removeEventListener("transitionend", onEnd);

        imgBase.style.transition = "none";
        imgBase.src = src;
        imgBase.style.transform = "translateX(0)";
        void imgBase.offsetWidth;
        imgBase.style.transition = "";

        imgOverlay.style.transition = "none";
        imgOverlay.style.transform = `translateX(${offFrom})`;
        imgOverlay.removeAttribute("src");
        void imgOverlay.offsetWidth;
        imgOverlay.style.transition = "";

        resolve();
      };
      imgOverlay.addEventListener("transitionend", onEnd);
    });
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