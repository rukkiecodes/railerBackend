const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "http://localhost:3000/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // use the profile info (mainly profile id) to check if the user is registerd in ur db
      return done(null, profile)
    }
  )
)
