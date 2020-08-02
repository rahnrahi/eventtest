const express = require('express');
const auth = require('../../middlewares/auth');
const eventsController = require('../../controllers/events.controller');

const router = express.Router();

router.route('/')
      .post(auth('getUsers'),eventsController.createEvent)
      .get(auth('getUsers'), eventsController.getevents);

router
  .route('/:id')
  .get(auth('getUsers'), eventsController.getEvent)
  .patch(auth('manageUsers'),eventsController.updateEvent)
  .delete(auth('manageUsers'), eventsController.deleteEvent);


  //.get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);



module.exports = router;