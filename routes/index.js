var express = require('express');
var router = express.Router();
const User = require("../models/userProduct");
const Detail = require("../models/userModel")
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(Detail.authenticate()));
var cart = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET create page. */
router.get('/create-admin', function(req, res, next) {
  res.render('create', { title: 'create-admin-page' });
});

/* GET user signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'user-signup' });
});

/* GET user signin page. */
router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'user-signin' });
});

/* post create page. */
router.post("/signup-admin", function (req, res, next) {
  const { username, password, company, price, photo } = req.body;
  User.create({
    username,
    password,
    company,
    price,
    photo,

  }).then(function (createduser) {
    console.log(createduser);
    res.redirect("/")
  }).catch((err) => {
    res.send(err)
  });
});

/* GET show page. */
router.get('/show', function(req, res, next) {
  User.find().then(function (users) {
    // console.log(users);
    res.render("show",{title:'showdata',users})
  }).catch(function (err) {
    res.send(err)
  })
});

/* post signup page  */
router.post("/signup", function (req, res, next) {
  const { username, email, password, contact } = req.body;
  Detail.register({ username, email, contact }, password)
    .then((details) => {
      res.redirect("/signin");
    })
    .catch((err) => res.send(err));
});

/* post signin */
router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  }),
  function (req, res, next) {}
);


router.get("/cart", function (req, res) {
  res.render("cart",{title:'Add Cart',task:cart})
})

router.post("/cart",function (req, res) {
  const cartData={
    id: req.body.id,
    company: req.body.company,
    price: req.body.price,
    photo:req.body.photo
  }
  cart.push(cartData)
  res.redirect("/cart")
})

router.get("/del/:id", function (req, res) {
  cart = cart.filter((task) => task.id !== req.params.id)
  res.redirect("/cart")
})

module.exports = router;
