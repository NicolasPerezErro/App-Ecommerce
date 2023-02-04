import mongoose from 'mongoose';

const schema = mongoose.Schema({
    nro_orden: { type: Number, max: 70 },
    items: { type: String, require: true, max: 30 },
    status: { type: Number, require: true },
    email: { type: String, require: true, max: 30 },
    dateTime: { type: String, require: true }
});

const nombreColeccion = 'ordenes'

export { nombreColeccion, schema } 