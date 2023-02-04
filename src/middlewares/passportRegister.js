import passport from 'passport';
import bCrypt from 'bcrypt';
import mongoose from 'mongoose';

import { Strategy as LocalStrategy } from 'passport-local';

import { nombreColeccion, schema } from '../models/userModel.js'

const User = mongoose.model(nombreColeccion, schema);

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        User.findOne({ 'username': username }, (err, user) => {
            if (err) {
                return done(err);
            };

            if (user) {
                return done(null, false);
            }

            const newUser = {
                username: username,
                password: createHash(password),
                name: req.body.name,
                age: req.body.age,
                address: req.body.address,
                phone: req.body.phone

            };

            User.create(newUser, (err, userWithId) => {
                if (err) {
                    return done(err);
                }
                return done(null, userWithId);
            })
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


export default passport 