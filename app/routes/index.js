var router = require('express').Router();

// Routing the API calls to the correct handler
// Sending /user/new/:? to user/new.js
router.use('/user', require('../user/'));
// Sending /user/new/:? to user/new.js
router.use('/user', router.use('/exists', require('../user/exists.js')));
// Sending /user/get/:? to user/get.js
router.use('/user/get', require('../user/get.js'));

// Sending /people/get/:? to people/get.js
router.use('/people', router.use('/query', require('../people/get.js')));

// Authentication
// Sending /ath/api/:? to auth/token.js
router.use('/auth', router.use('/token', require('../auth/token.js')));

module.exports = router;
