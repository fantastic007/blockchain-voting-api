const express = require('express');
const router = express.Router();

const voteController = require('../controllers/voters');

router.get('/all', voteController.getAllVoters);
router.get('/nominations', voteController.getNominations);
router.get('/query', voteController.getUser);
router.post('/cast', voteController.nominate);

module.exports = router;