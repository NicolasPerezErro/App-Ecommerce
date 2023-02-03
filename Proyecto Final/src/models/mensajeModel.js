import mongoose from 'mongoose';

const schema = mongoose.Schema({
    email: { type: String, require: true, max: 30 },
    dateTime: { type: String, max: 70 },
    type: { type: String, require: true },
    body: { type: String, require: true, max: 200 }
});

const nombreColeccion = 'mensajes'

export { nombreColeccion, schema } 