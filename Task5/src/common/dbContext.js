const Sequelize = require('sequelize');

const dbContext = new Sequelize('userPG', 'postgres', 'test123', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',

    define: {
        schema: 'public',
        timestamps: false // true by default
    },

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = dbContext;
