// api/sightings.js
export default async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Complete dataset
    const data = {
      sightings: [
        {
          id: 1,
          species: "Elephant",
          location: "Amboseli National Park",
          timestamp: "2023-06-15T08:30:00",
          dangerLevel: "high",
          reporter: "Wildlife Ranger",
          image: "https://images.unsplash.com/photo-1505148230895-d9a785a555fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          notes: "Large bull elephant spotted near the park boundary. Potentially dangerous."
        },
        {
          id: 2,
          species: "Lion",
          location: "Masai Mara Reserve",
          timestamp: "2023-06-14T15:45:00",
          dangerLevel: "medium",
          reporter: "Tour Guide",
          image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          notes: "Pride of lions resting near the river. Keep distance."
        },
        {
          id: 3,
          species: "Rhino",
          location: "Nairobi National Park",
          timestamp: "2023-06-13T11:20:00",
          dangerLevel: "high",
          reporter: "Park Warden",
          image: "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          notes: "Black rhino with calf. Extremely protective behavior observed."
        },
        {
          id: 4,
          species: "Giraffe",
          location: "Tsavo East National Park",
          timestamp: "2023-06-12T09:10:00",
          dangerLevel: "low",
          reporter: "Tourist",
          image: "https://images.unsplash.com/photo-1518156677180-5679f064b6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          notes: "Group of giraffes feeding peacefully near the road."
        },
        {
          id: 5,
          species: "Leopard",
          location: "Aberdare National Park",
          timestamp: "2023-06-11T18:30:00",
          dangerLevel: "medium",
          reporter: "Researcher",
          image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          notes: "Leopard spotted in a tree near the lodge. Caution advised at night."
        }
      ]
    };
  
    return res.json(data);
  };