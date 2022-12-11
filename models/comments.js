const { DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../db/mysql')
class Comments extends Model {}
Comments.init({
        ID:{
            type: DataTypes.INTEGER,
            field : 'ID'
        },
        Tweet_Id: {
            type: DataTypes.STRING,
            field : 'Tweet_Id'
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
        modelName: 'Comments',
        tableName: 'comments',
        sequelize,
    })

module.exports = Comments


