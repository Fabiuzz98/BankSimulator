BUILT WITH:
This app is fully built with Javascript using the MVC architecture and the publisher-subscriber pattern

DESCRIPTION OF THE APP:
This app is intended to be a bank simulator for user that have already created their bank account, indeed, given an array of pre filled users, the app automatically creates a username based on the account owner name that in addition to the provided pin, allow to login (I will provide below the some users credentials).
At this point the user can access to the private bank interface where is possible to transfer money between accounts, create a loan and close the account.
To make it realistic, I've provided 4 user accounts to which it's possible to login and transfer money between accounts. The accounts are the following so you can try yourself:
1)username: js, pin: 1111
2)username: jd, pin: 2222
3)username: stw, pin: 3333
4)username: ss, pin: 4444
Once you login with one of the following accounts, you can experiment transfering money between them and if you switch account you will see the changes shown on the movements list, total money amount, date of each movement and everything related to the type of action the user does on the account.

MORE ABOUT THE APP:
This app is implemented with a lot of Javascript features, array methods, dates, timers, dom manipulation and much more. I've used the MVC architecture to create a leaner and more readable code. In addition I've used the Pub/Sub pattern to call functions between View and Controller.
