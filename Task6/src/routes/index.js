const router = require('express').Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: '',
  from: 'test@example.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

const multer = require('multer');
const mimeMap = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.${mimeMap[file.mimetype]}`)
  }
});
var upload = multer({storage: storage});
const apiRoutes = require('./tasks');
const apiUserRoutes = require('./users');

router.get('/', (req, res) => {
  res.send('hello world');
});
router.post('/upload', upload.single('avatar'), (req,res) => {
  if(req.file) {
    msg.to = req.body.email;
    console.log(msg);
    sgMail.send(msg)
    res.send(`${req.file.originalname} uploaded successfully`)
  } else {
    res.status(400).send('File is not present')
  }
});

router.use('/api/tasks', apiRoutes);
router.use('/api/users', apiUserRoutes);

module.exports = router;
