import mongoose from 'mongoose';

const schema = mongoose.Schema({
    id: { type: Number, require: true, unique: true },
    timestamp: { type: Date, require: true },
    dateTime: { type: String, require: true },
    productos: [{
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
    }],
    email: { type: String, require: true },
    address: { type: String, require: true }
});

const nombreColeccion = 'carritos'

export { nombreColeccion, schema } 