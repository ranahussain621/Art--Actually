const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require('./model/users')

passport.use(
	new GoogleStrategy(
		{
			clientID: '853318535499-on9iuiov70fco8gtuokrhvn790re9fih.apps.googleusercontent.com',
    		clientSecret: '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',
			callbackURL: "/authenticate/google/callback",
			scope: ["profile", "email"],
		},
		function  (accessToken, refreshToken, profile, callback) {
			callback(null, profile,accessToken);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
