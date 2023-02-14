const path = require('path');
const express = require('express');
const dbConfig = require('./db.js');
const bodyParser = require('body-parser');
const utils = require('./utils');
const db = require('./db');

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const fail = (res) => res.sendStatus(500);
const succsess = (res) => res.sendStatus(200);

const hello = "hello";

app.get('/check', (req, res) => {
  res.redirect('/signup/?data=12')
})

app.post('/login', (req, res) => {
  const data = { email: req.body.Email, password: req.body.password };
  utils.checkLogin(data, (result) => {
    if (result.length !== 0) {
      console.log("Login Succsseful");
      res.redirect(`/?email=${req.body.Email}`);
    } else {
      res.redirect("/login");
    }
  },
    () => {
      res.redirect("/login");
    });
});

app.post('/register', (req, res) => {
  const isValidForm = utils.formValidation(req.body).result;
  console.log(isValidForm)
  if (!isValidForm) {
    res.redirect("/signUp");
  } else {
    const result = utils.saveToDb(req.body);
    res.redirect("/");
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/Homepage.html'));
});

app.get('/homePage', (req, res) => {
  res.redirect('/');
});

app.get('/checkOut', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/CheckOut.html'));
});

app.get('/color', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/color.html'));
});

app.get('/contactUs', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/ContactUs.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/Login.html'));
});

app.get('/ourTeam', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/OurTeam.html'));
});

app.get('/prices', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/Prices.html'));
});

app.get('/signUp', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/SignUp.html'));
});

app.get('/aboutUs', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/AboutUs.html'));
});

app.get('/createDB', (req, res) => {
  db.createDB(fail, () => {}, res);
  db.useDB();
  db.createGender(fail, () => {
    db.insertGender(fail, () => {}, res);
  }, res);
  db.createSkinType(fail, () => {
    db.insertSkinType(fail, () => {}, res);
  }, res);
  db.createUser(fail, () => {
    db.insertUser(fail, () => {}, res);
  }, res);
  res.sendStatus(200);
});

app.get('/createGender', (req, res) => {
  db.useDB();
  db.createGender(fail, succsess, res);
});

app.get('/insertGender', (req, res) => {
  db.useDB();
  db.insertGender(fail, succsess, res);
});

app.get('/createSkinType', (req, res) => {
  db.useDB();
  db.createSkinType(fail, succsess, res);
});

app.get('/insertSkinType', (req, res) => {
  db.useDB();
  db.insertSkinType(fail, succsess, res);
});

app.get('/createUser', (req, res) => {
  db.useDB();
  db.createUser(fail, succsess, res);
});

app.get('/insertUser', (req, res) => {
  db.useDB();
  db.insertUser(fail, succsess, res);
});

app.get('/selectGender', (req, res) => {
  db.useDB();
  db.selectGender(fail, res);
});

app.get('/selectSkinType', (req, res) => {
  db.useDB();
  db.selectSkinType(fail, res);
});

app.get('/selectUser', (req, res) => {
  db.useDB();
  db.selectUser(fail, res);
});

app.get('/dropAll', (req, res) => {
  db.useDB();
  db.dropAll(fail, succsess, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
