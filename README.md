BUILT WITH: <br>
This app is fully built with Javascript using the MVC architecture and the publisher-subscriber pattern <br> <br>

DESCRIPTION OF THE APP: <br>
This app is intended to be a bank simulator for users that have already created their bank account. Indeed, given an array of pre-filled users, the app automatically creates a username based on the account owner name that in addition to the provided pin, allows to login (I will provide below some users credentials). <br>
At this point the user can access the private bank interface where is possible to transfer money between accounts, create a loan and close the account. <br>
To make it realistic, I've provided 4 user accounts as if they have already created a profile so it's possible to login with a username (thanks to the auto created username feature) and interact between accounts. The accounts are the following so you can try yourself: <br>
1)username: js, pin: 1111 <br>
2)username: jd, pin: 2222 <br>
3)username: stw, pin: 3333 <br>
4)username: ss, pin: 4444 <br>
Once you login with one of the following accounts, you can experiment transfering money between them and if you switch account you will see the changes shown on the movements list, total money amount, date of each movement and everything related to the type of action the user does on the account. <br> <br>

MORE ABOUT THE APP: <br>
This app is implemented with a lot of Javascript features, array methods, dates, timers, DOM manipulation and much more. I've used the MVC architecture to create a leaner and more readable code. In addition I've used the Pub/Sub pattern to call functions between View and Controller.
