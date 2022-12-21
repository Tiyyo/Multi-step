const allBtn = document.querySelectorAll("button");
const allPages = document.querySelectorAll(".page");
const confirmBtn = document.getElementById("confirm-btn");
const roundIndicatorStep = document.querySelectorAll(".step__number");
const infosForm = document.getElementById("personal-infos-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email_adress");
const phoneInput = document.getElementById("phone_number");
const labels = document.getElementsByTagName("label");
const cards = document.querySelectorAll(".card");
const steps = document.querySelectorAll(".step");
let formIsValid = false;
let planIsSelect = false;
let stage = 1;

console.log(steps);

const setStageNumber = (arr, number) => {
  arr.forEach((el) => {
    el.setAttribute("data-step", number);
  });
};

const setIndicatorStage = (arr, number) => {
  arr.forEach((indicator) => {
    if (indicator.innerText == number) {
      indicator.setAttribute("data-active", true);
    } else {
      indicator.removeAttribute("data-active");
    }
  });
};

const stageValidation = () => {
  if (stage >= 1 && formIsValid === false) {
    return false;
  } else if (stage >= 2 && planIsSelect === false) {
    return false;
  } else {
    return true;
  }
};

const nameValidation = () => {
  if (infosForm.name.value) {
    nameInput.removeAttribute("data-active");
    labels[0].removeAttribute("data-active");
    return true;
  } else {
    nameInput.setAttribute("data-active", true);
    labels[0].setAttribute("data-active", true);
    return false;
  }
};

const emailValidaiton = () => {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );

  if (emailInput.value.match(emailRegex)) {
    emailInput.removeAttribute("data-active");
    labels[1].removeAttribute("data-active");
    return true;
  } else {
    emailInput.setAttribute("data-active", true);
    labels[1].setAttribute("data-active", true);
    return false;
  }
};
const phoneValidation = () => {
  const phoneRegex = /^\d+$/;

  if (phoneInput.value.match(phoneRegex)) {
    phoneInput.removeAttribute("data-active");
    labels[2].removeAttribute("data-active");
    return true;
  } else {
    phoneInput.setAttribute("data-active", true);
    labels[2].setAttribute("data-active", true);
    return false;
  }
};

const formValidation = () => {
  if (
    ((nameValidation() === emailValidaiton()) === phoneValidation()) ===
    true
  ) {
    return (formIsValid = true);
  } else {
    return (formIsValid = false);
  }
};

const planValidation = () => {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].dataset.active) {
      return (planIsSelect = true);
    }
  }
};

window.addEventListener("load", () => {
  setStageNumber(allPages, stage);
  setIndicatorStage(roundIndicatorStep, stage);
});

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    cards.forEach((card) => {
      if (card == e.target) {
        card.setAttribute("data-active", true);
      } else {
        card.removeAttribute("data-active");
      }
    });
  });
});

roundIndicatorStep.forEach((indicator) => {
  indicator.addEventListener("click", (e) => {
    stage = parseInt(e.target.textContent);
    if (stageValidation() === true) {
      setStageNumber(allPages, stage);
      setIndicatorStage(roundIndicatorStep, stage);
      console.log(stage);
    }
  });
});

allBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    formValidation();
    planValidation();
    console.log(planValidation());
    console.log(stage);
    if (
      e.target.className === "next" &&
      stageValidation() === true &&
      stage < 4
    ) {
      stage++;
    } else if (e.target.className === "prev") {
      stage--;
    }
    console.log(stage);
    setStageNumber(allPages, stage);
    setIndicatorStage(roundIndicatorStep, stage);
  });
});

confirmBtn.addEventListener("click", () => {
  let stage = 5;
  setStageNumber(allPages, stage);
});
