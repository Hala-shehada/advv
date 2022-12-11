const { DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../db/mysql')
class Tweet extends Model {}
Tweet.init({
        ID:{
            type: DataTypes.INTEGER,
            field : 'ID'
        },
        Hashtag: {
            type: DataTypes.STRING,
            field : 'Hashtag'
        },
        Description: {
            type: DataTypes.STRING,
            field : 'Description'
        },
        Date: {
            type: DataTypes.STRING,
            field : 'Date'
        },
        User_Id:{
            type: DataTypes.INTEGER,
            field : 'User_Id'
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        modelName: 'Tweet',
        tableName: 'tweets',
        sequelize,
    })

module.exports = Tweet


