![Badges](https://img.shields.io/badge/jasmine-passing-brightgreen.svg)
![Badges](https://img.shields.io/npm/l/express.svg)
# What The Trell(MEAN Stack Trello-Clone)

![Logo](https://github.com/ddsooxo/Trello-Clone/blob/master/png/title.png)

## Description
This is a project I completed for LearnTech Labs bootcamp. The assignment was to create a clone
of a popular app called [Trello](https://trello.com/) which is used by many
developers and technical project managers for project planning.
It’s not just a simple todo, its a todo app with a lot of different components with it.
Each user can create an account and create mutiple new boards with lists and items.

## Technologies Used
* [MongoDB](https://mongodb.org) (v3.0.7)
* [Mongoose](http://mongoosejs.com/) (v4.2.4)
* [ExpressJS](https://expressjs.com) (v2.5)
* [AngularJS](https://angularjs.org) (v1.4.8)
* [NodeJS](https://nodejs.org/en/) (v4.2.1)

 
## Overview Of The Setup
You will need to download Node, NPM, mongoDB, and Mongoose. To run the application, you will need Angular, Mongodb, Mongoose, and Node server running.

### Installation:

Click [here](https://nodejs.org/en/) to install NodeJS.

After installing, in your command line(git) go to  your root directory file by doing cd(change directory) or pwd(print working directory) to check which directory you're currently in.  
Once your're in your root directory, go ahead and type in the following commands: 
* `node -v` Allows you to check the version of the node you've downloaded.
* `npm`  Node comes with npm installed as well. 
* ` npm install mongoose`  [Mongoose](http://mongoosejs.com/docs/index.html) provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.


## Quick Setup:

* Open a terminal window and choose a directory you want to clone this repo in by `cd 'path name' `
* Make a folder in that cd: `mkdir 'folder name' ` and cd into that folder you've just created
* Clone my repo using: `git clone git@github.com:ddsooxo/Trello-Clone.git`
* To retrieve all the node modules on your computer, type: `npm install `
* To set up jasmine testing run command `jasmine init` 

## Running the app
I would recommend opening up different tabs on your terminal and labeling them according to what you're running (i.e. git, node, mongo, ng, db)

* Open a new tab on terminal and run Mongo using  by typing the command: `mongod` (click [here](https://docs.mongodb.org/manual/reference/program/mongod/) for further information on mongod)
* Open another new tab on terminal and run the server by typing the command: `node app` (you should see 'listening on port 3000' after running the command)
* Open one more new tab on terminal and run the client side by typing the command: `gulp serve` (This will automatically launch a new web browser window and will take you the landing page of the app. If not, simply type into the browser's URL bar: 'localhost:3000').
* To check your database entries, use command: ` mongo ` and choose the database. ('mytodoapp' is name of the database for this app. Refer to the [MongoDB](https://docs.mongodb.org/manual/tutorial/use-database-commands/) documentation on how to use the the database commands.)
* 
A quick side node: If you have already cloned my repo and created an account in the app, I would open up the mongo console and find mytodoapp database and drop that database. Otherwise, it will not let you create an account because of duplicate key values.

## Screenshots: 

![Alt text](https://github.com/ddsooxo/Trello-Clone/blob/master/png/boardPage.png)
![Alt text](https://github.com/ddsooxo/Trello-Clone/blob/master/png/listPage.png)
![Alt text](https://github.com/ddsooxo/Trello-Clone/blob/master/png/registerPage.png)


## Tests
###### Running Server Tests
To run the server/backend tests, navigate into directory /expressApp and run command `jasmine spec`

###### Running Client Tests
To run the angular/frontend tests, navigate to /angularApp and run command `gulp test`

## License
Code released under the [the MIT license](https://github.com/ddsooxo/Trello-Clone/blob/png/LICENSE).


