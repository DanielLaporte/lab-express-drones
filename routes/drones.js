const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');
router.get('/drones', (req, res, next) => {
  Drone.find()
  .then((drones) => {
    res.render('drones/list', { drones }); // Renderiza la vista list.hbs con el arreglo de drones
  })
  .catch((error) => {
    console.error('Error al obtener la lista de drones:', error.message);
    next(error);
  });
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form'); // Renderiza la vista create-form.hbs para el formulario de creación
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  Drone.create({ name, propellers, maxSpeed }) // Crea un nuevo dron en la base de datos
  .then(() => {
    res.redirect('/drones'); // Redirige a la lista de drones si se creó con éxito
  })
  .catch((error) => {
    console.error('Error al crear un nuevo dron:', error.message);
    res.render('drones/create-form'); // Renderiza nuevamente el formulario en caso de error
  });
});

// Iteration #4: Update the drone

router.get('/drones/:id/edit', (req, res, next) => {
  const droneId = req.params.id;
  Drone.findById(droneId)
    .then((drone) => {
      res.render('drones/update-form',{drone}); // Renderiza la vista update-form.hbs con el dron a editar
    })
    .catch((error) => {
      console.error('Error al obtener el dron para edición:', error.message);
      next(error);
    });
});

 // Iteration #4: Update the drone

router.post('/drones/:id/edit', (req, res, next) => {
  const droneId = req.params.id;
  const { name, propellers, maxSpeed } = req.body;

  Drone.findByIdAndUpdate(droneId, { name, propellers, maxSpeed }, { new: true })
    .then(() => {
      res.redirect('/drones'); // Redirige a la lista de drones si la actualización fue exitosa
    })
    .catch((error) => {
      console.error('Error al actualizar el dron:', error.message);
      res.render('drones/update-form', { drone: req.body }); // Renderiza nuevamente el formulario en caso de error
    });
});


  // Iteration #5: Delete the drone
router.post('/drones/:id/delete', (req, res, next) => { 
const droneId = req.params.id; 
Drone.findByIdAndDelete(droneId) // Elimina el dron de la base de datos
.then(() => {
  res.redirect('/drones'); // Redirige a la lista de drones si la eliminación fue exitosa
   })
.catch((error) => {
  console.error('Error al eliminar el dron:', error.message);
  next(error);
   });
});

module.exports = router;
