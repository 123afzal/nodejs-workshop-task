const multer = require('multer');
const path = require('path');
const mimeMap = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};
const mediaStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, (path.join(__dirname+'./../../uploads/user')));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.${mimeMap[file.mimetype]}`)
    }
});

const media = multer({storage: mediaStorage});

module.exports = {
    media
};
