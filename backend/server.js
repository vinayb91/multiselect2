const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const port = 3000;

const options = Array.from({ length: 26 }, (_, i) => {
    const value = (10 + i).toString(36) + (10 + i);
    return { label: value, value: value };
});

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Endpoint to handle option filtering
app.get('/api/options', (req, res) => {
    const searchQuery = req.query.search.toLowerCase();
    const filteredOptions = options.filter(option => option.label.includes(searchQuery));
    res.json(filteredOptions);
});

app.post('/api/submit', (req, res) => {
    const { selectedOptions } = req.body;
    console.log('Received options:', selectedOptions);
    res.status(200).send('Options received');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
