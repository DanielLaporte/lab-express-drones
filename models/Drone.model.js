// Iteration #1const mongoose = require('mongoose');
const mongoose = require('mongoose');
// Definir el esquema del modelo de dron
const droneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  propellers: {
    type: Number,
    required: true
  },
  maxSpeed: {
    type: Number,
    required: true
  }
});

// Crear el modelo Drone con el esquema definido
const Drone = mongoose.model('Drone', droneSchema);

// Exportar el modelo Drone para que esté disponible en otras partes de la aplicación
module.exports = Drone;