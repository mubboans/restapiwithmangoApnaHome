const GoogleStrategy =require('passport-google-oauth20').Strategy;
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLOUD_ID,
    clientSecret:process.env.GOOGLE_CLOUD_SECRET,
    callbackURL:`${process.env.BACK_END_LIVE_URL}auth/google/callback`,
    scope:["profile","email"],
},
(accessToken,refreshToken,profile,callback)=>{
   
    // console.log(profile,'profile',UsersObj);
    
   return callback(null,profile)
}
));

passport.use(new FacebookStrategy({
    clientID:process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET_ID,
    callbackURL: `${process.env.BACK_END_LIVE_URL}auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link']
    // profileFields: ['id', 'displayName', 'emails']
  },
  function(accessToken, refreshToken, profile, done) {
    // Handle Facebook authentication
    // You can access user data in the profile object
    // Perform any necessary actions or database operations here
    // You can also store user information in session or create a new user account
    return done(null, profile);
  }
));
passport.serializeUser((user,done)=>{
    done(null,user)
});

passport.deserializeUser((user,done)=>{
    done(null,user)
});