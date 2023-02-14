const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ageRangeSchema = new Schema({
    age: {type: String, required: true},
    sortOrder: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('AgeRange', ageRangeSchema);
