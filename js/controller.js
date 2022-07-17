'use strict';

import * as model from './model.js';
import userLoginView from './view/userLoginView.js';

const controlUsername = function () {
  model.createUsername();
};
controlUsername();

/////////////////////////////////////////////////////////////////////// login user

const controlUserLogin = function (userLoginData) {
  const pin = userLoginData.pin;
  const username = userLoginData.username;
  const loginData = model.login(username, pin);

  console.log(loginData);

  if (loginData) {
    console.log('we are in');
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
  model.transferMoney(receiver, amount);

  userLoginView.showMovements(model.currentUser);

  userLoginView.calculateTotalAmount(model.currentUser);
};
userLoginView.moneyTransferHandler(controlTransferMoney);

/////////////////////////////////////////////////////////////////////// loan request

const controlLoanRequest = function (loanAmount) {
  const currentUser = model.sendLoan(loanAmount);

  setTimeout(() => {
    userLoginView.showMovements(model.currentUser);

    userLoginView.calculateTotalAmount(model.currentUser);
  }, 1500);
};
userLoginView.loanRequestHandler(controlLoanRequest);

/////////////////////////////////////////////////////////////////////// close account
const controlCloseAccount = function (user, pin) {
  model.closeAccount(user, pin);
};
userLoginView.closeAccountHandler(controlCloseAccount);
