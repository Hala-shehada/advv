const { DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../db/mysql')
class Hidden_tweets extends Model {}
Hidden_tweets.init({
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
        modelName: 'Hidden_tweets',
        tableName: 'hidden_tweets',
        sequelize,
    })

module.exports = Hidden_tweets


