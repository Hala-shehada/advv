const { DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../db/mysql')
class Followers extends Model {}
Followers.init({
        ID:{
            type: DataTypes.INTEGER,
            field : 'ID'
        },
        Followed_Id: {
            type: DataTypes.STRING,
            field : 'Followed_Id'
        },
        Follower_Id: {
            type: DataTypes.STRING,
            field : 'Follower_Id'
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        modelName: 'Followers',
        tableName: 'followers',
        sequelize,
    })

module.exports = Followers

