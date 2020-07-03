const users = require('../models/users.model');
const Sequelize = require('sequelize');
const dbContext = require('../common/dbContext.js');


async function findAll() {
    return await users.findAll({});
}

async function find(searchBy = {}) {
    return await users.findAll({where: searchBy});
}

async function findOne(name) {
    const users = await users.find(u => u.name === name);
    if (!users.length) {
        throw new Error('users not found');
    }
    return users;
}

async function findAllUsersWithPermissions() {
    return dbContext.query("SELECT * FROM user_role_permissions", { type: Sequelize.QueryTypes.SELECT})
        .then(users => {
            return users
        }).catch(e => e)
}

async function insert(user) {
    return dbContext
        .query('CALL create_user (:name, :id, :role_name)',
            {replacements: { name: user.name, id: user.role_id, role_name: user.role_name, }})
        .then((v)=> {
            return 'User created with role successfully'
        })
        .catch((e) => {
            console.log(e)
        })
}

async function assignPermissionToRole(data) {
    return dbContext
        .query('CALL assign_permission_to_role (:role_id, :permission_id, :permission_name)',
            {replacements: { role_id: data.role_id, permission_id: data.permission_id, permission_name: data.permission_name, }})
        .then((v)=> {
            return 'permission assigned to role successfully'
        })
        .catch((e) => {
            return e;
        })
}

async function update(users) {
}

async function deleteById(id) {
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
    update,
    assignPermissionToRole,
    findAllUsersWithPermissions
};
