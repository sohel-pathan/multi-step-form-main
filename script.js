// select sidebar step
const sidebarStep = document.getElementsByClassName('indecater__num');
// select form step
const formStep = document.getElementsByClassName('step');
const changePlanBtn = document.getElementById('change-plan');

// object to store selected plan and price
let selectedPlan = {};
// function for store selected add-on and price in a array
const selectedAddsOn = () => {
  let addOnArr = [];
  addsonCards.forEach((card) => {
    let price = card.querySelector('.sbscription__price').textContent;
    let name = card.querySelector('.card__name').textContent;
    let planDur = card.querySelector('.sbscription__duration').textContent;
    // checkbox checked of selected cards
    if (card.classList.contains('selected')) {
      addOnArr.push({
        price,
        name,
        planDur,
      });
    }
  });
  return addOnArr;
};
// FORM VALIDATTION
const form = document.getElementById('form');
const formInput = form.querySelectorAll('input');

// function for add error
const showError = (input, warningText) => {
  input.classList.add('error');
  input.parentElement.querySelector('.warning').textContent = warningText;
};

// function for remove error
const hideError = (input) => {
  input.classList.remove('error');
  input.parentElement.querySelector('.warning').textContent = '';
};

// show if plan not selected
const selectPlanError = (text) => {
  document.getElementById('select-plan-error').textContent = text;
};

// form validation
const formValidation = () => {
  // check all inputs using forEach loop
  formInput.forEach((input) => {
    // username
    if (input.name === 'userName') {
      return input.value.length === 0
        ? showError(input, 'Enter your name')
        : hideError(input);
    }
    // email
    if (input.name === 'email') {
      const emailRegExp = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
      return input.value.length === 0
        ? showError(input, 'Enter email')
        : !emailRegExp.test(input.value)
        ? showError(input, 'Enter valid email')
        : hideError(input);
    }
    // phone number
    if (input.name === 'phone') {
      // const phoneRegExp = new RegExp(/^\+?[0-9]+$/);
      return input.value.length === 0
        ? showError(input, 'Enter your mobile number')
        : hideError(input);
    }
  });
  // return form validity
  return form.checkValidity();
};

// =====================
// BUTTONS
// =====================
const nextBtn = document.getElementById('next-button');
const prevBtn = document.getElementById('prev-button');

// NEXT STEP BUTTON
let stepNum = 0;
nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (stepNum === 0) {
    // form validation
    // if (!formValidation()) return;
    stepNum++;
    showStep(stepNum);
  } else if (stepNum === 1) {
    // show warning if plan not selected
    if (Object.entries(selectedPlan).length === 0) {
      return selectPlanError('Please select a plan');
    }
    stepNum++;
    showStep(stepNum);
  } else if (stepNum === 2) {
    // render list of selected plan and add-on with price
    renderTotal();
    stepNum++;
    showStep(stepNum);
  } else if (stepNum === 3) {
    stepNum++;
    showStep(stepNum);
  }
});

// PREVIUOS STEP BUTTON
prevBtn.addEventListener('click', (e) => {
  e.preventDefault();
  stepNum--;
  return showStep(stepNum);
});

// =====================
//  SHOW CURRENT STEP
// =====================
// fuction for showing current steps of form and sidebar
const showStep = (x) => {
  // remove plan select warning
  selectPlanError('');
  // sidebar step
  if (x < sidebarStep.length) {
    for (let i = 0; i < sidebarStep.length; i++) {
      sidebarStep[i].classList.remove('active');
    }
    // and adds the "active" class to the current sidebar step
    sidebarStep[x].classList.add('active');
  }
  // form step
  if (x < formStep.length) {
    if (x === 0) {
      // hide previuos button on the first step
      prevBtn.classList.add('hidden');
      prevBtn.setAttribute('disabled', '');
    } else if (x === 4) {
      // hide buttons
      nextBtn.parentElement.classList.add('hidden');
    } else {
      // show buttons
      prevBtn.classList.remove('hidden');
      prevBtn.removeAttribute('disabled');
    }
    // change next step button inner text to 'confirm' on the step3
    x === 3
      ? (nextBtn.textContent = 'Confirm')
      : (nextBtn.textContent = 'Next step');

    // removes the "active" class of all steps...
    for (let i = 0; i < formStep.length; i++) {
      formStep[i].classList.remove('active');
    }
    // and adds the "active" class to the current form step
    formStep[x].classList.add('active');
  }
};
// show first step by default
showStep(stepNum);

