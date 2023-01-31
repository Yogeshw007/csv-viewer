const router = require('express').Router();
const homeController = require('../controllers/homeController');

// Home page router
router.get('/', homeController.home);

// Create a CSV file into DB
router.post('/create', homeController.create);

// View the CSV file
router.get('/view/:id', homeController.view);

// Delete the CSV file
router.get('/delete/:id', homeController.delete);

module.exports = router;