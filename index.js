require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:3000" }));

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// routes
const routeBack = './app/routers/back'
const authRoutesBack = require(`${routeBack}/authRoutes`);
const apiRoutes = require(`${routeBack}/apiRoutes`);

const routeFront = './app/routers/front'
const authRoutesFront = require(`${routeFront}/authRoutes`);
const appRoutes = require(`${routeFront}/appRoutes`);



app.use(authRoutesBack, appRoutes, apiRoutes, authRoutesFront);

// gestion d'erreur
const errorModule = require("./app/services/error/errorHandler");
// gestion de l'erreur 404
app.use(errorModule._404);
// gestion des erreurs globales
app.use(errorModule.manage);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});