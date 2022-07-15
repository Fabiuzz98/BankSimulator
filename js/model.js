const welcome = document.querySelector('.welcome');

// Data
const account1 = {
  owner: 'Jacob Soe',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
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
  interestRate: 1.5,
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
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

export const accounts = [account1, account2, account3, account4];

export let currentUser;

//1)Creating usernames for each account
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

//2)Creation of login, current user and Show account movements
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

//3)Transfer money feature
const amountSentField = document.querySelector('.form__input--amount');
const toField = document.querySelector('.form__input--to');

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

  console.log(currentUser);

  amountSentField.value = '';
  toField.value = '';
};
