function initViewer(stage) {
  const frame = document.getElementById("viewer-frame");
  const subPages = stage.subPages;

  let current = 0;
  let isTransitioning = false;

  const imgBase = document.getElementById("viewer-image");

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
    frame.querySelectorAll(".hit-area").forEach(el => el.remove());

    subPages.forEach((_, i) => {
      const btn = document.createElement("button");
      btn.className = `hit-area hit-step hit-step-${i + 1}`;
      btn.addEventListener("click", () => goTo(i));
      frame.appendChild(btn);
    });

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