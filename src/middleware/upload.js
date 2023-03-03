/*import multer from 'multer';

// Create a disk storage engine with a destination and filename function
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  }
});

// Create a multer instance with the disk storage engine
const upload = multer({ storage: storage });

export default upload;


import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;



import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // 1 MB
});

*/

const multer = require('multer');

// define storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// create an instance of Multer with the storage configuration
const upload = multer({ storage: storage })

// use the Multer middleware in your server routes
app.post('/upload', upload.single('file'), (req, res) => {
  // handle the uploaded file here
});

export default upload

