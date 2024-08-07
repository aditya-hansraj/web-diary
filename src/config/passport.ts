import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import UserType from '../types/user';

passport.use(new LocalStrategy(
  async (username: string, password: string, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID!,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   callbackURL: "/auth/google/callback"
// },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       const user = await User.findOne({ googleId: profile.id });
//       if (user) {
//         return done(null, user);
//       } else {
//         const newUser = new User({
//           googleId: profile.id,
//           username: profile.displayName,
//           email: profile.emails[0].value,
//         });
//         const savedUser = await newUser.save();
//         return done(null, savedUser);
//       }
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
