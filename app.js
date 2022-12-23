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
const roundSlider = document.querySelector(".round");
const addons = document.querySelectorAll(".addon");
const addonInputs = document.querySelectorAll(".addon__input");
const addonSummaryContainer = document.getElementById(
  "summary-addon-container"
);
const planContainer = document.getElementsByClassName("plan__container")[0];
const totalBilling = document.getElementById("total-option-billling");
const totalPrice = document.getElementById("total-price");

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
let plans = [arcade, advanced, pro];
let changeBtn;
let planSelected;
let totalPlanPrice;

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
  const prices = document.querySelectorAll(".price");
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
  const options = document.querySelectorAll(".option-billing");
  console.log(options);
  if (yearOrMonth === "year") {
    totalBilling.innerHTML = " (per year)";
    options.forEach((option) => {
      option.textContent = "/yr";
    });
  } else {
    totalBilling.innerHTML = " (per month)";
    options.forEach((option) => {
      option.textContent = "/mo";
    });
  }
};

const setAddonArray = (event, object, input, arr) => {
  let str = event.target.id.replace("_", " ");
  if (str === object.name.toLowerCase() && input.checked === true) {
    arr.push(object);
    let newArr = [...new Set(arr)];
    arr = newArr;
  } else if (str === object.name.toLowerCase() && input.checked === false) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name.toLowerCase() === str) {
        arr.splice(i, 1);
      }
    }
  }
};

const displayAddonSummary = () => {
  addonSummaryContainer.innerHTML = summaryAddOn
    .map((addon) => {
      console.log(addon);
      if (yearOrMonth === "year") {
        return `<div class="summary__addon__picked">
        <P class="summary__addon__picked__name">${addon.name}</P>
        <p class="summary__addon__picked__price">+$<span class="price">${addon.price.year}</span><span class="option-billing">/yr</span></p>
</div>`;
      } else {
        return `<div class="summary__addon__picked">
        <P class="summary__addon__picked__name">${addon.name}</P>
        <p class="summary__addon__picked__price">+$<span class="price">${addon.price.month}</span><span class="option-billing">/mo</span></p>
</div>`;
      }
    })
    .join("");
};

const displayTotalPrice = () => {
  for (let i = 0; i < plans.length; i++) {
    if (plans[i].name.toLowerCase() === planSelected) {
      totalPlanPrice = plans[i].price;
    }
  }
  if (yearOrMonth === "month") {
    const totalPriceValue = summaryAddOn.reduce((a, cur) => {
      return a + cur.price.month;
    }, totalPlanPrice.month);
    totalPrice.textContent = totalPriceValue;
  } else {
    const totalPriceValue = summaryAddOn.reduce((a, cur) => {
      return a + cur.price.year;
    }, totalPlanPrice.year);
    totalPrice.textContent = totalPriceValue;
  }
};

window.addEventListener("load", () => {
  setStageNumber(allPages, stage);
  setIndicatorStage(roundIndicatorStep, stage);
  displayAddonSummary();
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
        let str = e.target.className.replace("card ", "");
        planSelected = str.toLowerCase();
        console.log({ planSelected });
        displayTotalPrice();
        plans.forEach((plan) => {
          if (str === plan.name.toLowerCase()) {
            if (yearOrMonth == "month") {
              planContainer.innerHTML = `<div class="summary__plan">
                                          <div class="summary__plan__name">
                                            <p class="psummary__plan__name__choice">${plan.name}<span>(Monthly)</span></p>
                                            <p class="summary__plan__name__change" id="change-btn">Change</p>
                                          </div>
                                        <p class="summary__plan__price">+$<span class="price">${plan.price.month}</span><span class="option-billing">/mo<span></p>
                                        </div> `;
            } else {
              `<div class="summary__plan">
            <div class="summary__plan__name">
              <p class="psummary__plan__name__choice">${plan.name}<span>(Yearly)</span></p>
              <p class="summary__plan__name__change" id="change-btn">Change</p>
            </div>
          <p class="summary__plan__price">+$<span class="price">${plan.price.year}</span><span class="option-billing">/yr<span></p>
          </div> `;
            }
          }
        });
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
    }
  });
});

addonInputs.forEach((input) => {
  input.addEventListener("click", (e) => {
    if (e.target.parentNode.children[0].checked === true) {
      e.target.parentNode.setAttribute("data-checked", true);
    } else {
      e.target.parentNode.removeAttribute("data-checked");
    }
    setAddonArray(e, onlineService, input, summaryAddOn);
    setAddonArray(e, largerStorage, input, summaryAddOn);
    setAddonArray(e, customizableProfile, input, summaryAddOn);
    displayAddonSummary();
    displayTotalPrice();
  });
});

planContainer.addEventListener("click", (e) => {
  console.log(e.target.id);
  if (e.target.id === "change-btn") {
    stage = 2;
    setStageNumber(allPages, stage);
    setIndicatorStage(roundIndicatorStep, stage);
  }
});

allBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    formValidation();
    planValidation();
    if (
      e.target.className === "next" &&
      stageValidation() === true &&
      stage < 4
    ) {
      stage++;
    } else if (e.target.className === "prev") {
      stage--;
    }
    setStageNumber(allPages, stage);
    setIndicatorStage(roundIndicatorStep, stage);
  });
});

confirmBtn.addEventListener("click", () => {
  let stage = 5;
  setStageNumber(allPages, stage);
});
