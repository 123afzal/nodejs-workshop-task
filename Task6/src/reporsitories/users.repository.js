const users = require('../models/users.model');
const permissions = require('../models/permissions.model');
const role_permission_relation = require('../models/role_permission_relation.model');
const role = require('../models/roles.model');

// role.hasMany(users, {
//     foreignKey: 'role_id'
// });
users.belongsTo(role, {
    foreignKey: 'role_id'
});

role_permission_relation.belongsTo(role, {
    foreignKey: 'role_id'
});
role_permission_relation.belongsTo(permissions, {
    foreignKey: 'permission_id'
});
const dbContext = require('../common/dbContext.js');


async function findAll(options) {
    return await users.findAll(options);
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
    const user = await users.findAll({
        attributes:['name'],
        where: {id:1},
        include:[{model: role}],
    }).map(el => el.get({ plain: true }));

    const pemissions = await role_permission_relation.findAll({
        where:{role_id:user[0].role.id},
        include:[{model: permissions}]
    }).map(el => el.get({ plain: true }));

    return {
        name: user[0].name,
        role: user[0].role.name,
        permission: pemissions[0].permission.name
    }

    // we can call view from here as well for getting the desired result

    // return dbContext.query("SELECT * FROM user_role_permissions", { type: Sequelize.QueryTypes.SELECT})
    //     .then(users => {
    //         return users
    //     }).catch(e => e)
}

async function insert(user) {
    return dbContext
        .query('CALL create_user (:name, :id, :role_name, :gender, :dob, :imageUrl)',
            {
                replacements: {
                    name: user.name,
                    id: user.role_id,
                    role_name: user.role_name,
                    gender: user.gender,
                    dob: user.dob,
                    imageUrl: user.imageUrl ? user.imageUrl : null
                }
            })
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
