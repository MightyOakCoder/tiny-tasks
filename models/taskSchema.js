const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = new Schema({
  chore: {type: String, required: true},
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  points: {type: Number, required: true, default: 0}
}, {
  timestamps: true
});

module.exports = taskSchema;