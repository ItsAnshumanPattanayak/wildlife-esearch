from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import logging

from app.routes import identify, search

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Wildlife eSearch - Python Service",
    description="Animal identification and information service",
    version="1.0.0"
)

# Enable CORS (allows frontend to communicate with backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(identify.router, prefix="/api/v1/identify", tags=["Identify"])
app.include_router(search.router, prefix="/api/v1/search", tags=["Search"])

@app.on_event("startup")
async def startup_event():
    """Runs when the application starts"""
    logger.info("🚀 Wildlife eSearch Python Service Starting...")
    logger.info("✅ Service ready!")

@app.get("/")
async def root():
    """Root endpoint - check if service is running"""
    return {
        "service": "Wildlife eSearch - Python Service",
        "status": "operational",
        "version": "1.0.0",
        "endpoints": {
            "identify_image": "/api/v1/identify/image",
            "search": "/api/v1/search",
            "animal_details": "/api/v1/search/details/{animal_name}"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )