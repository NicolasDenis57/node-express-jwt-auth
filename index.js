require('dotenv').config();
const express = require('express');
const cors = require('cors')
const corsOptions = require('./app/config/corsOptions');
const app = express();
const path = require('path');
const credentials = require('./app/middleware/credentials');
const { logger } = require('./app/middleware/logEvents');
const errorHandler = require('./app/middleware/errorHandler');
const verifyJWT = require('./app/middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3001;

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// middleware
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./app/routers/root'));
app.use('/register', require('./app/routers/register'));
app.use('/login', require('./app/routers/auth'));
app.use('/refresh', require('./app/routers/refresh'));
app.use('/logout', require('./app/routers/logout'));

app.use(verifyJWT);
app.use('/recipes', require('./app/routers/API/recipes'));
app.use('/users', require('./app/routers/API/users'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

app.use(errorHandler);

// gestion d'erreur
const errorModule = require("./app/services/error/errorHandler");
// gestion de l'erreur 404
app.use(errorModule._404);
// gestion des erreurs globales
app.use(errorModule.manage);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});