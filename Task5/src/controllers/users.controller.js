const service = require('../service/users.service');

async function users(req, res) {
    const isEmpty = obj => Object.keys(obj).length <= 0;
    if (!isEmpty(req.query)) {
        res.status(200).send(await service.find(req.query));
        return;
    }
    res.status(200).send(await service.findAll());
}

async function getUsersWithPermissions(req, res) {
    res.status(200).send(await service.findAllUsersWithPermissions());
}

async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const task = await service.find({ id });
        res.send(task);
    } catch (e) {
        res.status(400).send(e.message);
    }
    res.send();
}

async function searchRecord(req, res) {
    try {
        const task = req.body;
        console.log(task);
        res.send(await service.find(task));
    } catch (e) {
        res.status(400).send(e.message);
    }
    res.send();
}

async function createUser(req, res) {
    const {name, role_id, role_name} = req.body;
    if (!name || typeof name !== 'string')
        return res.status(400).send('name is required and must be of type string');
    if (!role_id || typeof role_id !== 'number')
        return res.status(400).send('role_id is required and must be of type number');
    if (!role_name || typeof role_name !== 'string')
        return res.status(400).send('role_name is required must be of type number');
    const record = await service.assignPermissionToRole(req.body);
    res.status(201).send(record);

    res.send();
}

async function assignPermissionToRole(req,res) {
    const {permission_name, role_id, permission_id} = req.body;
    if (!permission_name || typeof permission_name !== 'string')
        return res.status(400).send('name is required and must be of type string');
    if (!role_id || typeof role_id !== 'number')
        return res.status(400).send('role_id is required and must be of type number');
    if (!permission_id || typeof permission_id !== 'number')
        return res.status(400).send('permission_id is required and must be of type number');
    const record = await service.assignPermissionToRole(req.body);
    console.log('record',record);
    res.status(201).send(record);

    res.send();
}

function putRecord(req, res) {
    const task = req.body;
    const record = service.update(task);
    res.status(201).send(record);

    res.send();
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const tasks = await service.deleteById(id);
        res.status(400).send(tasks);
    } catch (e) {
        if (e.message === 'ID_NOT_FOUND') {
            res.status(400).send('invalid task id');
            return;
        }
        res.status(400).send(e.message);
    }
}

module.exports = {
    users,
    getUserById,
    searchRecord,
    createUser,
    deleteUser,
    putRecord,
    assignPermissionToRole,
    getUsersWithPermissions
};
