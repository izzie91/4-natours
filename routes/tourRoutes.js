const express = require('express');

const router = express.Router();

const tourController = require('../controllers/tourController');

/*router.param('id', function (req, res, next, val) {
  console.log(`The id value is ${val}`);
  next();
});*/

//router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tours-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

//Create a checkBody middleware
//Check if body contains the name and price property
//If not, send back 404 (bad request)
//Add it to the post handler stack

router
  .route('/')
  .get(tourController.getAllTours)
  //.post(tourController.checkBody, tourController.createTour);
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
