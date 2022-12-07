const router = require('express').Router();

const Produqti = require('../db/models/produqteModel');

router.get('/', async (req, res) => {
    const result = await produqti.finAll({
        attributes:['dasaxeleba','fasi','zoma','mdgomareoba'],
        where:{
            washlatar: null
        }
    });

    return res.json({data: result});
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;

    const prduct = await Produqti.findByPk(id);

    if (!prduct || prduct.washlatar !== null){
        return req.json({
            message:'product not found' 
        });
        await prduct.ubdate({
            washlatar: new Date(),
            where: {
                id: id
            }
        })
    }
    
})

module.exports = router;