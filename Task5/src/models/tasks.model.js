// const { states } = require('../constants/taskStates');
//
// const tasks = [
//   {
//     id: 1,
//     title: 'task 1',
//     details: 'task 1 details',
//     dueDate: '2020/01/01',
//     state: states.completed
//   },
//   {
//     id: 2,
//     title: 'task 2',
//     details: 'task 2 details',
//     dueDate: '2020/01/01',
//     state: states.new
//   },
//   {
//     id: 3,
//     title: 'task 3',
//     details: 'task 3 details',
//     dueDate: '2020/01/01',
//     state: states.new
//   },
//   {
//     id: 4,
//     title: 'task 4',
//     details: 'task 4 details',
//     dueDate: '2020/01/01',
//     state: states.inProgress
//   }
// ];
//
// module.exports = tasks;
const dbContext = require('../common/dbContext.js');
const Sequelize = require('sequelize');

const tasks = dbContext.define(
    'tasks',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id' // Will result in an attribute that is firstName when user facing but first_name in the database
      },
      title: {
        type: Sequelize.STRING,
        field: 'title' // Will result in an attribute that is firstName when user facing but first_name in the database
      },
      details: {
        type: Sequelize.STRING,
        field: 'details'
      },
      dueDate: {
        type: Sequelize.DATE,
        field: 'duedate'
      },
      state: {
        type: Sequelize.STRING,
        field: 'state'
      }
    },
    {
      freezeTableName: true // Model tableName will be the same as the model name
    }
);

module.exports = tasks;
