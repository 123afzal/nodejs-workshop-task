const tasks = require('../models/tasks.model');
const { states, stateHirarchy } = require('../constants/taskStates');

async function findAll() {
  return await tasks.findAll({});
}

async function find(searchBy = {}) {
  // const byId = searchBy.id;
  // const byTitle = searchBy.title;
  // const byDetails = searchBy.details;
  // const byDueDate = searchBy.dueDate;
  // const byState = searchBy.state;
  //
  // let task = tasks;
  // if (byId) task = task.filter(u => u.id == byId);
  // if (byTitle) task = task.filter(u => u.title == byTitle);
  // if (byDetails) task = task.filter(u => u.details == byDetails);
  // if (byDueDate) task = task.filter(u => u.dueDate == byDueDate);
  // if (byState) task = task.filter(u => u.state == byState);
  //
  // if (!task.length) {
  //   throw new Error('task not found');
  // }
  // return task;
  return await tasks.findAll({where: searchBy});
}

function findOne(name) {
  const task = tasks.find(u => u.name === name);
  if (!task.length) {
    throw new Error('task not found');
  }
  return task;
}

async function insert(task) {
  return await tasks.build(task).save();
}

function update(task) {
  const index = tasks.findIndex(u => u.id == task.id);
  if (task === -1) throw new Error('ID_NOT_FOUND');

  _validateState(tasks[index].state, task.state);

  tasks[index].title = task.title;
  tasks[index].details = task.details;
  tasks[index].dueDate = task.dueDate;
  tasks[index].state = task.state;

  return tasks[index];
}

function deleteById(id) {
  const delIdx = tasks.findIndex(u => u.id == id);
  if (delIdx === -1) throw new Error('ID_NOT_FOUND');
  tasks.splice(delIdx, 1);
  return tasks;
}

function _validateState(previousState, newState) {
  if (!states[newState]) throw new Error('STATE_NOT_FOUND');
  if (!states[previousState]) throw new Error('STATE_NOT_FOUND');

  if (stateHirarchy[previousState].findIndex(u => u == states[newState]) === -1)
    throw new Error('STATE_NOT_VALID');
}

module.exports = {
  deleteById,
  findAll,
  find,
  findOne,
  insert,
  update
};
