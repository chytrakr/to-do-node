const mongoosePaginate = require('mongoose-paginate'); 
const mongoose = require('mongoose'); 
const DB = require('./db.js');
const autoIncrement = require('mongoose-auto-increment');

module.exports = {
	mongoose: mongoose,
	paginate: mongoosePaginate,
	db: DB,
	increment: autoIncrement
}