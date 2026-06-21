import aiohttp
import logging
from typing import Dict, List
import asyncio

logger = logging.getLogger(__name__)

class AnimalService:
    """Service for fetching animal information"""
    
    def __init__(self):
        self.wikipedia_api = "https://en.wikipedia.org/api/rest_v1"
    
    async def get_animal_details(self, animal_name: str) -> Dict:
        """Get comprehensive details about an animal"""
        try:
            # Fetch from Wikipedia
            wiki_data = await self._fetch_wikipedia_data(animal_name)
            
            details = {
                "name": animal_name,
                "description": wiki_data.get("extract", f"Information about {animal_name}"),
                "summary": wiki_data.get("extract", ""),
                "thumbnail": wiki_data.get("thumbnail", {}).get("source", ""),
                "page_url": f"https://en.wikipedia.org/wiki/{animal_name.replace(' ', '_')}"
            }
            
            return details
            
        except Exception as e:
            logger.error(f"Error fetching animal details: {e}")
            return {
                "name": animal_name,
                "description": f"A {animal_name} is a fascinating animal.",
                "summary": "Information currently unavailable."
            }
    
    async def _fetch_wikipedia_data(self, animal_name: str) -> Dict:
        """Fetch data from Wikipedia API"""
        try:
            async with aiohttp.ClientSession() as session:
                url = f"{self.wikipedia_api}/page/summary/{animal_name}"
                async with session.get(url, timeout=10) as response:
                    if response.status == 200:
                        return await response.json()
                    return {}
        except Exception as e:
            logger.error(f"Wikipedia API error: {e}")
            return {}
    
    async def get_protection_info(self, animal_name: str) -> Dict:
        """Get safety and protection information"""
        
        # General safety guidelines
        protection_info = {
            "danger_level": "Moderate",
            "safe_distance": "10-15 meters recommended",
            "warnings": [
                "Never approach wild animals suddenly",
                "Do not feed wild animals",
                "Keep children and pets at a safe distance",
                "Observe from a distance"
            ],
            "what_to_do": [
                "Stay calm and quiet",
                "Back away slowly if too close",
                "Give the animal an escape route",
                "Make yourself appear larger if threatened"
            ],
            "what_not_to_do": [
                "Don't run away quickly",
                "Don't make sudden movements",
                "Don't corner the animal",
                "Don't make loud noises"
            ]
        }
        
        # Specific overrides for dangerous animals
        dangerous_animals = {
            "lion": {"danger_level": "Very High", "safe_distance": "50+ meters"},
            "tiger": {"danger_level": "Very High", "safe_distance": "50+ meters"},
            "bear": {"danger_level": "High", "safe_distance": "30+ meters"},
            "shark": {"danger_level": "High", "safe_distance": "Stay out of water"},
            "snake": {"danger_level": "High", "safe_distance": "2+ meters"},
        }
        
        if animal_name.lower() in dangerous_animals:
            protection_info.update(dangerous_animals[animal_name.lower()])
        
        return protection_info
    
    async def get_medical_info(self, animal_name: str) -> Dict:
        """Get medical information for bites/attacks"""
        
        return {
            "emergency_steps": [
                "Move to a safe location away from the animal",
                "Call emergency services immediately (911 or local emergency number)",
                "Do not try to capture or kill the animal",
                "Take a photo of the animal if safe to do so"
            ],
            "first_aid": {
                "for_bites": [
                    "Clean wound with soap and water",
                    "Apply pressure to stop bleeding",
                    "Cover with clean bandage",
                    "Keep injured area still and below heart level"
                ],
                "for_scratches": [
                    "Wash thoroughly with soap and water for 5 minutes",
                    "Apply antibiotic ointment",
                    "Cover with sterile bandage",
                    "Monitor for signs of infection"
                ]
            },
            "seek_medical_attention": [
                "All animal bites should be evaluated by a doctor",
                "Rabies vaccination may be necessary",
                "Tetanus shot may be required",
                "Antibiotics may be prescribed"
            ],
            "warning_signs": [
                "Excessive bleeding",
                "Signs of infection (redness, swelling, pus, warmth)",
                "Fever or chills",
                "Difficulty breathing",
                "Numbness or tingling (may indicate venom)"
            ],
            "emergency_contacts": {
                "emergency": "911",
                "poison_control": "1-800-222-1222 (US)",
                "non_emergency": "Call your local hospital or doctor"
            }
        }
    
    async def search_animals(self, query: str) -> List[Dict]:
        """Search for animals by name"""
        
        # Sample database for demo
        animals_database = [
            {"name": "Lion", "scientific_name": "Panthera leo", "category": "Mammals"},
            {"name": "Tiger", "scientific_name": "Panthera tigris", "category": "Mammals"},
            {"name": "Elephant", "scientific_name": "Loxodonta", "category": "Mammals"},
            {"name": "Eagle", "scientific_name": "Aquila", "category": "Birds"},
            {"name": "Shark", "scientific_name": "Selachimorpha", "category": "Fish"},
            {"name": "Snake", "scientific_name": "Serpentes", "category": "Reptiles"},
            {"name": "Wolf", "scientific_name": "Canis lupus", "category": "Mammals"},
            {"name": "Bear", "scientific_name": "Ursidae", "category": "Mammals"},
            {"name": "Dolphin", "scientific_name": "Delphinidae", "category": "Mammals"},
            {"name": "Penguin", "scientific_name": "Spheniscidae", "category": "Birds"},
        ]
        
        # Filter results based on query
        results = [
            animal for animal in animals_database
            if query.lower() in animal["name"].lower() or 
               query.lower() in animal["scientific_name"].lower()
        ]
        
        return results