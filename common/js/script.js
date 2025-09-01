document.addEventListener("DOMContentLoaded", function () {
  const mv = document.querySelector(".mv");
  const pops = document.querySelectorAll(".pop");

  const bgImage = window.getComputedStyle(mv).backgroundImage;
  const bgUrlMatch = bgImage.match(/url\(["']?(.+?)["']?\)/);

  if(bgUrlMatch) {
    const bgUrl = bgUrlMatch[1];
    const bgImg = new Image();
    bgImg.src = bgUrl;

    bgImg.onload = () => {
      // Adjust delay for mobile vs desktop
      const isMobile = window.innerWidth < 768; // adjust breakpoint if needed
      const delayStep = isMobile ? 400 : 500;

      pops.forEach((el, index) => {
        const img = el.querySelector("img");
        if(!img) return;

        const reveal = () => {
          setTimeout(() => {
            el.classList.add("show");
          }, index * delayStep);
        };

        if(img.complete) {
          reveal();
        } else {
          img.addEventListener("load", reveal);
        }
      });
    };
  } else {
    console.warn("No background image found on .mv");
  }
});
