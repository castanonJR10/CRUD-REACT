import express from 'express';
import  cors  from 'cors';
import usuarioRuta from '../src/Routes/usuarioRuta.js';

const app = express();
app.use(express.json());

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

const port = 5002 || process.env.port;

app.use('/api', usuarioRuta);

app.get('/', (req, res) => {
    res.send('Hola mundo!');
});

app.post('/adios', (req, res) => {
    res.send('ADIOS AMOR, ME VOY DE TI Y ESTA VEZ PARA SIEMPRE...');
});


app.listen(port, () => {
    console.log(`El puerto es : ${port}`);
});
