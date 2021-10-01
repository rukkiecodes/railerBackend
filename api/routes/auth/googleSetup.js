const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("../../modules/userSchema")

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
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // use the profile info (mainly profile id) to check if the user is registerd in ur db
      User.find({ userEmail: profile._json.email })
        .exec()
        .then((user) => {
          // console.log(user)
          if (user.length >= 1) {
            console.log("email exists")
            User.updateOne(
              { userEmail: profile._json.email },
              {
                $set: {
                  sub: profile._json.sub,
                  name: profile._json.email,
                  given_name: profile._json.name,
                  family_name: profile._json.family_name,
                  picture: profile._json.picture,
                  email: profile._json.email,
                  email_verified: profile._json.email_verified,
                  locale: profile._json.locale,
                },
              }
            )
              .exec()
              .then(result => {
                console.log("UPDATED: ", result)
              })
              .catch(updateError => {
                console.log("UPDATE ERROR: ", updateError)
              })
          } else {
            bcrypt.hash("123456", 10, (err, hash) => {
              if (err) {
                console.log("ERROR HASHING PASSWORD: ", err)
              } else {
                const user = new User({
                  _id: new mongoose.Types.ObjectId(),
                  fullName: profile._json.name,
                  userEmail: profile._json.email,
                  password: hash,
                  sub: profile._json.sub,
                  name: profile._json.email,
                  given_name: profile._json.name,
                  family_name: profile._json.family_name,
                  picture: profile._json.picture,
                  email: profile._json.email,
                  email_verified: profile._json.email_verified,
                  locale: profile._json.locale,
                })
                user
                  .save()
                  .then((signedUser) => {
                    console.log("SIGNED UP USER: ", signedUser)
                  })
                  .catch((error) => {
                    console.log("ERROR SIGNING UP: ", error)
                  })
              }
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
      // console.log("PASSED", profile._json)
      return done(null, profile)
    }
  )
)
