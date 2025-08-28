document.addEventListener("DOMContentLoaded", function () {
  const mv = document.querySelector(".mv");
  const pops = document.querySelectorAll(".pop");

  // Extract background image URL from .mv
  const bgImage = window.getComputedStyle(mv).backgroundImage;
  const bgUrlMatch = bgImage.match(/url\(["']?(.+?)["']?\)/);

  if (bgUrlMatch) {
    const bgUrl = bgUrlMatch[1];

    // Preload the background image
    const bgImg = new Image();
    bgImg.src = bgUrl;

    bgImg.onload = () => {
      // Once bg image is loaded, start processing .pop images
      pops.forEach((el, index) => {
        const img = el.querySelector("img");

        if (!img) return; // Skip if no <img> inside

        const reveal = () => {
          setTimeout(() => {
            el.classList.add("show");
          }, index * 500);
        };

        if (img.complete) {
          reveal(); // Already loaded (from cache)
        } else {
          img.addEventListener("load", reveal);
        }
      });
    };
  } else {
    console.warn("No background image found on .mv");
  }
});
