const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');

class produqtistipi extends Model{
    static init (conection){
        super.init({
            dasaxeleba: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            washlis:{
                type: DataTypes.DATE,
                allowNull: true 
            }
        },{
            sequelize: conection,
            freezeTableName: true,
            tableName:'produqtistipis',
            timestamps: true
        });
    }
}