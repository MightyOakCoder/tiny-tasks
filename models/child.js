const Schema = require('mongoose').Schema;

const childSchema = new Schema({
    name: {type: String, required: true},
    ageRange: {type: Schema.Types.ObjectId, ref: 'AgeRange'}
}, {
  timestamps: true
});

module.exports = childSchema;