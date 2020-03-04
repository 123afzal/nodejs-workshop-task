const express = require('express');
const books = require('./books');

const routes = (app) => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.send({
            success: true,
            message: "'Api's Working",
            code: 200
        })
    });

    // base routes '/books' will identify the routes of books model
    router.use('/books', books);

    // /api will use with every request of every model
    app.use('/api', router);
};



module.exports = routes;
