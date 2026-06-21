export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    const statusCode = err.response?.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            status: statusCode,
            timestamp: new Date().toISOString()
        }
    });
};