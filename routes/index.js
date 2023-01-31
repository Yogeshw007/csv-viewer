const router = require('express').Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.post('/create', homeController.create);
router.get('/view/:id', homeController.view);
router.get('/delete/:id', homeController.delete);

module.exports = router;