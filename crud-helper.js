// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
const Task = require('./models/task');
const AgeRange = require('./models/ageRange');
// const Order = require('./models/order');

// Local variables will come in handy for holding retrieved documents
let user, task, ageRange, order;
let users, tasks, ageRanges, orders;