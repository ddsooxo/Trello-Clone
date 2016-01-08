# Trello-Clone(MEAN Stack App)

## Description
This is a project I completed for LearnTech Labs bootcamp. The assignment was to create a clone
of a popular app called [Trello](https://trello.com/) which is used by many
developers and technical project managers for project planning.
It’s not just a simple todo, its a todo app with a lot of different components with it.
Each user can create an account and create mutiple new boards with lists and items.

## Technologies Used
MEAN(MongoDB, ExpressJS, AngularJS, and NodeJS) Stack - In simple words, AngualrJS is my front-end and 
ExpressJS/MongoDB is my backend, and NodeJS is in the middle to send information back and forth using API calls.

 
## Overview Of The Setup
Main things to install are Node and NPM. You also need to downland mongoDB and mongoose. To run the app, you will need angular, mongodb, and node server running.

### Installation:

Click [here](https://nodejs.org/en/) to install NodeJS.

After installing, in your command line(git) go to  your root directory file by doing cd(change directory) or pwd(print working directory) to check which directory you're currently in.  
Once your're in your root directory, go ahead and type in the following commands: 
* `node -v` Allows you to check the version of the node you've downloaded.
* `npm`  Node comes with npm installed as well. 
* ` npm install mongoose`  [Mongoose](http://mongoosejs.com/docs/index.html) provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.


## Quickstart:
I would recommend opening up different tabs on your terminal and labeling them according to what you're running (i.e. git, node, mongo, ng, db)

* Choose a directory you want to clone this repo in by `cd 'path name' `
* Make a folder in that cd: `mkdir 'folder name' ` and cd into that folder you've just created
* Clone my repo using: `git clone git@github.com:ddsooxo/Trello-Clone.git`
* To retrieve all the node modules on your computer, type: `npm install `
* On different tabs, run the app using: `mongod`,`gulp serve`, `node app`
* To check your database entries, use command: ` mongo ` and choose the database. In this app, it's called mytodoapp. Refer to the [MongoDB](https://docs.mongodb.org/manual/tutorial/use-database-commands/) documentation on how to use the the database commands.

A quick side node: If you have already cloned my repo and created an account in the app, I would open up the mongo console and find mytodoapp database and drop that database. Otherwise, it will cause some issues creating an account again with those same entries.

## Screenshots: 
![Alt text](https://github.com/ddsooxo/Trello-Clone/blob/png/png/login.png)
![Alt text](https://github.com/ddsooxo/Trello-Clone/blob/png/png/newBoard.png)




## Tests
To run the server/backend tests, cd into expressApp and use command:
* `jasmine`

To run the angular/frontend tests, cd to angularApp and use command: 
* `gulp test`

## License
Code released under the [the MIT license](https://github.com/ddsooxo/Trello-Clone/blob/png/LICENSE).


