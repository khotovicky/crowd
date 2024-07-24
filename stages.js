function stages() {
  const MAX_MOBILE_BLOCK_LENGTH = 271;

  const stagesContent = document.querySelector(".stages__content");
  const stagesContentDesktop = stagesContent.innerHTML;
  const stageItems = document.querySelectorAll(".stages__item");
  const stageItemsMobileBlocks = [];
  const plane = document.querySelector(".plane");

  const nextButton = document.querySelector("#stages-next-button");
  const previousButton = document.querySelector("#stages-previous-button");

  const stagesGroupsSignsContainer = document.querySelector(
    ".stages-groups-signs"
  );

  let lookForBack = false;

  stageItems.forEach((item, key) => {
    if (lookForBack) {
      if (
        item.textContent.length + stageItems[key - 1].textContent.length <=
        MAX_MOBILE_BLOCK_LENGTH
      ) {
        lookForBack = false;
        stageItemsMobileBlocks.push(
          '<div class="stages__item">' +
            stageItems[key - 1].innerHTML +
            '</div><div class="stages__item">' +
            item.innerHTML +
            "</div>"
        );
        return;
      } else {
        stageItemsMobileBlocks.push(
          '<div class="stages__item">' +
            stageItems[key - 1].innerHTML +
            "</div>"
        );
      }
    }
    if (
      item.textContent.length <= MAX_MOBILE_BLOCK_LENGTH &&
      stageItems[key + 1]
    ) {
      lookForBack = true;
    } else {
      stageItemsMobileBlocks.push(
        '<div class="stages__item">' + item.innerHTML + "</div>"
      );
    }
  });
  let stagesContentMobile = "";

  stageItemsMobileBlocks.forEach((item, i) => {
    stagesContentMobile += `<div class="stages__items-group">${item}</div>`;
    const sign = document.createElement("div");
    sign.classList.add("stages-group-sign");
    stagesGroupsSignsContainer.appendChild(sign);
  });

  let currentIndex = 0;

  function showSlide(direction, animation, duration) {
    currentIndex = currentIndex + direction;
    if (currentIndex === 1) {
      previousButton.removeAttribute("disabled");
    }
    if (currentIndex === stageItemsMobileBlocks.length - 1) {
      nextButton.setAttribute("disabled", true);
    }
    if (currentIndex === stageItemsMobileBlocks.length - 2) {
      nextButton.removeAttribute("disabled");
    }
    if (currentIndex === 0) {
      previousButton.setAttribute("disabled", true);
    }
    stagesContent.style.transform = `translateX(calc( ${currentIndex} * (var(--wrapper-margin) - 100vw)))`;
    plane.style.animation = animation;
    setTimeout(() => (plane.style.animation = "none"), duration);

    const stagesGroupsSigns = Array.from(stagesGroupsSignsContainer.children);
    stagesGroupsSigns.forEach((sign, i) => {
      if (i === currentIndex) {
        sign.classList.add("active");
      } else {
        sign.classList.remove("active");
      }
    });
  }

  nextButton.addEventListener("click", () =>
    showSlide(1, "fly-next 1s ease-in-out forwards", 1000)
  );
  previousButton.addEventListener("click", () =>
    showSlide(-1, "fly-previous 600ms ease-in-out forwards", 600)
  );

  showSlide(0, "none", 0);

  const breakpoint = window.matchMedia("(max-width: 950px)");
  const breakpointChecker = () => {
    if (breakpoint.matches) {
      stagesContent.innerHTML = stagesContentMobile;
    } else {
      stagesContent.innerHTML = stagesContentDesktop;
    }
  };

  breakpoint.addEventListener("change", breakpointChecker);
  breakpointChecker();
}

stages();
