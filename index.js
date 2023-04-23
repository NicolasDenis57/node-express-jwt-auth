require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});