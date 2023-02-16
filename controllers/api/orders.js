const Order = require('../../models/order');
// const Item = require('../../models/item');

module.exports = {
  cart,
  addToCart,
  setTaskQtyInCart,
  checkout,
  delete: deleteTask
};


// A cart is the unpaid order for a user
async function cart(req, res) {
  const cart = await Order.getCart(req.user._id);
  res.json(cart);
}

// Add an item to the cart
async function addToCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  // The promise resolves to the document, which we already have
  // in the cart variable, so no need to create another variable...
  await cart.addTaskToCart(req.params.id); 
  res.json(cart);
}

// Updates an item's qty in the cart
async function setTaskQtyInCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.setTaskQty(req.body.taskId, req.body.newQty);
  res.json(cart)
}

// Update the cart's isDone property to true
async function checkout(req, res) {
const cart = await Order.getCart(req.user._id);
cart.isDone = true;
await cart.save();
res.json(cart);
}

async function deleteTask(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.removeTaskFromCart(req.params.id); 
  res.json(cart);
}
