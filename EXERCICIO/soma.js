const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/soma/:n1/:n2', (req, res) => {
    const {n1, n2} = req.params;

    let resultado = parseFloat(n1) + parseFloat(n2)
    
    res.status(200).json({ message: resultado});
});
app.listen(8080, () => {
    let data = new Date();

    console.log("Servidor iniciado em:" + data);
});
