require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// routes
const routeBase = './app/routers'
const authRoutes = require(`${routeBase}/authRoutes`);
const appRoutes = require(`${routeBase}/appRoutes`);

app.use(authRoutes, appRoutes);

// gestion d'erreur
const errorModule = require("./app/services/error/errorHandler");
// gestion de l'erreur 404
app.use(errorModule._404);
// gestion des erreurs globales
app.use(errorModule.manage);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});