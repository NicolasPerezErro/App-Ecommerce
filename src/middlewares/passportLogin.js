import passport from 'passport';
import bCrypt from 'bcrypt';
import mongoose from 'mongoose';

import { Strategy as LocalStrategy } from 'passport-local';

import { nombreColeccion, schema } from '../models/userModel.js'

const User = mongoose.model(nombreColeccion, schema);

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                return done(null, false);
            }

            return done(null, user);
        })
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});


function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

export default passport