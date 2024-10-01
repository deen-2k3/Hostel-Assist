import { storage } from '../config/cloudinary.js'; // Import the named export 'storage'
import multer from 'multer';

const upload = multer({ storage });

export default upload;
