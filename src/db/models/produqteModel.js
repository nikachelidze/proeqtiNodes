const { DataTypes } = require('sequelize');
const { Model } = require('sequelize');

class produqti extends Model{
    static init (conection){
        super.init({
            dasaxeleba: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            fasi: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            mdgomareoba: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            zoma: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            statusi: {
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
            tableName:'produqtis',
            timestamps: true
        });
    }
}