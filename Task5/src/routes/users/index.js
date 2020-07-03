const router = require('express').Router();
const controller = require('../../controllers/users.controller');

router.get('/', controller.users);
router.get('/getUsersWithPermissions', controller.getUsersWithPermissions);
router.get('/:id', controller.getUserById);
router.post('/', controller.createUser);
router.post('/assignPermissionToRole', controller.assignPermissionToRole);
router.delete('/:id', controller.deleteUser);

module.exports = router;
