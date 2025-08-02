const express = require('express');
const path = require('path');
const app = express();

// Set port
const PORT = process.env.PORT || 3000;

// Serve static files from media/site directory
app.use(express.static(path.join(__dirname, 'media', 'site')));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'media', 'site', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🍕 Toni's Pizzas website is running on port ${PORT}`);
    console.log(`🌐 Open http://localhost:${PORT} to view the website`);
});

module.exports = app;