const express = require('express');
const trainController = require('../controllers/trainController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authenticate, isAdmin, trainController.addTrain);
router.get('/route', trainController.getTrainsByRoute);

module.exports = router;