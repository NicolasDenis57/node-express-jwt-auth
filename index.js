require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;



// middleware
app.use(express.static('public'));
app.use(express.json());


// view engine
app.set('view engine', 'ejs');

// routes
const routeBase = './app/routers'
const authRoutes = require(`${routeBase}/authRoutes`);
const appRoutes = require(`${routeBase}/appRoutes`);

app.use(authRoutes, appRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});