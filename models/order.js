const mongoose = require('mongoose')
const Schema = mongoose.Schema
const taskSchema = require('./taskSchema')

const lineItemSchema = new Schema({
    qty: {
        type: Number,
        default: 1
    },
    task: taskSchema
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

lineItemSchema.virtual('extPrice').get(function() {
    return this.qty * this.task.points
})

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    lineItems: [lineItemSchema],
    isPaid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

orderSchema.virtual('orderTotal').get(function() {
    return this.lineItems.reduce((total, task) => total + task.extPrice, 0)
})

orderSchema.virtual('totalQty').get(function() {
    return this.lineItems.reduce((total, task) => total + task.qty, 0)
})

orderSchema.virtual('orderId').get(function() {
    return this.id.slice(-6).toUpperCase()
})

orderSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
        { user: userId, isPaid: false },
        { user: userId },
        { upsert: true, new: true }
    )
}

orderSchema.methods.addItemToCart = async function(taskId) {
    const cart = this
    const lineItem = cart.lineItems.find(lineItem => lineItem.task._id.equals(itemId))
    if (lineItem) {
        lineItem.qty += 1
    } else {
        const task = await mongoose.model('Task').findById(taskId)
        cart.lineItems.push({ task })
    }
    return cart.save()
}

orderSchema.methods.setTaskQty = function(taskId, newQty) {
    // this keyword is bound to the cart (order doc)
    const cart = this;
    // Find the line item in the cart for the menu item
    const lineItem = cart.lineItems.find(lineItem => lineItem.task._id.equals(taskId));
    if (lineItem && newQty <= 0) {
      // Calling remove, removes itself from the cart.lineItems array
      lineItem.remove();
    } else if (lineItem) {
      // Set the new qty - positive value is assured thanks to prev if
      lineItem.qty = newQty;
    }
    // return the save() method's promise
    return cart.save();
  };

module.exports = mongoose.model('Order', orderSchema)