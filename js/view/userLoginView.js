const username = document.querySelector('.login__input--user');
const pin = document.querySelector('.login__input--pin');
const loginBtn = document.querySelector('.login__btn');
const welcome = document.querySelector('.welcome');
const loggedInterface = document.querySelector('.app');
const transferBtn = document.querySelector('.form__btn--transfer');
const movements = document.querySelector('.movements');
const to = document.querySelector('.form__input--to');
const amount = document.querySelector('.form__input--amount');
const totalAmount = document.querySelector('.balance__value');
const loginDate = document.querySelector('.date');
const loanBtn = document.querySelector('.form__btn--loan');
const loanAmount = document.querySelector('.form__input--loan-amount');
const confirmUser = document.querySelector('.form__input--user');
const confirmPin = document.querySelector('.form__input--pin');
const closeAccountBtn = document.querySelector('.form__btn--close');
const incomes = document.querySelector('.summary__value--in');
const outcomes = document.querySelector('.summary__value--out');

class userLoginView {
  takeUserLogindata(handler) {
    loginBtn.addEventListener('click', function (e) {
      e.preventDefault();

      if (username.value.trim().length === 0 || pin.value.trim().length === 0) {
        welcome.textContent = 'Insert valid data first';
        welcome.style.color = 'red';
      } else {
        handler({ username: username.value, pin: pin.value });
      }
    });
  }

  showInterface(userFullName) {
    welcome.textContent = `Welcome back ${userFullName}`;
    welcome.style.color = '#444444';
    loginDate.textContent = new Date();

    username.value = '';
    pin.value = '';
    // loggedInterface.style.opacity = 1; --> set in style this one at 0
  }

  changeLogindate(currentUser) {
    console.log(currentUser);
    const date = new Date().toLocaleDateString(currentUser.locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    loginDate.textContent = date;
  }

  showMovements(currentUser) {
    console.log(currentUser);
    movements.innerHTML = '';

    currentUser.movements.forEach((movement, i) => {
      const date = currentUser.movementsDates.map(function (date) {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString(currentUser.locale, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });
      });

      const html = `
        <div class="movements__row">
         <div class="movements__type movements__type--${
           movement > 0 ? 'deposit' : 'withdrawal'
         }">${i + 1} ${movement > 0 ? 'deposit' : 'withdrawal'}
         </div>
         <div class="movements__date"> ${
           date[i] ===
           new Date().toLocaleDateString(currentUser.locale, {
             year: 'numeric',
             month: 'numeric',
             day: 'numeric',
           })
             ? 'Today'
             : date[i]
         }</div>
         <div class="movements__value">${new Intl.NumberFormat(
           currentUser.locale,
           {
             style: 'currency',
             currency: currentUser.currency,
           }
         ).format(movement)}</div>
        </div>`;

      movements.insertAdjacentHTML('afterbegin', html);
    });
  }

  calculateTotalAmount(currentUser) {
    console.log(currentUser.movements);

    const amount = currentUser.movements.reduce(function (beginningValue, mov) {
      return (beginningValue = mov + beginningValue);
    }, 0);

    totalAmount.textContent = `${amount}€`;

    const totalIncome = currentUser.movements
      .filter(mov => mov > 0)
      .reduce(function (beginningValue, currentMov) {
        return (beginningValue = currentMov + beginningValue);
      }, 0);

    console.log(totalIncome);

    const totalIncomeFormatted = new Intl.NumberFormat(currentUser.locale, {
      style: 'currency',
      currency: currentUser.currency,
    }).format(totalIncome);

    console.log(totalIncomeFormatted);

    incomes.textContent = totalIncomeFormatted;

    const totalOutcome = currentUser.movements
      .filter(mov => mov < 0)
      .reduce(function (beginningValue, currentMov) {
        return (beginningValue = currentMov + beginningValue);
      }, 0);

    const totalOutcomeFormatted = new Intl.NumberFormat(currentUser.locale, {
      style: 'currency',
      currency: currentUser.currency,
    }).format(totalOutcome);

    outcomes.textContent = totalOutcomeFormatted;
  }

  //Take money transfer values
  moneyTransferHandler(handler) {
    transferBtn.addEventListener('click', function (e) {
      e.preventDefault();

      handler(to.value, amount.value);

      to.value = '';
      amount.value = '';
    });
  }

  //Click on loan btn
  loanRequestHandler(handler) {
    loanBtn.addEventListener('click', function (e) {
      e.preventDefault();

      handler(loanAmount.value);

      loanAmount.value = '';
    });
  }

  closeAccountHandler(handler) {
    closeAccountBtn.addEventListener('click', function (e) {
      e.preventDefault();

      handler(confirmUser.value, confirmPin.value);

      confirmUser.value = '';
      confirmPin.value = '';

      // loggedInterface.style.opacity = 0;
      welcome.textContent = 'Log in to get started';
    });
  }
}
export default new userLoginView();
