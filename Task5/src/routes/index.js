const router = require('express').Router();
const apiRoutes = require('./tasks');
const apiUserRoutes = require('./users');

router.get('/', (req, res) => {
  res.send('hello world');
});

router.use('/api/tasks', apiRoutes);
router.use('/api/users', apiUserRoutes);

module.exports = router;
