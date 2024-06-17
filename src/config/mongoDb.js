const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:example@localhost:27017/alumnos?authSource=admin'

async function connectToDatabase() {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexión a mongo con éxito');
    } catch (err) {
        console.error('Error al conectarse a mongo', err);
    }
}

connectToDatabase();



module.exports = mongoose