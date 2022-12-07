const MomxmarebeliRoutes = require('./momxmarebeliRoutes');
const PrductiRoutes = require('./produqtiRoutes');
const PrductisTipiRoutes = require('./produqtisTipiRoutes');
const AvtorizaciRoutes = require('./avtorizaciaRoutes');
const momxmarebeliController = require('../controllers/momxmarebeliController');

const router = require('express').Router();
const {body} = require('express-validator');
const authMiddlewre = require('../middleware/auth_Middlewre');

router.use('/auth', AvtorizaciRoutes);

router.use(checkAuth);

router.use('/momxmarebeli', MomxmarebeliRoutes);
router.use('/produqti', PrductiRoutes);
router.use('/produqtisTipi', PrductisTipiRoutes);

router.post('/registration',
    body('email').isEmail(),
    body('paroli').isLength({min: 3, max: 35}),
    momxmarebeliController.registration);
router.get('/login', momxmarebeliController.login);
router.get('/logout', momxmarebeliController.logout);
router.get('/activate/:link', momxmarebeliController.activate);
router.get('/refresh', momxmarebeliController.refresh);
router.get('/momxmarebeli', authMiddlewre, momxmarebeliController.getmomxmarebeli);

module.exports = router;
