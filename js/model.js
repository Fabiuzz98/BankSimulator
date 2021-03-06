const welcome = document.querySelector('.welcome');

// Data
const account1 = {
  owner: 'Jacob Soe',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2021-11-17T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2021-11-20T23:36:17.929Z',
    '2021-11-21T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Dravis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'it-IT',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

export const accounts = [account1, account2, account3, account4];

export let currentUser;

//Creating usernames for each account
export const createUsername = function () {
  accounts.map(function (acc) {
    return (acc.username = acc.owner
      .split(' ')
      .map(function (name) {
        return name[0].toLowerCase();
      })
      .join(''));
  });
};

//Creation of login, current user and Show account movements
export const login = function (username, pin) {
  currentUser = accounts.find(acc => acc.username === username);

  if (currentUser.pin === +pin) {
    return currentUser.owner;
  } else {
    welcome.textContent = 'Invalid password :(';
    welcome.style.color = 'red';
    return;
  }
};

//Transfer money feature
export const transferMoney = function (receiver, amount) {
  const moneyReceiver = accounts.find(function (acc) {
    return acc.username === receiver;
  });

  const currentUserTotalMoney = currentUser.movements.reduce(function (
    beginningValue,
    mov
  ) {
    return (beginningValue = mov + beginningValue);
  },
  0);

  if (
    !moneyReceiver ||
    amount <= 0 ||
    moneyReceiver.username === currentUser.username ||
    amount >= currentUserTotalMoney
  )
    return;

  moneyReceiver.movements.push(+amount);
  moneyReceiver.movementsDates.push(new Date());
  currentUser.movements.push(-amount);
  currentUser.movementsDates.push(new Date());
};

//Request loan feature
export const sendLoan = function (loanAmount) {
  //If there is at least one movement higher than 10% of the requested loan
  const isAccepted = currentUser.movements.some(mov => mov > +loanAmount * 0.1);

  if (!isAccepted) return;

  currentUser.movements.push(+loanAmount);
  currentUser.movementsDates.push(new Date());
};

//Close account
export const closeAccount = function (user, pin) {
  if (user.trim() === currentUser.username && +pin === currentUser.pin) {
    const index = accounts.findIndex(acc => acc.username === user);

    accounts.splice(index, 1); //Delete account
  }
};

//Logout timer
const loggedInterface = document.querySelector('.app');
const timerSlot = document.querySelector('.timer');
export const startLogoutCounter = function () {
  const counter = '05:01';

  let minutes = +counter.split(':')[0];
  let seconds = +counter.split(':')[1];

  const timer = function () {
    seconds--;

    if (seconds === 0) {
      seconds = 59;
      minutes--;
    }
    if (minutes === -1) {
      clearInterval(timerInterval);
      timerSlot.textContent = '00:00';
      loggedInterface.style.opacity = 0;
    } else {
      timerSlot.textContent = `${String(minutes).padStart(2, 0)}:${String(
        seconds
      ).padStart(2, 0)}`;
    }
  };

  const timerInterval = setInterval(timer, 1000);

  return timerInterval;
};
