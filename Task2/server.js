const {request} = require('./utilities/httpRequestHandler');
const app = require('express')();

app.get('/', (req,res) => {
    request('get','/films')
        .then((response) => {
            response.data.results.forEach((item, index) => {
                console.log(`Movie Title : ${item.title}`)
            })
        }).catch((e) => console.log('Error : ', e))
});

app.get('/film', (req,res) => {
    request('get','/films/?search=The%20Phantom%20Menace&format=json')
        .then((response) => {
            response.data.results.forEach((item, index) => {
                console.log(`Movie Title : ${item.title}`)
            })
        }).catch((e) => console.log('Error : ', e))
});

app.listen(4000, () => {
    console.log("Server is up on port", 4000)
});

