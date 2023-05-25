require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ 
  origin: "http://localhost:3000",
  credentials: true 
}));

// middleware
app.use(express.json());

// routes
const route = './app/routers/'
const authRoutes = require(`${route}/authRoutes`);
const apiRoutes = require(`${route}/apiRoutes`);

app.use(authRoutes, apiRoutes);

// gestion d'erreur
const errorModule = require("./app/services/error/errorHandler");
// gestion de l'erreur 404
app.use(errorModule._404);
// gestion des erreurs globales
app.use(errorModule.manage);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});