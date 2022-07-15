'use strict';

import * as model from './model.js';
import userLoginView from './view/userLoginView.js';

const controlUsername = function () {
  model.createUsername();
};
controlUsername();

///////////////////////////////////////////////////////////////////////

const controlUserLogin = function (userLoginData) {
  const pin = userLoginData.pin;
  const username = userLoginData.username;
  const loginData = model.login(username, pin);

  if (loginData) {
    userLoginView.showInterface(loginData);

    userLoginView.showMovements(model.currentUser);

    userLoginView.calculateTotalAmount(model.currentUser.movements);
  }
};
userLoginView.takeUserLogindata(controlUserLogin);

///////////////////////////////////////////////////////////////////////

const controlTransferMoney = function (receiver, amount) {
  model.transferMoney(receiver, amount);

  userLoginView.showMovements(model.currentUser);

  userLoginView.calculateTotalAmount(model.currentUser.movements);
};
userLoginView.moneyTransferHandler(controlTransferMoney);
