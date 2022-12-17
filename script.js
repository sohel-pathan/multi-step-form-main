// declare variables and store elements
const sidebarStep = document.querySelectorAll('.indecater__num');
const formStep = document.querySelectorAll('.step');
const form = document.getElementById('form');
const planCards = document.querySelectorAll('.plan__card');
const addsonCards = document.querySelectorAll('.addon__card');
const changePlanBtn = document.getElementById('change-plan');
// empty object to store selected plan, price and duration
let selectedPlan = {};
// function for storing selected add-on plan
const selectedAddsOn = () => {
  // create emplty array to store plan details
  let addOnArr = [];
  // loop add-on card to find selected add-on cards
  addsonCards.forEach((card) => {
    // select plan name, price and plan duration
    let price = card.querySelector('.sbscription__price').textContent;
    let name = card.querySelector('.card__name').textContent;
    let planDur = card.querySelector('.sbscription__duration').textContent;
    // push selected cards details to addOnArr array
    if (card.classList.contains('selected')) {
      addOnArr.push({
        price,
        name,
        planDur,
      });
    }
  });
  // return addOnArr array
  return addOnArr;
};

// plan prices
const monthlyPlanPrices = [9, 12, 15];
const yearlyPlanPrices = [90, 120, 150];
const monthlyAdsOnPrice = [1, 2, 2];
const yearlyAdsOnPrice = [10, 20, 20];

// function to change price and duration of the given card
const setplan = (card, price, duration) => {
  card.forEach((card, i) => {
    card.querySelector('.sbscription__price').textContent = `${price[i]}`;
    card.querySelector('.sbscription__duration').textContent = `${duration}`;
  });
};

// set default price and duration of the cards
setplan(planCards, monthlyPlanPrices, 'mo');
setplan(addsonCards, monthlyAdsOnPrice, 'mo');

// =====================
// BUTTONS
// =====================
const nextBtn = document.getElementById('next-button');
const prevBtn = document.getElementById('prev-button');

// step number
let stepNum = 0;

// declare function for show warning text when plan not selected and next button pressed
const selectPlanError = (text) => {
  document.getElementById('select-plan-error').textContent = text;
};

// handle next step button
nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (stepNum === 0) {
    // form validation
    if (!formValidation()) return;
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
  } else return;
});

// handle previus step button
prevBtn.addEventListener('click', (e) => {
  e.preventDefault();
  stepNum--;
  return showStep(stepNum);
});

// fuction for handle steps
const showStep = (x) => {
  // remove select plan warning
  selectPlanError('');

  // handle sidebar step
  if (x < sidebarStep.length) {
    // remove active class from all sidebar step
    for (let i = 0; i < sidebarStep.length; i++) {
      sidebarStep[i].classList.remove('active');
    }
    // adds the "active" class to the current sidebar step
    sidebarStep[x].classList.add('active');
  }

  // handle form step
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
    // adds the "active" class to the current step
    formStep[x].classList.add('active');
  }
};
// show step on first load
showStep(stepNum);

// STEP-1 | PERSONAL INFO [ FORM-VALIDATION ]

// function for add warning
const showError = (input, warningText) => {
  input.classList.add('error');
  input.parentElement.querySelector('.warning').textContent = warningText;
};

// function for remove warning
const hideError = (input) => {
  input.classList.remove('error');
  input.parentElement.querySelector('.warning').textContent = '';
};

// select all form inputs
const formInput = form.querySelectorAll('input');

// function for form validation
const formValidation = () => {
  // check all inputs are valid using forEach loop
  formInput.forEach((input) => {
    // username
    if (input.name === 'userName') {
      return input.value.length === 0
        ? showError(input, 'Enter your name')
        : hideError(input);
    }
    // email
    if (input.name === 'email') {
      // verify email input value using regex
      const emailRegExp = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
      return input.value.length === 0
        ? showError(input, 'Enter email')
        : !emailRegExp.test(input.value)
        ? showError(input, 'Enter valid email')
        : hideError(input);
    }
    // phone number
    if (input.name === 'phone') {
      return input.value.length === 0
        ? showError(input, 'Enter your mobile number')
        : hideError(input);
    }
  });
  // return form validity
  return form.checkValidity();
};

