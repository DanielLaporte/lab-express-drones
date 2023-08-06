// Iteration #1
// Importar el modelo Drone
const mongoose = require('mongoose');
const Drone = require('../models/Drone.model');

// Arreglo con los drones iniciales
const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
];

mongoose
  .connect("mongodb://127.0.0.1:27017/lab-express-drones", { bufferCommands: false })
  .then(() => {
    console.log("Conexión exitosa a la base de datos.");
// Función para inicializar la base de datos con los drones iniciales
const seedDatabase = async () => {
  try {
    
    // Crear los drones en la base de datos utilizando el método create()
    const createdDrones = await Drone.create(drones);

    // Mostrar cuántos drones se han creado
    console.log(`${createdDrones.length} drones creados.`);
  } catch (error) {
    // En caso de error, imprimir el mensaje de error
    console.error('Error al inicializar la base de datos:', error.message);
  } finally {
    // Cerrar la conexión con la base de datos al finalizar
    mongoose.connection.close();
  }
};

// Llamar a la función para inicializar la base de datos
seedDatabase();
})
.catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });