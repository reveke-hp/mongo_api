const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mi_basededatos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const carrerasRouter = require('./routes/carrera.route');
const materiasRouter = require('./routes/materia.route');
const cursosRouter = require('./routes/cursos.route');
const profesoresRouter = require('./routes/profesores.route');

app.use('/carreras', carrerasRouter);
app.use('/materias', materiasRouter);
app.use('/cursos', cursosRouter);
app.use('/profesores', profesoresRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
