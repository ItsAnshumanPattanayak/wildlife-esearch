import aiohttp
import logging
from typing import Dict, List, Optional
import json
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

logger = logging.getLogger(__name__)

class AnimalService:
    """Service for fetching and managing animal data"""
    
    def __init__(self):
        self.mongo_client = None
        self.db = None
        self.cache = {}
        
        # API URLs
        self.wiki_api_base = "https://en.wikipedia.org/api/rest_v1"
        
    async def initialize(self):
        """Initialize database connections"""
        try:
            mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
            self.mongo_client = AsyncIOMotorClient(mongo_uri)
            self.db = self.mongo_client.wildlife_db
            logger.info("Database connection established")
        except Exception as e:
            logger.error(f"Database initialization error: {e}")
            # Continue without database
    
    async def close(self):
        """Close database connections"""
        if self.mongo_client:
            self.mongo_client.close()
    
    async def get_animal_details(self, animal_name: str) -> Dict:
        """Get comprehensive details about an animal"""
        try:
            # Check cache first
            if animal_name in self.cache:
                return self.cache[animal_name]
            
            # Fetch from Wikipedia
            wiki_data = await self._fetch_wikipedia_data(animal_name)
            
            # Combine data
            details = {
                "name": animal_name,
                "scientific_name": self._get_scientific_name(animal_name),
                "common_names": [],
                "description": wiki_data.get("extract", f"Information about {animal_name}"),
                "conservation_status": self._get_conservation_status(animal_name),
                "habitat": self._get_habitat(animal_name),
                "diet": self._get_diet(animal_name),
                "weight": self._get_weight(animal_name),
                "length": self._get_length(animal_name),
                "lifespan": self._get_lifespan(animal_name),
                "distribution": self._get_distribution(animal_name),
                "social": self._get_social_behavior(animal_name),
                "activity": self._get_activity_pattern(animal_name),
                "page_url": f"https://en.wikipedia.org/wiki/{animal_name.replace(' ', '_')}",
                "updated_at": datetime.utcnow().isoformat()
            }
            
            # Cache the result
            self.cache[animal_name] = details
            
            return details
            
        except Exception as e:
            logger.error(f"Error fetching animal details: {e}")
            return self._get_fallback_data(animal_name)
    
    async def _fetch_wikipedia_data(self, animal_name: str) -> Dict:
        """Fetch data from Wikipedia API"""
        try:
            async with aiohttp.ClientSession() as session:
                url = f"{self.wiki_api_base}/page/summary/{animal_name}"
                async with session.get(url, timeout=10) as response:
                    if response.status == 200:
                        return await response.json()
                    return {}
        except Exception as e:
            logger.error(f"Wikipedia API error: {e}")
            return {}
    
    async def get_protection_info(self, animal_name: str) -> Dict:
        """Get information about protection from the animal"""
        
        # Specific danger levels for dangerous animals
        dangerous_animals = {
            "lion": {"danger_level": "Very High", "safe_distance": "50+ meters"},
            "tiger": {"danger_level": "Very High", "safe_distance": "50+ meters"},
            "bear": {"danger_level": "High", "safe_distance": "100+ meters"},
            "shark": {"danger_level": "High", "safe_distance": "Stay out of water if spotted"},
            "snake": {"danger_level": "High", "safe_distance": "2+ meters"},
            "crocodile": {"danger_level": "Very High", "safe_distance": "10+ meters from water's edge"},
            "elephant": {"danger_level": "High", "safe_distance": "50+ meters"},
            "hippo": {"danger_level": "Very High", "safe_distance": "30+ meters"},
            "buffalo": {"danger_level": "High", "safe_distance": "100+ meters"},
        }
        
        specific = dangerous_animals.get(animal_name.lower(), {})
        
        return {
            "danger_level": specific.get("danger_level", "Moderate"),
            "safe_distance": specific.get("safe_distance", "10-15 meters recommended"),
            "warnings": [
                "Do not approach if animal appears agitated",
                "Never feed wild animals",
                "Keep children and pets close",
                "Observe from a safe distance",
                "Never come between a mother and her young"
            ],
            "what_to_do": [
                "Remain calm and quiet",
                "Back away slowly",
                "Give the animal space and an escape route",
                "Make yourself appear larger if threatened",
                "Speak in a calm, firm voice"
            ],
            "what_not_to_do": [
                "Don't run away quickly",
                "Don't make sudden movements",
                "Don't corner the animal",
                "Don't make direct eye contact (for predators)",
                "Don't turn your back on the animal"
            ]
        }
    
    async def get_medical_info(self, animal_name: str) -> Dict:
        """Get medical information for bites/attacks"""
        return {
            "emergency_steps": [
                "Move away from the animal to a safe location",
                "Call emergency services immediately (911 or local emergency number)",
                "Do not try to capture or kill the animal",
                "Take a photo of the animal if safe to do so (for identification)"
            ],
            "first_aid": {
                "for_bites": [
                    "Clean wound with soap and water for at least 5 minutes",
                    "Apply pressure with clean cloth to stop bleeding",
                    "Cover with sterile bandage",
                    "Keep injured area still and below heart level if possible"
                ],
                "for_scratches": [
                    "Wash thoroughly with soap and water",
                    "Apply antibiotic ointment",
                    "Cover with clean, dry bandage",
                    "Monitor for signs of infection"
                ]
            },
            "seek_medical_attention": [
                "All animal bites should be evaluated by a doctor",
                "Rabies vaccination may be necessary for mammal bites",
                "Tetanus shot may be required",
                "Antibiotics may be prescribed to prevent infection"
            ],
            "warning_signs": [
                "Excessive bleeding that won't stop",
                "Signs of infection (redness, swelling, pus, warmth)",
                "Fever or chills",
                "Difficulty breathing",
                "Numbness or tingling around wound",
                "Red streaks extending from wound"
            ],
            "emergency_contacts": {
                "emergency": "911",
                "poison_control": "1-800-222-1222 (US)"
            }
        }
    
    async def get_animal_images(self, animal_name: str, limit: int = 8) -> List[Dict]:
        """
        Get images of the animal
        Using Unsplash as image source (free API)
        """
        try:
            images = []
            
            # For demo purposes, we're using Unsplash's random image endpoint
            # which doesn't require an API key but has limitations
            # In production, sign up at https://unsplash.com/developers
            
            for i in range(limit):
                images.append({
                    "url": f"https://source.unsplash.com/800x600/?{animal_name.replace(' ', '+')},wildlife&sig={i}",
                    "thumbnail": f"https://source.unsplash.com/400x300/?{animal_name.replace(' ', '+')},wildlife&sig={i}",
                    "photographer": "Unsplash Contributor",
                    "source": "Unsplash"
                })
            
            return images
            
        except Exception as e:
            logger.error(f"Error fetching images: {e}")
            return []
    
    async def search_animals(self, query: str) -> List[Dict]:
        """Search for animals by name"""
        try:
            # Sample database for demo
            animals_database = [
                {"name": "Lion", "scientific_name": "Panthera leo", "category": "Mammals"},
                {"name": "Tiger", "scientific_name": "Panthera tigris", "category": "Mammals"},
                {"name": "Leopard", "scientific_name": "Panthera pardus", "category": "Mammals"},
                {"name": "Cheetah", "scientific_name": "Acinonyx jubatus", "category": "Mammals"},
                {"name": "Elephant", "scientific_name": "Loxodonta", "category": "Mammals"},
                {"name": "Rhino", "scientific_name": "Rhinocerotidae", "category": "Mammals"},
                {"name": "Hippo", "scientific_name": "Hippopotamus amphibius", "category": "Mammals"},
                {"name": "Giraffe", "scientific_name": "Giraffa", "category": "Mammals"},
                {"name": "Eagle", "scientific_name": "Aquila", "category": "Birds"},
                {"name": "Owl", "scientific_name": "Strigiformes", "category": "Birds"},
                {"name": "Parrot", "scientific_name": "Psittaciformes", "category": "Birds"},
                {"name": "Peacock", "scientific_name": "Pavo cristatus", "category": "Birds"},
                {"name": "Penguin", "scientific_name": "Spheniscidae", "category": "Birds"},
                {"name": "Flamingo", "scientific_name": "Phoenicopterus", "category": "Birds"},
                {"name": "Shark", "scientific_name": "Selachimorpha", "category": "Fish"},
                {"name": "Whale", "scientific_name": "Cetacea", "category": "Mammals"},
                {"name": "Dolphin", "scientific_name": "Delphinidae", "category": "Mammals"},
                {"name": "Octopus", "scientific_name": "Octopoda", "category": "Mollusks"},
                {"name": "Snake", "scientific_name": "Serpentes", "category": "Reptiles"},
                {"name": "Crocodile", "scientific_name": "Crocodylidae", "category": "Reptiles"},
                {"name": "Turtle", "scientific_name": "Testudines", "category": "Reptiles"},
                {"name": "Lizard", "scientific_name": "Lacertilia", "category": "Reptiles"},
                {"name": "Frog", "scientific_name": "Anura", "category": "Amphibians"},
                {"name": "Wolf", "scientific_name": "Canis lupus", "category": "Mammals"},
                {"name": "Fox", "scientific_name": "Vulpes", "category": "Mammals"},
                {"name": "Bear", "scientific_name": "Ursidae", "category": "Mammals"},
                {"name": "Panda", "scientific_name": "Ailuropoda melanoleuca", "category": "Mammals"},
                {"name": "Koala", "scientific_name": "Phascolarctos cinereus", "category": "Mammals"},
                {"name": "Kangaroo", "scientific_name": "Macropus", "category": "Mammals"},
                {"name": "Zebra", "scientific_name": "Equus quagga", "category": "Mammals"},
            ]
            
            # Filter results based on query
            results = [
                animal for animal in animals_database
                if query.lower() in animal["name"].lower() or 
                   query.lower() in animal["scientific_name"].lower()
            ]
            
            return results
            
        except Exception as e:
            logger.error(f"Error searching animals: {e}")
            return []
    
    # Helper methods for animal characteristics
    
    def _get_scientific_name(self, animal_name: str) -> str:
        """Get scientific name for animal"""
        scientific_names = {
            "lion": "Panthera leo",
            "tiger": "Panthera tigris",
            "elephant": "Loxodonta africana",
            "eagle": "Aquila chrysaetos",
            "shark": "Selachimorpha",
            "snake": "Serpentes",
            "bear": "Ursidae",
            "wolf": "Canis lupus",
            "dolphin": "Delphinidae",
            "whale": "Cetacea",
            "penguin": "Spheniscidae",
            "crocodile": "Crocodylidae",
        }
        return scientific_names.get(animal_name.lower(), "N/A")
    
    def _get_conservation_status(self, animal_name: str) -> str:
        """Get conservation status for animal"""
        status_map = {
            "lion": "Vulnerable",
            "tiger": "Endangered",
            "elephant": "Endangered",
            "panda": "Vulnerable",
            "rhino": "Critically Endangered",
            "gorilla": "Critically Endangered",
            "wolf": "Least Concern",
            "bear": "Vulnerable",
            "eagle": "Least Concern",
            "shark": "Vulnerable",
            "whale": "Endangered",
            "penguin": "Near Threatened",
            "snow leopard": "Vulnerable",
            "cheetah": "Vulnerable",
        }
        return status_map.get(animal_name.lower(), "Data Deficient")
    
    def _get_habitat(self, animal_name: str) -> str:
        """Get habitat information"""
        habitats = {
            "lion": "African grasslands and savannas",
            "tiger": "Forests and grasslands of Asia",
            "elephant": "African and Asian forests, grasslands, and savannas",
            "shark": "Oceans worldwide, from surface to deep sea",
            "eagle": "Mountains, forests, and coastal areas",
            "bear": "Forests, mountains, tundra, and grasslands",
            "wolf": "Forests, grasslands, deserts, and tundra",
            "penguin": "Antarctic and sub-Antarctic regions",
            "crocodile": "Rivers, lakes, and coastal waters in tropical regions",
        }
        return habitats.get(animal_name.lower(), "Various habitats depending on species")
    
    def _get_diet(self, animal_name: str) -> str:
        """Get diet information"""
        diets = {
            "lion": "Carnivore - Large mammals (zebras, wildebeest, buffalo)",
            "tiger": "Carnivore - Deer, wild boar, buffalo",
            "elephant": "Herbivore - Grasses, fruits, bark, leaves",
            "shark": "Carnivore - Fish, seals, sea lions",
            "eagle": "Carnivore - Small mammals, fish, birds",
            "bear": "Omnivore - Berries, fish, small mammals, insects",
            "panda": "Herbivore - Primarily bamboo (99% of diet)",
            "wolf": "Carnivore - Deer, elk, moose, smaller mammals",
        }
        return diets.get(animal_name.lower(), "Omnivore")
    
    def _get_weight(self, animal_name: str) -> str:
        """Get average weight"""
        weights = {
            "lion": "190 kg (males), 130 kg (females)",
            "tiger": "220 kg (males), 140 kg (females)",
            "elephant": "6,000 kg (African), 4,000 kg (Asian)",
            "shark": "200-1,000 kg (varies by species)",
            "eagle": "3-6 kg",
            "bear": "130-700 kg (varies by species)",
            "wolf": "40-80 kg",
            "penguin": "1-45 kg (varies by species)",
        }
        return weights.get(animal_name.lower(), "Varies by species")
    
    def _get_length(self, animal_name: str) -> str:
        """Get average length"""
        lengths = {
            "lion": "1.8-2.1 m (body), plus 1 m tail",
            "tiger": "2.5-3.3 m (including tail)",
            "elephant": "5.5-6.5 m (length), 3-4 m (height)",
            "shark": "2-6 m (varies by species)",
            "eagle": "66-100 cm (wingspan: 1.8-2.3 m)",
            "bear": "1.2-3 m (varies by species)",
            "wolf": "1.05-1.6 m (body)",
        }
        return lengths.get(animal_name.lower(), "Varies by species")
    
    def _get_lifespan(self, animal_name: str) -> str:
        """Get average lifespan"""
        lifespans = {
            "lion": "10-14 years (wild), 20+ years (captivity)",
            "tiger": "10-15 years (wild), 20-26 years (captivity)",
            "elephant": "60-70 years",
            "shark": "20-30 years (most species), some over 100 years",
            "eagle": "20-30 years (wild), up to 50 (captivity)",
            "bear": "20-30 years (varies by species)",
            "wolf": "6-8 years (wild), 15 years (captivity)",
        }
        return lifespans.get(animal_name.lower(), "10-20 years")
    
    def _get_distribution(self, animal_name: str) -> str:
        """Get distribution information"""
        distributions = {
            "lion": "Sub-Saharan Africa, Gir Forest in India",
            "tiger": "Asia (India, Southeast Asia, Russia)",
            "elephant": "Sub-Saharan Africa and South/Southeast Asia",
            "shark": "Oceans worldwide, from shallow to deep water",
            "eagle": "Worldwide except Antarctica",
            "bear": "North America, Europe, Asia",
            "wolf": "North America, Europe, Asia, Middle East",
            "penguin": "Southern Hemisphere, primarily Antarctica",
        }
        return distributions.get(animal_name.lower(), "Varies by species")
    
    def _get_social_behavior(self, animal_name: str) -> str:
        """Get social behavior"""
        social = {
            "lion": "Social - Lives in prides of 15-30 individuals",
            "tiger": "Solitary - Except during mating season",
            "elephant": "Highly social - Matriarchal family groups",
            "shark": "Mostly solitary, some species form schools",
            "eagle": "Solitary or pairs during breeding",
            "bear": "Mostly solitary, except mothers with cubs",
            "wolf": "Social - Lives in packs of 5-10 individuals",
            "penguin": "Colonial - Lives in large groups",
        }
        return social.get(animal_name.lower(), "Varies by species")
    
    def _get_activity_pattern(self, animal_name: str) -> str:
        """Get activity pattern"""
        patterns = {
            "lion": "Nocturnal and crepuscular (dawn/dusk)",
            "tiger": "Crepuscular - Most active at dawn and dusk",
            "elephant": "Diurnal - Active during day and night",
            "shark": "Varies by species - many are nocturnal",
            "eagle": "Diurnal - Active during daylight hours",
            "bear": "Diurnal to crepuscular",
            "wolf": "Nocturnal and crepuscular",
            "owl": "Nocturnal - Active at night",
        }
        return patterns.get(animal_name.lower(), "Diurnal")
    
    def _get_fallback_data(self, animal_name: str) -> Dict:
        """Return fallback data if APIs fail"""
        return {
            "name": animal_name,
            "description": f"A {animal_name} is a fascinating animal. More detailed information is temporarily unavailable.",
            "status": "fallback"
        }