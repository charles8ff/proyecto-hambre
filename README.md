# 🍔 Project Hungry - Final Project 4GeeksAcademy 🍴
### Final Project with @charles8ff

In this project our goal is to give to local hostelry an easier and simple access to the digital world. Furthermore, we will bring visibility 
to those little establishments through our searchbar.

To achieve our goal, we reshape the traditional paper menus into a digital approach, including QR technology. Moreover, we will bring forward 
those businesses to new clients born into the digital world, by developing a search engine using our database that filters the different products
these refreshed establishments.

# Thinking about the UX
<a href="https://docs.google.com/spreadsheets/d/1GkgkEOZP4fDDO_FT29dnPJT-r2ZatEt_L4DRrKOZQ4c/edit?usp=sharing" target="_blank"><img align="center" src="https://i.imgur.com/mWDYnF3.png" alt="UX" border="0" /></a>
<a href="https://docs.google.com/spreadsheets/d/1GkgkEOZP4fDDO_FT29dnPJT-r2ZatEt_L4DRrKOZQ4c/edit?usp=sharing" target="_blank"><img align="center" src="https://i.imgur.com/bB88i7K.png" alt="UX" border="0" /></a>
<a href="https://docs.google.com/spreadsheets/d/1GkgkEOZP4fDDO_FT29dnPJT-r2ZatEt_L4DRrKOZQ4c/edit?usp=sharing" target="_blank"><img align="center" src="https://i.imgur.com/HYECyUP.png" alt="UX" border="0" /></a>
(Click images to see the Google spreadsheets)

# Designing database
<a href="https://app.quickdatabasediagrams.com/#/d/CYSjvQ" target="_blank"><img align="center" src="https://i.imgur.com/evpMqPK.jpg" alt="DATABASE-model" border="0" /></a>
(Click image to open the preview of the database)

# Colors palette used across the project
<a href="https://coolors.co/191919-cdcdcd-ffffff-f44708-ed750b-f6b983-58c7e0" target="_blank"><img align="center" src="https://i.imgur.com/jgF5msE.png" alt="colors" border="0" /></a>
(Click image to open the preview of the colors)

<<<<<<< HEAD
<<<<<<< HEAD
### Context
This boilerplate comes with a centralized general Context API. The file `./src/js/store/flux.js` has a base structure for the store, we encourage you to change it and adapt it to your needs.

React Context [docs](https://reactjs.org/docs/context.html)
BreathCode Lesson [view](https://content.breatheco.de/lesson/react-hooks-explained)

The `Provider` is already set. You can consume from any component using the useContext hook to get the `store` and `actions` from the Context. Check `/views/demo.js` to see a demo.

```jsx
import { Context } from "../store/appContext";
const MyComponentSuper = () => {
  //here you use useContext to get store and actions
  const { store, actions } = useContext(Context);
  return <div>{/* you can use your actions or store inside the html */}</div>
}
```

### Back-End Manual Installation:

It is recomended to install the backend first, make sure you have Python 3.8, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure yo replace the valudes with your database information:

| Engine	| DATABASE_URL 						|
| ------------- | ----------------------------------------------------- |
| SQLite	| sqlite:////test.db	 				|
| MySQL		| mysql://username:password@localhost:port/example	|
| Postgress	| postgres://username:password@localhost:5432/example 	|

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start


### Front-End Manual Installation:

- Make sure you are using node version 14+ and that you have already successfully installed and runned the backend.

1. Install the packages: `$ npm install`
2. Start coding! start the webpack dev server `$ npm run start`

## Publish your website!

This boilerplate it's 100% integrate with Herkou, just by pushing your changes to the heroku repository it will deploy: `$ git push heroku main`
=======
# We used Trello to keep track of the organization of the proyect
<a href="https://trello.com/invite/b/qZXdt2L6/0a04ac85f62d8b8c495bfb3a255fd93b/proyecto-hambre-%F0%9F%8D%94" target="_blank"><img align="center" src="https://i.imgur.com/RbU9LYg.jpg" alt="Trello" border="0" /></a>
(Click image to see the Trello of the project)
>>>>>>> e175d1128e9e68cf862c333fb26cb7ea1d23f075
=======
# We used Trello to keep track of the organization of the proyect
<a href="https://trello.com/invite/b/qZXdt2L6/0a04ac85f62d8b8c495bfb3a255fd93b/proyecto-hambre-%F0%9F%8D%94" target="_blank"><img align="center" src="https://i.imgur.com/RbU9LYg.jpg" alt="Trello" border="0" /></a>
(Click image to see the Trello of the project)
>>>>>>> feature/carlos/login
