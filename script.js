document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const elements = {
        sightingsList: document.getElementById("sightings-list"),
        sightingForm: document.getElementById("sighting-form"),
        speciesFilter: document.getElementById("species-filter"),
        dangerFilter: document.getElementById("danger-filter"),
        mapViewBtn: document.getElementById("map-view"),
        listViewBtn: document.getElementById("list-view"),
        mapContainer: document.getElementById("map-container"),
        listContainer: document.getElementById("list-container"),
        resetFiltersBtn: document.getElementById("reset-filters"),
        totalSightings: document.getElementById("total-sightings"),
        dangerCounts: document.getElementById("danger-counts"),
        notification: document.getElementById("notification")
    };

    // State
    const state = {
        sightings: [],
        filteredSightings: [],
        currentView: "list",
        map: null,
        markers: []
    };

    function showLoading() {
        console.log("Showing loading indicator");
        elements.notification.textContent = "Loading sightings...";
        elements.notification.className = "loading";
        elements.notification.classList.remove("hidden");
    }

    function hideLoading() {
        elements.notification.classList.add("hidden");
    }

    // API Configuration
    const API_URL = 'https://kenya-wildlife-tracker.vercel.app/api/sightings';

    // Initialize the application
    init();

    async function init() {
        setupEventListeners();
        await fetchSightings();
        updateStats();

        const localData = localStorage.getItem('wildlifeSightings');
        if (localData) {
            state.sightings = JSON.parse(localData);
            state.filteredSightings = [...state.sightings];
        }
        
        setupEventListeners();
        await fetchSightings(); // This will override with API data if available
        updateStats();
        }

    // Fetch data from API
    async function fetchSightings() {
        showLoading();
        try {
            const response = await fetch(API_URL, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }
            
            const data = await response.json();
            console.log("API Response:", data); // Debug log
            
            state.sightings = data.sightings || data;
            state.filteredSightings = [...state.sightings];
            renderSightings();
            
            if (state.currentView === "map") {
                updateMap();
            }
        } catch (error) {
            console.error("Error fetching sightings:", error);
            showNotification("Failed to load sightings. Using local data...", "error");
            
            // Fallback to local storage
            const localData = localStorage.getItem('wildlifeSightings');
            if (localData) {
                state.sightings = JSON.parse(localData);
                state.filteredSightings = [...state.sightings];
                renderSightings();
            }
        } finally {
            hideLoading();
        }
    }

    // Render sightings to DOM
    function renderSightings() {
        elements.sightingsList.innerHTML = state.filteredSightings.map(sighting => `
            <li class="sighting ${sighting.dangerLevel}">
                <div class="sighting-header">
                    <h3>${escapeHTML(sighting.species)}</h3>
                    <span class="danger-badge ${sighting.dangerLevel}">
                        ${sighting.dangerLevel.toUpperCase()}
                    </span>
                </div>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${escapeHTML(sighting.location)}</p>
                <p class="timestamp"><i class="far fa-clock"></i> ${formatDate(sighting.timestamp)}</p>
                ${sighting.notes ? `<p class="notes">${escapeHTML(sighting.notes)}</p>` : ''}
                <div class="sighting-footer">
                    <span class="reporter"><i class="far fa-user"></i> ${sighting.reporter || 'Anonymous'}</span>
                    ${sighting.image ? `<button class="view-image-btn" data-image="${escapeHTML(sighting.image)}">
                        <i class="far fa-image"></i> View Image
                    </button>` : ''}
                </div>
            </li>
        `).join('');

        // Add event listeners to image buttons
        document.querySelectorAll('.view-image-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const imageUrl = e.target.closest('button').dataset.image;
                showImageModal(imageUrl);
            });
        });
    }
    // Initialize and update Leaflet map
    function updateMap() {
        // Clear existing markers
        state.markers.forEach(marker => state.map.removeLayer(marker));
        state.markers = [];

        if (!state.map) {
            // Initialize map if it doesn't exist
            state.map = L.map('map').setView([-1.2921, 36.8219], 7);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(state.map);
        }

        // Add markers for each sighting
        state.filteredSightings.forEach(sighting => {
            // For demo purposes, we'll generate random coordinates near Kenya
            const lat = -1.2921 + (Math.random() * 4 - 2);
            const lng = 36.8219 + (Math.random() * 4 - 2);
            
            const marker = L.marker([lat, lng]).addTo(state.map);
            
            let dangerIcon;
            switch(sighting.dangerLevel) {
                case 'high':
                    dangerIcon = '<i class="fas fa-skull-crossbones danger-high"></i>';
                    break;
                case 'medium':
                    dangerIcon = '<i class="fas fa-exclamation-triangle danger-medium"></i>';
                    break;
                default:
                    dangerIcon = '<i class="fas fa-info-circle danger-low"></i>';
            }
            
            marker.bindPopup(`
                <div class="map-popup">
                    <h4>${escapeHTML(sighting.species)} ${dangerIcon}</h4>
                    <p><strong>Location:</strong> ${escapeHTML(sighting.location)}</p>
                    <p><strong>Reported:</strong> ${formatDate(sighting.timestamp)}</p>
                    ${sighting.image ? `<img src="${escapeHTML(sighting.image)}" alt="${escapeHTML(sighting.species)}" class="popup-image">` : ''}
                </div>
            `);
            
            state.markers.push(marker);
        });

        // Fit map to show all markers
        if (state.markers.length > 0) {
            const group = new L.featureGroup(state.markers);
            state.map.fitBounds(group.getBounds().pad(0.2));
        }
    }

    // Event Listeners
    function setupEventListeners() {
        // Form submission
        // Replace your current form submit listener with this:
elements.sightingForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // This was missing!
    
    const formData = new FormData(elements.sightingForm);
    
    const newSighting = {
        species: formData.get('species').trim(),
        location: formData.get('location').trim(),
        dangerLevel: formData.get('danger-level'),
        timestamp: new Date().toISOString(), // Auto-generate timestamp
        notes: formData.get('notes').trim(),
        reporter: "User"
    };

    try {
        await addSighting(newSighting);
        elements.sightingForm.reset(); // Clear form after success
    } catch (error) {
        console.error("Submission error:", error);
    }
});

        // Filter changes
        elements.speciesFilter.addEventListener("change", filterSightings);
        elements.dangerFilter.addEventListener("change", filterSightings);
        elements.resetFiltersBtn.addEventListener("click", resetFilters);

        // View toggle
        elements.mapViewBtn.addEventListener("click", () => toggleView("map"));
        elements.listViewBtn.addEventListener("click", () => toggleView("list"));
    }

    // Filter sightings based on current filters
    function filterSightings() {
        const speciesFilter = elements.speciesFilter.value.toLowerCase();
        const dangerFilter = elements.dangerFilter.value.toLowerCase();

        state.filteredSightings = state.sightings.filter(sighting => {
            return (
                (speciesFilter === "all" || sighting.species.toLowerCase().includes(speciesFilter)) &&
                (dangerFilter === "all" || sighting.dangerLevel === dangerFilter)
            );
        });

        renderSightings();
        updateStats();
        
        if (state.currentView === "map") {
            updateMap();
        }
    }

    // Reset all filters
    function resetFilters() {
        elements.speciesFilter.value = "all";
        elements.dangerFilter.value = "all";
        filterSightings();
    }

    // Toggle between list and map views
    function toggleView(view) {
        state.currentView = view;
        
        if (view === "map") {
            elements.mapContainer.classList.remove("hidden");
            elements.listContainer.classList.add("hidden");
            elements.mapViewBtn.classList.add("active");
            elements.listViewBtn.classList.remove("active");
            
            // Initialize or update map
            updateMap();
        } else {
            elements.mapContainer.classList.add("hidden");
            elements.listContainer.classList.remove("hidden");
            elements.listViewBtn.classList.add("active");
            elements.mapViewBtn.classList.remove("active");
        }
    }

    // Add new sighting
    async function addSighting(sighting) {
        try {
            // 1. Create new sighting object
            const newSighting = {
                ...sighting,
                id: Date.now(), // Generate unique ID
                timestamp: new Date().toISOString()
            };
    
            // 2. Add to local state
            state.sightings.unshift(newSighting);
            state.filteredSightings.unshift(newSighting);
            
            // 3. Save to localStorage (since we can't write to Vercel API)
            localStorage.setItem('wildlifeSightings', JSON.stringify(state.sightings));
            
            // 4. Update UI
            renderSightings();
            updateStats();
            
            if (state.currentView === "map") {
                updateMap();
            }
            
            // 5. Show success message
            showNotification("Sighting added successfully!", "success");
            return newSighting;
            
        } catch (error) {
            console.error("Error adding sighting:", error);
            showNotification("Failed to add sighting", "error");
            throw error;
        }
    }

    // Update statistics display
    function updateStats() {
        const total = state.filteredSightings.length;
        elements.totalSightings.textContent = `${total} ${total === 1 ? 'sighting' : 'sightings'}`;
        
        const counts = {};
        state.filteredSightings.forEach(s => {
            counts[s.dangerLevel] = (counts[s.dangerLevel] || 0) + 1;
        });
        
        elements.dangerCounts.innerHTML = Object.entries(counts)
            .map(([level, count]) => 
                `<span class="danger-count ${level}">${count} ${level}</span>`
            ).join(' ');
    }

    // Helper functions
    function formatDate(timestamp) {
        try {
            return new Date(timestamp).toLocaleString('en-KE', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            console.error("Invalid date format:", timestamp);
            return "Unknown date";
        }
    }

    function escapeHTML(str) {
        if (!str) return '';
        return str.toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});