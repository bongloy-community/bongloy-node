const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Bongloy = require('bongloy');
require('dotenv').config();

const bongloy = new Bongloy(process.env.BONGLOY_SECRET_KEY);

const app = express();

// This will make our form data much more useful
app.use(bodyParser.urlencoded({ extended: true }));

// This will set express to render our views folder, then to render the files as normal html
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, './views')));

app.post("/charge", (req, res) => {
  try {
    bongloy.charges
      .create({
        amount: 10000,
        currency: "usd",
        source: req.body.bongloyToken
      })
      .then(() => {
        res.render("completed.html")
      })
      .catch(err => console.log(err));
  } catch (err) {
    res.send(err);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server is running...'));
