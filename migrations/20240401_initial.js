const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

async function up() {
    await sequelize.getQueryInterface().createTable('Items', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
}

async function down() {
    await sequelize.getQueryInterface().dropTable('Items');
}

module.exports = { up, down };