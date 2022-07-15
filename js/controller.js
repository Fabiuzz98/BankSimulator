'use strict';

import * as model from './model.js';
import userLoginView from './view/userLoginView.js';

const controlUsername = function () {
  model.createUsername();
};

controlUsername();

const controlUserLogin = function (userLoginData) {
  const pin = userLoginData.pin;
  const username = userLoginData.username;
  const loginData = model.login(username, pin);
  //Show message of welcome in case of success
  if (loginData) {
    userLoginView.showInterface(loginData);
  }
};

userLoginView.takeUserLogindata(controlUserLogin);
