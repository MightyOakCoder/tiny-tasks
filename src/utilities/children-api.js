import sendRequest from './send-request';

const BASE_URL = '/api/orders';

// Retrieve an unpaid order for the logged in user
export function getList() {
  return sendRequest(`${BASE_URL}/list`);
}

// Add an item to the cart
export function addTaskToList(taskId) {
  // Just send itemId for best security (no pricing)
  return sendRequest(`${BASE_URL}/list/tasks/${taskId}`, 'POST');
}

// Update the item's qty in the cart
// Will add the item to the order if not currently in the cart
// Sending info via the data payload instead of a long URL
export function setTaskQtyInList(taskId, newQty) {
  return sendRequest(`${BASE_URL}/list/qty`, 'PUT', { taskId, newQty });
}

// Updates the order's (cart's) isPaid property to true
export function checkout() {
  // Changing data on the server, so make it a POST request
  return sendRequest(`${BASE_URL}/list/checkout`, 'POST');
}
