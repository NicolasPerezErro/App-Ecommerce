import MongoStore from 'connect-mongo'
import dotenv from 'dotenv';
import path from 'path'

dotenv.config({
    path: path.resolve(process.cwd(), `${process.env.NODE_ENV}.env`)
});

export default {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    PORT: process.env.PORT || 8080,
    MODO: process.env.MODO || 'FORK',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/ecommerce',
    PERS: process.env.PERS || 'mongodb',
    SECRET_KEY: process.env.SECRET_KEY || 'secret',
    SESSION_EXPIRES: process.env.SESSION_EXPIRES || 100000,
    HOST_EMAIL: process.env.HOST_EMAIL,
    PASS_EMAIL: process.env.PASS_EMAIL,
    fileSystem: {
        path: './src/DB/'
    },

    firebase: {
        "type": "service_account",
        "project_id": "ecommerce-e3e2f",
        "private_key_id": "",
        "private_key": "-----BEGIN PRIVATE KEY----------END PRIVATE KEY-----\n",
        "client_email": "",
        "client_id": "",
        "auth_uri": "",
        "token_uri": "",
        "auth_provider_x509_cert_url": "",
        "client_x509_cert_url": ""
    },

    mongoSession: {
        store: MongoStore.create(
            {
                mongoUrl: process.env.MONGO_URL,
                mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
            }),
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: Number(process.env.SESSION_EXPIRES)
        }
    }
}

