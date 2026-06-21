import axios from 'axios';
import FormData from 'form-data';

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';

class AnimalController {
    
    async identifyByImage(req, res, next) {
        try {
            const logger = req.app.locals.logger;
            
            if (!req.file) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'No image file provided' 
                });
            }
            
            logger.info('Processing image identification...');
            
            // Create form data for Python service
            const formData = new FormData();
            formData.append('file', req.file.buffer, {
                filename: req.file.originalname,
                contentType: req.file.mimetype
            });
            
            // Forward to Python service
            const response = await axios.post(
                `${PYTHON_SERVICE_URL}/api/v1/identify/image`,
                formData,
                {
                    headers: formData.getHeaders(),
                    timeout: 30000
                }
            );
            
            logger.info('Image processed successfully');
            res.json(response.data);
            
        } catch (error) {
            next(error);
        }
    }
    
    async search(req, res, next) {
        try {
            const { q, limit = 10 } = req.query;
            const cache = req.app.locals.cache;
            
            if (!q) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Query parameter "q" is required' 
                });
            }
            
            // Check cache
            const cacheKey = `search:${q}:${limit}`;
            const cached = cache.get(cacheKey);
            
            if (cached) {
                return res.json(cached);
            }
            
            // Fetch from Python service
            const response = await axios.get(
                `${PYTHON_SERVICE_URL}/api/v1/search`,
                { params: { q, limit } }
            );
            
            // Cache for 30 minutes
            cache.set(cacheKey, response.data, 1800);
            
            res.json(response.data);
            
        } catch (error) {
            next(error);
        }
    }
    
    async getAnimalDetails(req, res, next) {
        try {
            const { name } = req.params;
            const cache = req.app.locals.cache;
            
            // Check cache
            const cacheKey = `animal:${name}`;
            const cached = cache.get(cacheKey);
            
            if (cached) {
                return res.json(cached);
            }
            
            // Fetch from Python service
            const response = await axios.get(
                `${PYTHON_SERVICE_URL}/api/v1/search/details/${name}`
            );
            
            // Cache for 1 hour
            cache.set(cacheKey, response.data, 3600);
            
            res.json(response.data);
            
        } catch (error) {
            next(error);
        }
    }
}

export default new AnimalController();