// STEP2
const toggle = document.getElementById('toggle');
const planCards = document.querySelectorAll('.plan__card');
const yearlyBenefit = document.querySelectorAll('.yearly__benefit');
const month = document.getElementById('monthly');
const year = document.getElementById('yearly');

// toggle button

toggle.addEventListener('click', (e) => {
  const toggle = e.target.parentElement;
  selectPlanError('');
  // toggle.parentElement.parentElement.querySelectorAll('.plan__card');
  toggle.classList.toggle('active');
  planCards.forEach((card) => card.classList.remove('selected'));
  selectedPlan = {};
  // add condition to change plan monhtly or yearly and update data
  if (toggle.classList.contains('active')) {
    yearlyBenefit.forEach((item) => item.classList.add('show'));
    setplan(planCards, yearlyPlanPrices, 'yr');
    setplan(addsonCards, yearlyAdsOnPrice, 'yr');
    year.classList.add('selected__plan');
    month.classList.remove('selected__plan');
  } else {
    setplan(planCards, monthlyPlanPrices, 'mo');
    setplan(addsonCards, monthlyAdsOnPrice, 'mo');
    yearlyBenefit.forEach((item) => item.classList.remove('show'));
    month.classList.add('selected__plan');
    year.classList.remove('selected__plan');
  }
});

// select plan
planCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    selectPlanError('');
    let target = e.currentTarget;
    let planName = target.querySelector('.card__name').textContent;
    let planPrice = target.querySelector('.sbscription__price').textContent;
    let planDur = target.querySelector('.sbscription__duration').textContent;
    selectedPlan = { planName, planPrice, planDur };
    // remove selected class of all cards
    planCards.forEach((card) => card.classList.remove('selected'));
    // add selected class to the selected card
    return target.classList.add('selected');
  });
});

// STEP3 | ADDS-ON
const addsonCards = document.querySelectorAll('.addon__card');
addsonCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    let target = e.currentTarget;
    // slect card
    target.classList.toggle('selected');

    // checkbox checked of selected cards
    if (target.classList.contains('selected')) {
      return (target.querySelector('.checkbox').checked = true);
    } else {
      // console.log(selectedAddsOn);
      return (target.querySelector('.checkbox').checked = false);
    }
  });
});

// set plan price
const monthlyPlanPrices = [9, 12, 15];
const yearlyPlanPrices = [90, 120, 150];
const monthlyAdsOnPrice = [1, 2, 2];
const yearlyAdsOnPrice = [10, 20, 20];

const setplan = (card, plan, xx) => {
  card.forEach((card, i) => {
    card.querySelector('.sbscription__price').textContent = `${plan[i]}`;
    card.querySelector('.sbscription__duration').textContent = `${xx}`;
  });
};
setplan(planCards, monthlyPlanPrices, 'mo');
setplan(addsonCards, monthlyAdsOnPrice, 'mo');

// render last step

const renderTotal = () => {
  let totalPrice = 0;
  let planDuration = selectedPlan.planDur === 'mo' ? 'Monthly' : 'Yearly';
  const plan = document.getElementById('selected-plan');
  const addsOnList = document.getElementById('selected-addon');
  const total = document.getElementById('total');
  total.innerHTML = '';
  addsOnList.innerHTML = '';
  plan.innerHTML = '';
  // add selected plan
  let planName = document.createElement('p');
  planName.textContent = selectedPlan.planName;

  let my = document.createElement('p');
  my.textContent = `(${planDuration})`;

  let planPrice = document.createElement('p');
  planPrice.textContent = `$${selectedPlan.planPrice}/${selectedPlan.planDur}`;
  plan.appendChild(planName);
  plan.appendChild(my);
  plan.appendChild(planPrice);

  // add plan price in total
  totalPrice += parseInt(selectedPlan.planPrice);

  // set selected add-on and their prices
  selectedAddsOn().forEach((item) => {
    let listItem = document.createElement('li');
    let addOnName = document.createElement('p');
    addOnName.textContent = item.name;
    let addOnprice = document.createElement('p');
    addOnprice.textContent = `+$${item.price}/${item.planDur}`;

    listItem.appendChild(addOnName);
    listItem.appendChild(addOnprice);
    addsOnList.appendChild(listItem);

    // add selected add on price
    totalPrice += parseInt(item.price);
  });

  console.log(selectedAddsOn);

  // set total amount
  total.innerHTML = `<span>Total(
    per ${planDuration.slice(0, -2).toLocaleLowerCase()}) </span> 
      <span> $${totalPrice}/${selectedPlan.planDur}</span>`;
};

// change plan button
changePlanBtn.addEventListener('click', () => {
  stepNum = 0;
  showStep(stepNum);
});
