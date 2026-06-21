from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import logging

from app.services.animal_service import AnimalService

router = APIRouter()
logger = logging.getLogger(__name__)

animal_service = AnimalService()

@router.get("/")
async def search_animals(
    q: str = Query(..., min_length=2, description="Search query"),
    limit: int = Query(10, ge=1, le=50, description="Number of results")
):
    """
    Search animals by name
    
    Example: /api/v1/search?q=lion&limit=10
    """
    try:
        logger.info(f"Searching for: {q}")
        
        results = await animal_service.search_animals(q)
        
        # Limit results
        results = results[:limit]
        
        return {
            "success": True,
            "query": q,
            "count": len(results),
            "results": results
        }
        
    except Exception as e:
        logger.error(f"Error searching animals: {e}")
        raise HTTPException(500, f"Search error: {str(e)}")

@router.get("/details/{animal_name}")
async def get_animal_details(animal_name: str):
    """
    Get complete details about a specific animal
    
    Example: /api/v1/search/details/lion
    """
    try:
        logger.info(f"Fetching details for: {animal_name}")
        
        # Get all information
        details = await animal_service.get_animal_details(animal_name)
        protection = await animal_service.get_protection_info(animal_name)
        medical = await animal_service.get_medical_info(animal_name)
        
        return {
            "success": True,
            "animal": animal_name,
            "details": details,
            "protection": protection,
            "medical": medical
        }
        
    except Exception as e:
        logger.error(f"Error fetching animal details: {e}")
        raise HTTPException(500, f"Error: {str(e)}")

@router.get("/test")
async def test_endpoint():
    """Test endpoint"""
    return {"message": "Search route is working!"}