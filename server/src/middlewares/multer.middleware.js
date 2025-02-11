import fs from 'fs';
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/temp';
        // Check if directory exists
        if (!fs.existsSync(dir)) {
            // Create directory if it doesn't exist
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 159);
        cb(null, file.originalname + '-' + uniqueSuffix);
    }
});

export const upload = multer({ storage });
