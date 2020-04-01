const multer = require('multer');

const upload = multer({ dest: './../uploads/' });
const single = (req, res) => {
    console.log('abcd', req.file)
    upload.single('avatar');
};
module.exports = {
    single
};
