const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleClientID = require('./config').googleClientID;
const googleClientSecret = require('./config').googleClientSecret;

const app = express();
const PORT = process.env.PORT || 5000;

passport.use(new GoogleStrategy());

app.listen(PORT, () => console.log(`Server is listen on http://localhost:${PORT}`));