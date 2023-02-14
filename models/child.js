const Schema = require('mongoose').Schema;

const childSchema = new Schema({
    name: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
}, {
  timestamps: true
});

module.exports = childSchema;