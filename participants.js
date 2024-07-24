function participants() {
  const participantsList = document.querySelector(".participants__cards");
  const initialParticipantsCards = Array.from(participantsList.children);
  const participantsCards = [...initialParticipantsCards];
  const participantsCardsFigure = document.querySelector(".cards-figure");

  const activeParticipantsCardsFigure = document.createElement("span");
  activeParticipantsCardsFigure.setAttribute("id", "active-figure");
  participantsCardsFigure.prepend(activeParticipantsCardsFigure);

  const previousButton = document.querySelector(
    "#participants-previous-button"
  );
  const nextButton = document.querySelector("#participants-next-button");

  let currentIndex = 0;
  let currentNumber = 4;
  let cardWidth = 320;

  function getParticipantsCards(number) {
    activeParticipantsCardsFigure.innerText = String(number);
    participantsList.innerHTML = "";

    for (i = -1; i < number + 1; i++) {
      if (currentIndex + i < participantsCards.length) {
        participantsList.innerHTML += (
          participantsCards[currentIndex + i] ||
          participantsCards[participantsCards.length - 1]
        ).outerHTML;
      } else {
        participantsList.innerHTML +=
          participantsCards[
            currentIndex + i - participantsCards.length
          ].outerHTML;
      }
    }
  }

  const next = {
    sign: -1,
    func: () => {
      if (currentIndex === participantsCards.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
    },
  };

  const previous = {
    sign: 1,
    func: () => {
      if (currentIndex === 0) {
        currentIndex = participantsCards.length - 1;
      } else {
        currentIndex--;
      }
    },
  };

  function turnCards(direction) {
    nextButton.setAttribute("disabled", true);
    previousButton.setAttribute("disabled", true);
    clearInterval(turnCardsInterval);
    turnCardsInterval = null;
    const transform =
      (participantsList.clientWidth -
        participantsList.firstChild.clientWidth * (currentNumber + 2)) /
        (currentNumber + 1) +
      participantsList.firstChild.clientWidth;
    participantsList.style.transition = "transform 2s ease";
    participantsList.style.transform = `translateX(${
      direction.sign * transform
    }px)`;
    direction.func();
    setTimeout(() => {
      getParticipantsCards(currentNumber);
      participantsList.style.transition = "none";
      participantsList.style.transform = `translateX(0)`;
      previousButton.removeAttribute("disabled");
      nextButton.removeAttribute("disabled");
      turnCardsInterval = setInterval(() => turnCards(next), 4000);
    }, 2000);
  }

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };
  let turnCardsInterval;
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      entry.isIntersecting
        ? (turnCardsInterval = setInterval(() => turnCards(next), 4000))
        : clearInterval(turnCardsInterval);
    });
  }, options);

  observer.observe(participantsList);

  previousButton.onclick = () => turnCards(previous);

  nextButton.onclick = () => turnCards(next);

  const breakpointForFour = window.matchMedia("(min-width: 1576px)");
  const breakpointForThree = window.matchMedia("(min-width: 1182px)");
  const breakpointForTwo = window.matchMedia("(min-width: 670px)");

  const breakpointChecker = () => {
    if (breakpointForFour.matches) {
      currentNumber = 4;
    } else if (breakpointForThree.matches) {
      currentNumber = 3;
    } else if (breakpointForTwo.matches) {
      currentNumber = 2;
    } else {
      currentNumber = 1;
    }
    getParticipantsCards(currentNumber);
  };

  breakpointForFour.addEventListener("change", breakpointChecker);
  breakpointForThree.addEventListener("change", breakpointChecker);
  breakpointForTwo.addEventListener("change", breakpointChecker);

  breakpointChecker();
}

participants();
