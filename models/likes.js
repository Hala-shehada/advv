const { DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../db/mysql')
class Likes extends Model {}
Likes.init({
        ID:{
            type: DataTypes.INTEGER,
            field : 'ID'
        },
        User_Id: {
            type: DataTypes.STRING,
            field : 'User_Id'
        },
        Tweet_Id: {
            type: DataTypes.STRING,
            field : 'Tweet_Id'
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        modelName: 'Likes',
        tableName: 'likes',
        sequelize,
    })

module.exports = Likes


