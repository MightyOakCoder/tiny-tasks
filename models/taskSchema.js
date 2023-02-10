const Schema = require('mongoose').Schema;

const taskSchema = new Schema({
  task: {type: String, required: true},
  ageRange: {type: Schema.Types.ObjectId, ref: 'AgeRange'},
  points: {type: Number, required: true, default: 0}
}, {
  timestamps: true
});

module.exports = itemSchema;