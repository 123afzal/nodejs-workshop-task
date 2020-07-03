const express = require('express');
const fs = require('fs');
const path = require("path");
const router = express.Router();

// temporary data fetching from JSON, because there is no DB
const data  = JSON.parse(fs.readFileSync(path.join(__dirname  + './../books-model.json'), 'utf8'));
router.get('/', (req,res) => {
    res.send({
        books: data.books,
        code:200,
    })
});

router.get('/:id', (req,res) => {
    const id = +req.params.id;
    const book = data.books.find(book => book.id === id);
    res.send({
        book,
        code:200
    })
});

router.post('/', (req,res) => {
    let book = req.body;
    data.books.push(book);
    res.send({
        code:200,
        message:'Book inserted successfully'
    })
});

router.put('/auhtor/:id', (req,res) => {
    const id = +req.params.id;
    const author = req.query.author;
    const book = data.books.find(book => book.id === id);
    book.author = author;
    res.send({
        book,
        message: 'Book author updated Successfully',
        code: 200
    })
});

router.delete('/:id', (req,res) => {
    const id = +req.params.id;
    let copyOfBooks = data.books;
    data.books = data.books.filter(book => book.id === id);
    res.send({
        code: 200,
        message: copyOfBooks.length === data.books ?  `Book with the ${id} doesn't exists` : 'Delete successfully',
    })
});

module.exports = router;
