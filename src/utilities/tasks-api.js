import sendRequest from './send-request';

const BASE_URL = '/api/tasks';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function createTaskList() {
  return sendRequest(BASE_URL);
}

export function newTask(payload) {
  return sendRequest(BASE_URL, "POST", payload);
}

// export function deleteTask(payload) {
//   return sendRequest(BASE_URL, 'DELETE', payload);
// }