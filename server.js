const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Configure multer for handling image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

app.use(bodyParser.json());
app.use(express.static('public'));

// Route for image upload
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded.' });
    }
    console.log('Image uploaded:', req.file.path);
    res.json({ message: 'Image uploaded successfully!', filePath: req.file.path });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
