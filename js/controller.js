'use strict';

import * as model from './model.js';
import userloginView from './view/userLoginView.js';
import userLoginView from './view/userLoginView.js';

const controlUsername = function () {
  model.createUsername();
};
controlUsername();

let timer; //setInterval value to use when clearing it

/////////////////////////////////////////////////////////////////////// login user

const controlUserLogin = function (userLoginData) {
  const pin = userLoginData.pin;
  const username = userLoginData.username;
  const loginData = model.login(username, pin);

  if (loginData) {
    clearInterval(timer);
    timer = model.startLogoutCounter();

    userLoginView.showInterface(loginData);

    userLoginView.changeLogindate(model.currentUser);

    userLoginView.showMovements(model.currentUser);

    userLoginView.calculateTotalAmount(model.currentUser);

    // calculate 'in' and 'out'
  }
};
userLoginView.takeUserLogindata(controlUserLogin);

/////////////////////////////////////////////////////////////////////// transfer money

const controlTransferMoney = function (receiver, amount) {
  clearInterval(timer);
  timer = model.startLogoutCounter();

  model.transferMoney(receiver, amount);

  userLoginView.showMovements(model.currentUser);

  userLoginView.calculateTotalAmount(model.currentUser);
};
userLoginView.moneyTransferHandler(controlTransferMoney);

/////////////////////////////////////////////////////////////////////// loan request

const controlLoanRequest = function (loanAmount) {
  model.sendLoan(loanAmount);

  clearInterval(timer);
  timer = model.startLogoutCounter();

  setTimeout(() => {
    userLoginView.showMovements(model.currentUser);

    userLoginView.calculateTotalAmount(model.currentUser);
  }, 1500);
};
userLoginView.loanRequestHandler(controlLoanRequest);

/////////////////////////////////////////////////////////////////////// close account
const controlCloseAccount = function (user, pin) {
  model.closeAccount(user, pin);

  clearInterval(timer);
};
userLoginView.closeAccountHandler(controlCloseAccount);

/////////////////////////////////////////////////////////////////////// sort button
const controlSortButton = function () {
  const sortedAccount = userLoginView.sortMovements(model.currentUser);

  userLoginView.showMovements(sortedAccount);

  clearInterval(timer);
  timer = model.startLogoutCounter();
};
userLoginView.sortButtonHandler(controlSortButton);
