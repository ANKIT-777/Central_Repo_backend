const express = require('express');
const ChartController = require('../controller/teamsController.js');
const { getSummaryTable } = require('../controller/summaryController.js');


const router = express.Router();

router.get('/get', getSummaryTable);
router.post('/push-data', ChartController.pushData);



module.exports = router;