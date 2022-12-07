const sequelizeConnection = require('../index')
const { DataTypes, Model } = require('sequelize')

class momxmarebeli extends Model{
    static init (conection){
        super.init({
            saxeli:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            gvari:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            email:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            tel:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            isAdmin:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            paroli:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            sheqmnistar:{
                type: DataTypes.DATE,
                allowNull: false
            },
            ganaxlebistar:{
                type: DataTypes.DATE,
                allowNull: true
            },
            washlatar:{
                type: DataTypes.DATE,
                allowNull: true
            },
            asActivated:{
                type: DataTypes.bool,
                allowNull: true
            
            },
            activationLink:{
                type: DataTypes.DATE,
                allowNull: true
            }
        },{
            sequelize: conection,
            freezeTableName: true,
            tableName:'momxmarebelis',
            timestamps: true
        })
    }
} 
Model.exports = momxmarebeli;     
    