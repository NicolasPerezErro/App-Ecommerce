import mongoose from 'mongoose';

const schema = mongoose.Schema({
    title: { type: String, require: true, max: 30 },
    description: { type: String, max: 70 },
    code: { type: Number, require: true },
    thumbnail: { type: String, require: true, max: 200 },
    category: { type: String, require: true, max: 300 },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    id: { type: Number, require: true },
    timestamp: { type: Date, require: true },
    amount: { type: Number, require: true }
});

const nombreColeccion = 'productos'

export { nombreColeccion, schema } 