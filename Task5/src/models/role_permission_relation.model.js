const dbContext = require('../common/dbContext.js');
const Sequelize = require('sequelize');

const role = require('../models/roles.model');
const permissions = require('../models/permissions.model');

const role_permission_relation = dbContext.define(
    'role_permission_relation',
    {
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
        permission_id: {
            type: Sequelize.INTEGER,
            field: 'permission_id',
            references: {
                // This is a reference to another model
                model: permissions,

                // This is the column name of the referenced model
                key: 'id',
            }
        }
    },
    {
        freezeTableName: true // Model tableName will be the same as the model name
    }
);

module.exports = role_permission_relation;
