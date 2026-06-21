from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from PIL import Image
import io
import logging

from app.models.animal_classifier import AnimalClassifier
from app.services.animal_service import AnimalService

router = APIRouter()
logger = logging.getLogger(__name__)

# Initialize services
classifier = AnimalClassifier()
animal_service = AnimalService()

@router.post("/image")
async def identify_animal_by_image(file: UploadFile = File(...)):
    """
    Identify animal from uploaded image
    
    Upload an image and get complete animal information
    """
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(400, "File must be an image")
        
        logger.info(f"Processing image: {file.filename}")
        
        # Read and process image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Classify the animal
        classification_result = await classifier.classify_image(image)
        animal_name = classification_result['animal_name']
        
        logger.info(f"Identified animal: {animal_name}")
        
        # Get comprehensive information
        animal_details = await animal_service.get_animal_details(animal_name)
        protection_info = await animal_service.get_protection_info(animal_name)
        medical_info = await animal_service.get_medical_info(animal_name)
        
        # Combine all information
        response = {
            "success": True,
            "identification": classification_result,
            "details": animal_details,
            "protection": protection_info,
            "medical": medical_info
        }
        
        return JSONResponse(content=response)
        
    except Exception as e:
        logger.error(f"Error identifying animal: {e}")
        raise HTTPException(500, f"Error processing image: {str(e)}")

@router.get("/test")
async def test_endpoint():
    """Test endpoint to verify the route is working"""
    return {"message": "Identify route is working!"}