var router = require('express').Router();

// Routing the API calls to the correct handler
// Sending /user/new/:? to user/new.js
router.use('/user', router.use('/new', require('../../user/new.js')));
// Sending /user/new/:? to user/new.js
router.use('/user', router.use('/exists', require('../../user/exists.js')));
// Sending /user/verify/:? to user/verify.js
router.use('/user', router.use('/verify', require('../../user/verify.js')));

// Authentication
// Sending /ath/api/:? to auth/token.js
router.use('/auth', router.use('/token', require('../../auth/token.js')));

module.exports = router;
