const Sequelize = require('sequelize')
const sequelize = require('../db/mysql')

const users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },name: {
        type: Sequelize.STRING,
        field: 'Fullname',
        allowNull: false
    },Password: {
        type: Sequelize.STRING,
        field: 'Password',
        allowNull: false
    }, Birthday: {
        type: Sequelize.STRING,
        field: 'Birthday',
        allowNull: false
    },username:{
        type: Sequelize.STRING,
        field: 'Username',
        allowNull: false
    },Address:{
        type: Sequelize.STRING,
        field: 'Address',
        allowNull: false
    }
}, { freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,}
)

module.exports = users