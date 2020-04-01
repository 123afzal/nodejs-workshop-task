const Sequelize = require('sequelize');
const dbContext = new Sequelize(process.env.DB_NAME, process.env.DB_HOST, process.env.DB_PASS, {
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
