## Kenya Wildlife Tracker 🐘🌿
# Kenya Wildlife Tracker Preview

A real-time wildlife tracking and reporting system for conservationists, rangers, and tourists in Kenya’s national parks.

📌 Table of Contents
Problem Statement

Features

Technologies Used

Installation

Usage

API Endpoints

Challenges & Solutions

Future Improvements

License

🌍 Problem Statement
Kenya’s wildlife faces threats from poaching, habitat loss, and human-wildlife conflict. This app provides:
✅ Real-time tracking of endangered species
✅ Danger alerts for rangers and tourists
✅ Centralized database for conservation research

✨ Features
Feature	Description
Interactive Map	Leaflet.js integration for geolocation tracking
Sighting Reports	Log species, location, danger level, and images
Filter System	Search by species/danger level
Responsive UI	Works on mobile & desktop
Data Analytics	Stats dashboard for sightings
🛠️ Technologies Used
Frontend: HTML5, CSS3, JavaScript (ES6+)

Mapping: Leaflet.js + OpenStreetMap

Styling: Flexbox/Grid, Font Awesome Icons

Backend: JSON Server (mock API)

Deployment: GitHub Pages / Netlify

⚙️ Installation
Clone the repo

bash
Copy
git clone https://github.com/yourusername/KenyaWildlifeTracker.git
cd KenyaWildlifeTracker
Install dependencies

bash
Copy
npm install json-server
Run the mock API server

bash
Copy
json-server --watch db.json --port 3000
Open index.html in a browser

📲 Usage
Report a Sighting

Fill in species, location, danger level, and notes.

Submit to add to the database.

View Wildlife Data

Toggle between Map View and List View.

Filter by species/danger level.

Analyze Stats

Check the dashboard for total sightings and danger distribution.

🔌 API Endpoints
Endpoint	Method	Description
/sightings	GET	Fetch all sightings
/sightings	POST	Add new sighting
/sightings/:id	PATCH	Update sighting
/sightings/:id	DELETE	Remove sighting
🔥 Challenges & Solutions
Challenge	Solution
Real-time updates	Used JSON Server for mock API
Geolocation accuracy	Simulated coordinates (future: GPS integration)
Mobile responsiveness	CSS Grid + Media Queries
🚀 Future Improvements
User Authentication (Rangers vs. Tourists)

Image Upload (Firebase Storage)

SMS Alerts (Twilio API for high-danger sightings)

AI-Powered Species Recognition (TensorFlow.js)

📜 License
MIT © [Your Name]

🌐 Live Demo: GitHub Pages Link
🐞 Report Issues: GitHub Issues

Made with ❤️ for Wildlife Conservation 🐾