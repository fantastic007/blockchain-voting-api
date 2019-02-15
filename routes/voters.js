const express = require('express');
const router = express.Router();

const voteController = require('../controllers/voters');

router.get('/all', voteController.getAllVoters);

module.exports = router;