// STEP-2 | SELECT PLAN & TOGGLE BUTTON
const toggle = document.getElementById('toggle');
const yearlyBenefit = document.querySelectorAll('.yearly__benefit');
const month = document.getElementById('monthly');
const year = document.getElementById('yearly');

// toggle button for changing plan duration yearly or monthly
toggle.addEventListener('click', (e) => {
  selectPlanError('');
  // selelct toggle container
  const toggle = e.target.parentElement;
  // remove selected class from all plan card
  planCards.forEach((card) => card.classList.remove('selected'));
  // make selectedPlan object emply
  selectedPlan = {};

  // add active class to the toggle
  toggle.classList.toggle('active');

  // if toggle active [ yearly ] else [ monhtly ]
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

// Select plan card
planCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    selectPlanError('');
    let target = e.currentTarget;
    // remove selected class of all cards
    planCards.forEach((card) => card.classList.remove('selected'));
    // add selected class to the current card
    target.classList.add('selected');

    // store selected plan name, price and duration
    let planName = target.querySelector('.card__name').textContent;
    let planPrice = target.querySelector('.sbscription__price').textContent;
    let planDur = target.querySelector('.sbscription__duration').textContent;

    // add selected plan details to the selectedPlan object
    return (selectedPlan = { planName, planPrice, planDur });
  });
});

// STEP3 | ADD-ON
addsonCards.forEach((card) => {
  // addeventlistner to the add-on cards
  card.addEventListener('click', (e) => {
    let target = e.currentTarget;
    let checkbox = target.querySelector('.checkbox');
    // add selected class to the card
    target.classList.toggle('selected');

    // checked box checked if box is selected
    if (target.classList.contains('selected')) {
      return (checkbox.checked = true);
    } else {
      return (checkbox.checked = false);
    }
  });
});

// STEP-4 | FINISHING UP

// RENDER SELECTED PLAN, SELECTED ADD-ON AND TOTAL AMOUNT
const renderTotal = () => {
  // totalAmount to store total amount
  let totalAmount = 0;
  // plan duration in full-form [mo to montly or yr to yearly]
  const planDuration = selectedPlan.planDur === 'mo' ? 'Monthly' : 'Yearly';
  // selecte element to append selected plan. add-on and total price
  const plan = document.getElementById('selected-plan');
  const addsOnList = document.getElementById('selected-addon');
  const total = document.getElementById('total');

  // clear innerHTML of the selected elements
  total.innerHTML = '';
  addsOnList.innerHTML = '';
  plan.innerHTML = '';

  // add selected plan
  let planName = document.createElement('p');
  planName.textContent = selectedPlan.planName;

  let dur = document.createElement('p');
  dur.textContent = `(${planDuration})`;

  let planPrice = document.createElement('p');
  planPrice.textContent = `$${selectedPlan.planPrice}/${selectedPlan.planDur}`;
  // append selected plan to the plan
  plan.appendChild(planName);
  plan.appendChild(dur);
  plan.appendChild(planPrice);

  // add selectedplan price in total amount
  totalAmount += parseInt(selectedPlan.planPrice);

  // add selected add-on in addsOnList
  selectedAddsOn().forEach((item) => {
    // create listItem to store selected add-on details
    let listItem = document.createElement('li');
    // addOnName to store add-on title
    let addOnName = document.createElement('p');
    addOnName.textContent = item.name;
    // addOnprice for add-on price and plan duration
    let addOnprice = document.createElement('p');
    addOnprice.textContent = `+$${item.price}/${item.planDur}`;

    // append  addOnName and addOnprice to the listItem
    listItem.appendChild(addOnName);
    listItem.appendChild(addOnprice);
    // add list item to then addOnlist
    addsOnList.appendChild(listItem);

    // add price to the total price
    totalAmount += parseInt(item.price);
  });

  // inner html for total
  total.innerHTML = `<span>Total(
    per ${planDuration.slice(0, -2).toLocaleLowerCase()}) </span> 
      <span> $${totalAmount}/${selectedPlan.planDur}</span>`;
};

// function to handle change button
changePlanBtn.addEventListener('click', () => {
  // reassign stepNum to 0
  stepNum = 0;
  // show stepNum
  showStep(stepNum);
});
