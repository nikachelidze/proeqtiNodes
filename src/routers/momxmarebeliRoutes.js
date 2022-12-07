const Router = require('express').Router();
const momxmarebelicontroller = require('../controllers/momxmarebeliController');
const router = new Router();


router.post( '/registration', momxmarebelicontroller.registration);



module.exports = router;