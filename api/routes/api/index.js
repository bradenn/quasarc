var router = require('express').Router();

// Routing the API calls to the correct handler
// Sending /user/new/:? to user/new.js
router.use('/user', router.use('/new', require('../../user/new.js')));
// Sending /user/new/:? to user/new.js
router.use('/user', router.use('/exists', require('../../user/exists.js')));

module.exports = router;
