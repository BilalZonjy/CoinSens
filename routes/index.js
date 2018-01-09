var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Portfolio = require('../models/portfolio');
var Profile = require('../models/Profile');
var mid = require('../middleware');

// GET /profile
router.get('/profile', mid.requiresLogin, function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                return res.render('profile', { title: 'Profile', name: user.name });
            }
        });
});

// GET /logout
router.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

// GET /login
router.get('/login', mid.loggedOut, function(req, res, next) {
    return res.render('login', { title: 'Log In' });
});

// POST /login
router.post('/login', function(req, res, next) {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function(error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    } else {
        var err = new Error('Email and password are required.');
        err.status = 401;
        return next(err);
    }
});






router.get('/register', mid.loggedOut, function(req, res, next) {
    return res.render('register', { title: 'Sign Up' });
});
// GET /register
router.post('/register', function(req, res, next) {
    if (req.body.email &&
        req.body.name &&
        req.body.password &&
        req.body.confirmPassword) {

        // confirm that user typed same password twice
        if (req.body.password !== req.body.confirmPassword) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            return next(err);
        }

        // create object with form input
        var userData = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
        };

        // use schema's `create` method to insert document into Mongo
        User.create(userData, function(error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                var userportfolio = {
                    id: user._id,
                    btn: 0,
                    eth: 0,
                    lit: 0,

                };
                Portfolio.create(userportfolio, function(error, user) {
                    if (error) { cosole.log(error) }
                });
                return res.redirect('/profile');
            }
        });



    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})


// GET /
router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
    return res.render('about', { title: 'About' });
});
router.get('/facts', function(req, res, next) {
    return res.render('facts', { title: 'CryptoKnow' });
});
// router.get('/dashboard', function (req, res, next) {
//   return res.render('dashboard', { title: 'Dashboard' });
// });
router.get('/dashboard', mid.requiresLogin, function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                return res.render('dashboard', { title: 'dashboard', name: user.name });
            }
        });
});


router.post('/updateProfile', mid.requiresLogin, function(req, res, next) {

    var profileData = {
        id: req.session.userId,
        city: req.body.city,
        website: req.body.website,
    };
    console.log(profileData);
    Profile.update({ _id: req.session.userId }, profileData, { upsert: true }, function(error, user) {
        if (error) { console.log(error) }
    });
    return res.redirect('/profile');

});

// GET /contact
router.get('/contact', function(req, res, next) {
    return res.render('contact', { title: 'Contact' });
});


module.exports = router;