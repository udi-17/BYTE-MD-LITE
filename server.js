const express = require('express');
const path = require('path');
const app = express();

// Set port
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Listen on all interfaces

// Serve static files from media/site directory
app.use(express.static(path.join(__dirname, 'media', 'site')));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'media', 'site', 'index.html'));
});

// Start server
app.listen(PORT, HOST, () => {
    console.log(`🍕 Toni's Pizzas website is running!`);
    console.log(`🌐 Local: http://localhost:${PORT}`);
    console.log(`🌐 Network: http://127.0.0.1:${PORT}`);
    console.log(`🌐 All interfaces: http://${HOST}:${PORT}`);
    console.log(`📁 Serving files from: ${path.join(__dirname, 'media', 'site')}`);
});

module.exports = app;