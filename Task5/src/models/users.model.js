const dbContext = require('../common/dbContext.js');
const Sequelize = require('sequelize');
const role = require('../models/roles.model');


const users = dbContext.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        name: {
            type: Sequelize.STRING,
            field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        role_id: {
            type: Sequelize.INTEGER,
            field: 'role_id',
            references: {
                // This is a reference to another model
                model: role,

                // This is the column name of the referenced model
                key: 'id',
            }
        },
    },
    {
        freezeTableName: true // Model tableName will be the same as the model name
    }
);

module.exports = users;
