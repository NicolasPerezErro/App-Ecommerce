import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: { type: String },
    password: { type: String },
    name: { type: String },
    age: { type: Number },
    address: { type: String },
    phone: { type: Number }
});

const nombreColeccion = 'Users'

export { nombreColeccion, schema } 