const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Define the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Define the filename for uploaded files
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
