const router = require('express').Router();
const apiRoutes = require('./api/workout-routes');
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;