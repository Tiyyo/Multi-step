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
const gifts = document.querySelectorAll(".card__gift");
const switchCheckbox = document.getElementById("switch");
const prices = document.querySelectorAll(".price");
const options = document.querySelectorAll(".option-billing");
const roundSlider = document.querySelector(".round");

const onlineService = {
  name: "Online service",
  price: {
    month: 1,
    year: 10,
  },
};

const largerStorage = {
  name: "Larger storage",
  price: {
    month: 2,
    year: 20,
  },
};

const customizableProfile = {
  name: "Customizable profile",
  price: {
    month: 2,
    year: 20,
  },
};

const arcade = {
  name: "Arcade",
  price: {
    month: 9,
    year: 90,
  },
};

const advanced = {
  name: "Advanced",
  price: {
    month: 12,
    year: 120,
  },
};

const pro = {
  name: "Pro",
  price: {
    month: 15,
    year: 150,
  },
};

let formIsValid = false;
let planIsSelect = false;
let stage = 1;
let yearOrMonth = "month";
let summaryAddOn = [];

console.log(roundSlider);

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

const displayGiftedMonth = (arr) => {
  if (yearOrMonth === "year") {
    arr.forEach((gift) => {
      gift.setAttribute("data-active", true);
    });
  } else {
    arr.forEach((gift) => {
      gift.removeAttribute("data-active");
    });
  }
};

const displayPriceValue = () => {
  if (yearOrMonth === "year") {
    prices.forEach((price) => {
      let newPrice = parseInt(price.textContent);
      price.textContent = newPrice * 10;
    });
  } else {
    prices.forEach((price) => {
      let newPrice = parseInt(price.textContent);
      price.textContent = newPrice / 10;
    });
  }
};

const displayMonthorYear = () => {
  if (yearOrMonth === "year") {
    options.forEach((option) => {
      option.textContent = "/yr";
    });
  } else {
    options.forEach((option) => {
      option.textContent = "/mo";
    });
  }
};

window.addEventListener("load", () => {
  setStageNumber(allPages, stage);
  setIndicatorStage(roundIndicatorStep, stage);
});

roundSlider.addEventListener("click", () => {
  setTimeout(() => {
    if (switchCheckbox.checked === true) {
      yearOrMonth = "year";
    } else {
      yearOrMonth = "month";
    }
    displayGiftedMonth(gifts);
    displayPriceValue();
    displayMonthorYear();
    console.log(yearOrMonth);
  }, 100);
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
