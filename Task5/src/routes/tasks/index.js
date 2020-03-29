const router = require('express').Router();
const controller = require('../../controllers/tasks.controller');

router.get('/', controller.getRecord);
router.get('/:id', controller.getRecordById);
router.post('/search', controller.searchRecord);
router.post('/', controller.postRecord);
router.put('/', controller.putRecord);
router.delete('/:id', controller.deleteRecord);

module.exports = router;
