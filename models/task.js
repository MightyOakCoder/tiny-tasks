const mongoose = require('mongoose');

// Ensure that the Category model is loaded by Mongoose 
// so that it can be used to populate the items
require('./category');
const taskSchema = require('./taskSchema');

module.exports = mongoose.model('Task', taskSchema);