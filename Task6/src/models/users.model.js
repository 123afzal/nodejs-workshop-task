const dbContext = require('../common/dbContext.js');
const Sequelize = require('sequelize');
const moment = require('moment');
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
        gender: {
            type: Sequelize.STRING,
            field: 'gender' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        dob: {
            type: Sequelize.DATEONLY,
        },
        imageurl: {
            type: Sequelize.STRING,
            field: 'imageurl' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
    },
    {
        freezeTableName: true // Model tableName will be the same as the model name
    }
);


module.exports = users;
