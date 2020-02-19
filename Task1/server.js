const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req,res) => {
	const file = fs.readFileSync('text.txt','utf8');
	res.send(file);
})

app.listen(4000, () => {
    console.log("Server is up on port", 4000)
});

module.exports = app;

