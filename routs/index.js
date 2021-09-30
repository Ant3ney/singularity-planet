//index routs
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var passport = require('passport');
let fetch = require('node-fetch');

//Sign up routs
router.get('/register', (req, res) => {
   res.render('register');
});
router.post('/register', (req, res) => {
   var newUser = new User({ username: req.body.username, type: 'user' });
   User.register(newUser, req.body.password, (err, user) => {
      if (err) {
         console.log(err.message);
         return res.render('register');
      } else {
         passport.authenticate('local')(req, res, () => {
            res.redirect('/blog');
         });
      }
   });
});

//login routs
router.get('/login', (req, res) => {
   res.render('login');
});
router.post(
   '/login',
   passport.authenticate('local', {
      successRedirect: '/blog',
      falureRedirect: '/login',
   })
);

//logout route
router.get('/logout', (req, res) => {
   req.logout();
   res.redirect('/blog');
});

router.get('/chimpanzeeprivacypolicy', (req, res) => {
   res.render('SpecticleGamesTerms/chimpanzee');
});

router.get('/businesspolicy/pricing', (req, res) => {
   res.render('SingularityPolicy/price/index');
});

router.get('/privacy', (req, res) => {
   res.render('SingularityPolicy/privacy');
});

router.get('/makedeal', (req, res) => {
   res.render('MakeDeal');
});

router.post('/makedeal', (req, res) => {
   console.log('In make deal post');
   let email = req.body.email;
   let message = `${req.body.email} just filled out your singularity palnet form and said \n${req.body.message}`;

   console.log('Will be sending this data');
   console.log({ message: message, email: email });

   let body = JSON.stringify({
      toEmail: 'anthonycavuoti@gmail.com',
      fromEmail: email,
      subject: 'Singularity Planet Mail!',
      message: message,
   });
   fetch(`${process.env.EMAIL_SERVER}/sendMail`, {
      method: 'post',
      body: body,
      headers: {
         'Content-Type': 'application/json',
      },
   })
      .then(res => {
         return res.json();
      })
      .then(status => {
         console.log('status data below');
         console.log(status);
      })
      .catch(err => {
         console.error(err);
      });
});

module.exports = router;
