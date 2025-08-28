
const express = require('express');
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/calcular', (req, res) => {
  const { a, b, operacion } = req.body;
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  let resultado;

  switch (operacion) {
    case 'sumar':
      resultado = numA + numB;
      break;
    case 'restar':
      resultado = numA - numB;
      break;
    case 'multiplicar':
      resultado = numA * numB;
      break;
    case 'dividir':
      resultado = numB !== 0 ? numA / numB : 'Error: División por cero';
      break;
    default:
      resultado = 'Operación no válida';
  }

  res.send(`
    <script>
      alert('El resultado es: ${resultado}');
      window.location.href = '/';
    </script>
  `);
});

app.listen(port, () => {
  console.log(`Calculadora web escuchando en http://localhost:${port}`);
});
