const express = require('express');

// Routes Import
const toDo = require("./toDo/index.js");

const router = express.Router();

// Adding Routes
router.use('/to-do', toDo);

module.exports = router;
