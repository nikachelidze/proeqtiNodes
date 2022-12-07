const momxmarebeli = require('../db/models/momxmarebeliModel');

const process = require('process');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

router.post('/login', async(req, res, next) => {
    const{email, paroli} = req.body;

    const momxmarebeli = await momxmarebeli.findOne({
        where:{
            email,
            paroli
        }
    });

    if(momxmarebeli){
        const token = jwt.sign({
            id: momxmarebeli.id
        }, 
        process.env.secret,
        {
            expiresIn:'1h'
        }
        );

        return res.json({
            token,
        })
    }
    return res.json({
        message: 'user not found'
    });
})



module.exports = router;