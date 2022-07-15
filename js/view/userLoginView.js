const username = document.querySelector('.login__input--user');
const pin = document.querySelector('.login__input--pin');
const loginBtn = document.querySelector('.login__btn');
const welcome = document.querySelector('.welcome');
const loggedInterface = document.querySelector('.app');

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
    // loggedInterface.style.opacity = 1; --> set in style this one at 0
  }
}
export default new userLoginView();
