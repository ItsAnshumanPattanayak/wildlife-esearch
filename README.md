# 🦁 Wildlife eSearch

AI-powered wildlife identification and information system. Identify animals instantly using your camera or search by name, and get comprehensive information including safety guidelines and medical advice.

## ✨ Features

- 📸 **Camera Identification** - Upload or capture photos to identify animals
- 🔍 **Smart Search** - Search animals by name
- 📖 **Detailed Information** - Comprehensive animal details from Wikipedia
- 🛡️ **Safety Guidelines** - Learn how to stay safe around wildlife
- 🏥 **Medical Information** - First aid and emergency treatment guidance

## 🛠️ Technology Stack

**Backend:**
- Python (FastAPI, Wikipedia API)
- Node.js (Express, Axios, Caching)

**Frontend:**
- React 18
- Vite
- TailwindCSS
- React Router
- Axios

## 📦 Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- Git

### Setup Instructions

1. **Clone repository:**
```bash
git clone https://github.com/YOUR_USERNAME/wildlife-esearch.git
cd wildlife-esearch
```
### 2. Setup Python Backend
 cd backend/python-service
python -m venv venv

# Activate Virtual Environment (Windows)
venv\Scripts\activate
# Activate Virtual Environment (Mac/Linux)
source venv/bin/activate

pip install -r requirements.txt

### 3. Setup Node.js API Gateway
cd ../node-service
npm install

### 4. Setup Frontend
cd ../../frontend
npm install

🚀 Running the Application
To run the full application locally, you will need to open 3 separate terminals.

Terminal 1: Python AI Service

cd backend/python-service
venv\Scripts\activate  # Windows (use source venv/bin/activate for Mac/Linux)
python -m uvicorn app.main:app --reload

Terminal 2: Node.js Service

cd backend/node-service
npm run dev

Terminal 3: React Frontend

cd frontend
npm run dev

Once all servers are running, open your browser and navigate to: http://localhost:5173

🎯 Usage Guide
Home Page: Discover application features and view currently trending/popular animals.

Camera Search: Click the camera icon to take a live photo or upload an image file for instant AI identification.

Text Search: Use the search bar to query any animal by name.

Animal Details Dashboard: View the identified animal alongside its habitat info, safety defense guidelines, and medical protocols.

📸 Screenshots
(Add your application screenshots here after deployment)

![Home Page](./path-to-image.png)

![Search Results](./path-to-image.png)

🗺️ Roadmap & Next Steps
Enhance ML Pipeline: Replace the current classification logic with a custom-trained TensorFlow/PyTorch model using actual animal image datasets to increase accuracy.

User Features: Implement functionality to save favorite animals, enable dark mode, and add social media sharing.

Deployment:

Host frontend on Vercel or Netlify.

Host backends on Railway, Render, or Heroku.

🛠️ Troubleshooting & FAQ
Q: "Port already in use" error?
Kill the existing process occupying the port or change the default port in your respective .env files.

Q: "Module not found" error?
Ensure you are in the correct directory (frontend, node-service, or python-service) and rerun npm install or pip install -r requirements.txt.

Q: Webcam is not working?
Ensure your browser has been granted permission to access the camera. Note that modern browsers require HTTPS or localhost to allow camera access.

🤝 Contributing
Contributions are always welcome! Feel free to open an issue or submit a pull request if you have ideas for improvements.

📄 License
This project is licensed under the MIT License.

👤 Author
https://github.com/ItsAnshumanPattanayak

🙏 Acknowledgments
Wikipedia API for comprehensive animal data.

The React and FastAPI open-source communities.
