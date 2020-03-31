const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

const app = express();

passport.use(
	new GoogleStrategy({
		ClientID: keys.googleClientID,
    ClientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
	}, (accessToken) => {
    console.log('Access token: ' + accessToken);
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
