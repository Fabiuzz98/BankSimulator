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

    username.value = '';
    pin.value = '';
    // loggedInterface.style.opacity = 1; --> set in style this one at 0
  }

  showMovements(currentUser) {
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
         <div class="movements__value">${movement}€</div>
        </div>`;

      movements.insertAdjacentHTML('afterbegin', html);
    });
  }

  calculateTotalAmount(currentUserMovements) {
    console.log(currentUserMovements);

    const amount = currentUserMovements.reduce(function (beginningValue, mov) {
      return (beginningValue = mov + beginningValue);
    }, 0);

    totalAmount.textContent = `${amount}€`;
  }

  //Take money transfer values
  moneyTransferHandler(handler) {
    transferBtn.addEventListener('click', function (e) {
      e.preventDefault();

      handler(to.value, amount.value);
    });
  }
}
export default new userLoginView();
