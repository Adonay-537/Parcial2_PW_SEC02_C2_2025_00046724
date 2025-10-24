const express = require('express');
const app = express();

// Importar las rutas
const cuentasRoutes = require('./routes/cuentasRoutes');

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas
app.use('/', cuentasRoutes);

// Puerto definido por el examen
const PORT = 3130;

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
