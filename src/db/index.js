const signale = require('signale')
const { Sequelize } = require('sequelize');
const process = require('process');


const momxmarebeli = require('./models/momxmarebeliModel');
const prduqti = require('./models/produqteModel');
const produqtistipi = require('./models/produqtisTipiModel');

const models = [momxmarebeli, prduqti, produqtistipi];

const conection = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_MOMXMAREBELI,
    process.env.DATABASE_PAROLI,
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    }
);

(async () =>{
    try{
        await conection.authenticate();
        signale.success('DB:Conection: successful');
    }catch (error) {
        signale.error('DB:Conection: Error:', error);
    }
})()

models.map((m) => m.init(conection));

momxmarebeli.hasMany(prduqti,{
    foreignKey:{
        name: 'subid',
        allowNull: false
    }
});
prduqti.belongsTo(momxmarebeli, {
    foreignKey:{
        name:'subid',
        allowNull: false
    }
});

prduqti.hasMany(produqtistipi, {
    foreignKey:{
        name: 'subid',
        allowNull: false
    }
});
produqtistipi.belongsTo(prduqti, {
    foreignKey:{
        name: 'subid',
        allowNull: false
    }
});

(async () =>{
    await Promise.all(models.map((m) => m.sync({
        forse: false
    })));
})();


module.exports = conection