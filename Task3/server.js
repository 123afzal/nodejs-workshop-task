const app = require('express')();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require('./routes')(app);

app.listen(4000, () => {
    console.log("Server is up on port", 4000)
});

