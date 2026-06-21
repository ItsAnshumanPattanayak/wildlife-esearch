from PIL import Image
import logging
from typing import Dict
import random

logger = logging.getLogger(__name__)

class AnimalClassifier:
    """Simple animal classifier"""
    
    def __init__(self):
        # Sample animal database
        self.animals_db = {
            "lion": {
                "scientific_name": "Panthera leo",
                "category": "Mammals",
                "class": "Mammalia",
                "habitat": "African grasslands and savannas",
                "diet": "Carnivore",
            },
            "tiger": {
                "scientific_name": "Panthera tigris",
                "category": "Mammals",
                "class": "Mammalia",
                "habitat": "Forests and grasslands of Asia",
                "diet": "Carnivore",
            },
            "elephant": {
                "scientific_name": "Loxodonta africana",
                "category": "Mammals",
                "class": "Mammalia",
                "habitat": "African savannas and forests",
                "diet": "Herbivore",
            },
            "eagle": {
                "scientific_name": "Aquila chrysaetos",
                "category": "Birds",
                "class": "Aves",
                "habitat": "Mountains and open areas worldwide",
                "diet": "Carnivore",
            },
            "shark": {
                "scientific_name": "Selachimorpha",
                "category": "Fish",
                "class": "Chondrichthyes",
                "habitat": "Oceans worldwide",
                "diet": "Carnivore",
            },
            "snake": {
                "scientific_name": "Serpentes",
                "category": "Reptiles",
                "class": "Reptilia",
                "habitat": "Various habitats worldwide",
                "diet": "Carnivore",
            },
        }
    
    async def classify_image(self, image: Image.Image) -> Dict:
        """
        Classify animal in image
        For demo purposes, returns random animal
        In production, use actual ML model
        """
        try:
            # Verify image is valid
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # For demo: return random animal
            # In production: use TensorFlow/PyTorch model
            animal_name = random.choice(list(self.animals_db.keys()))
            animal_info = self.animals_db[animal_name]
            
            # Simulate confidence score
            confidence = random.uniform(0.75, 0.98)
            
            return {
                "animal_name": animal_name,
                "scientific_name": animal_info["scientific_name"],
                "category": animal_info["category"],
                "confidence": confidence,
                "class": animal_info["class"],
                "habitat": animal_info["habitat"],
                "diet": animal_info["diet"]
            }
            
        except Exception as e:
            logger.error(f"Error in classification: {e}")
            raise