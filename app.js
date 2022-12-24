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

class UI {
  static setStageNumber = (arr, number) => {
    arr.forEach((el) => {
      el.setAttribute("data-step", number);
    });
  };
  static setIndicatorStage = (arr, number) => {
    arr.forEach((indicator) => {
      if (indicator.innerText == number) {
        indicator.setAttribute("data-active", true);
      } else {
        indicator.removeAttribute("data-active");
      }
    });
  };
  static displayGiftedMonth = (arr) => {
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
  static displayAddonBg = (e) => {
    if (e.target.parentNode.children[0].checked === true) {
      e.target.parentNode.setAttribute("data-checked", true);
    } else {
      e.target.parentNode.removeAttribute("data-checked");
    }
  };
  static displayPriceValue = () => {
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
  static displayMonthorYear = () => {
    const options = document.querySelectorAll(".option-billing");
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
  static displayAddonSummary = () => {
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
  static displayTotalPrice = () => {
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
  static displayActivePlan = (e) => {
    cards.forEach((card) => {
      if (card != e.target) {
        card.removeAttribute("data-active");
      } else {
        card.setAttribute("data-active", true);
        planSelected = e.target.className.replace("card ", "").toLowerCase();
        UI.displayTotalPrice();
        Utils.card(e);
      }
    });
  };
}

class Validation {
  static stage = () => {
    if (stage >= 1 && formIsValid === false) {
      return false;
    } else if (stage >= 2 && planIsSelect === false) {
      return false;
    } else {
      return true;
    }
  };
  static enable = (el, number, condition) => {
    if (condition) {
      el.removeAttribute("data-active");
      labels[number].removeAttribute("data-active");
      return true;
    } else {
      el.setAttribute("data-active", true);
      labels[number].setAttribute("data-active", true);
      return false;
    }
  };
  static form = () => {
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );
    const phoneRegex = /^\d+$/;
    let condition = infosForm.name.value;
    let conditionTwo = emailInput.value.match(emailRegex);
    let conditionThree = phoneInput.value.match(phoneRegex);
    if (
      Validation.enable(nameInput, 0, condition) === true &&
      Validation.enable(emailInput, 1, conditionTwo) === true &&
      Validation.enable(phoneInput, 2, conditionThree) === true
    ) {
      return (formIsValid = true);
    } else {
      return (formIsValid = false);
    }
  };
  static plan = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].dataset.active) {
        return (planIsSelect = true);
      }
    }
  };
}

class Utils {
  static addonArray = (event, object, input, arr) => {
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
  static card = (e) => {
    let str = e.target.className.replace("card ", "");
    plans.forEach((plan) => {
      if (str !== plan.name.toLowerCase()) {
        return;
      }
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
    });
  };
}

window.addEventListener("load", () => {
  UI.setStageNumber(allPages, stage);
  UI.setIndicatorStage(roundIndicatorStep, stage);
  UI.displayAddonSummary();
});

roundSlider.addEventListener("click", () => {
  setTimeout(() => {
    if (switchCheckbox.checked === true) {
      yearOrMonth = "year";
    } else {
      yearOrMonth = "month";
    }
    UI.displayGiftedMonth(gifts);
    UI.displayPriceValue();
    UI.displayMonthorYear();
  }, 100);
});

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    UI.displayActivePlan(e);
  });
});

roundIndicatorStep.forEach((indicator) => {
  indicator.addEventListener("click", (e) => {
    stage = parseInt(e.target.textContent);
    if (Validation.stage() === true) {
      UI.setStageNumber(allPages, stage);
      UI.setIndicatorStage(roundIndicatorStep, stage);
    }
  });
});

addonInputs.forEach((input) => {
  input.addEventListener("click", (e) => {
    UI.displayAddonBg(e);
    Utils.addonArray(e, onlineService, input, summaryAddOn);
    Utils.addonArray(e, largerStorage, input, summaryAddOn);
    Utils.addonArray(e, customizableProfile, input, summaryAddOn);
    UI.displayAddonSummary();
    UI.displayTotalPrice();
  });
});

planContainer.addEventListener("click", (e) => {
  if (e.target.id === "change-btn") {
    stage = 2;
    UI.setStageNumber(allPages, stage);
    UI.setIndicatorStage(roundIndicatorStep, stage);
  }
});

allBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    Validation.form();
    Validation.plan(cards);
    if (
      e.target.className === "next" &&
      Validation.stage() === true &&
      stage < 4
    ) {
      stage++;
    } else if (e.target.className === "prev") {
      stage--;
    }
    UI.setStageNumber(allPages, stage);
    UI.setIndicatorStage(roundIndicatorStep, stage);
  });
});

confirmBtn.addEventListener("click", () => {
  let stage = 5;
  UI.setStageNumber(allPages, stage);
});
