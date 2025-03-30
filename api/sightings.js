// api/sightings.js
export default async (req, res) => {
    // 1. Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // 2. Hardcoded data (replace with your 5 entries)
    const data = {
      sightings: [
        {
          id: 1,
          species: "Elephant",
          // ... copy-paste all 5 entries from your db.json
        },
        // ... other 4 entries
      ]
    };
  
    // 3. Send response (takes <1ms)
    return res.json(data);
  };