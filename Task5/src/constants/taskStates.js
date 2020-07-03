const states = {
  new: 'new',
  inProgress: 'inProgress',
  canceled: 'canceled',
  completed: 'completed'
};

const stateHirarchy = {
  new: [states.inProgress],
  inProgress: [states.canceled, states.completed],
  canceled: [states.new],
  completed: [states.new]
};

module.exports = { states, stateHirarchy };
