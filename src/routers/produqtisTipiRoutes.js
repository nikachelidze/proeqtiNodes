const router = require('express').Router();

const Produqti = require('../db/models/produqtisTipiModel');

router.get('/', async (req, res) => {
    const result = await produqti.finAll({
        where:{
            washlatar: null
        }
    });
    return res.json({data: result});
});

module.exports = router;