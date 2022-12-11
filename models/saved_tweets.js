const { DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../db/mysql')
class Saved_tweets extends Model {}
Saved_tweets.init({
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
        modelName: 'Saved_tweets',
        tableName: 'saved_tweets',
        sequelize,
    })

module.exports = Saved_tweets


