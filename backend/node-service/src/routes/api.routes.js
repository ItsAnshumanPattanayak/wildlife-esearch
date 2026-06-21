import express from 'express';
import multer from 'multer';
import animalController from '../controllers/animal.controller.js';

const router = express.Router();

// Configure file upload
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files allowed'), false);
        }
    }
});

// Animal identification
router.post(
    '/identify/image',
    upload.single('image'),
    animalController.identifyByImage
);

// Search
router.get('/search', animalController.search);

// Animal details
router.get('/animal/:name', animalController.getAnimalDetails);

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'API routes working!' });
});

export default router;