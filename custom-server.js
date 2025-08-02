// Custom server with routing for all pages
const http = require('http');
const fs = require('fs');
const path = require('path');

function start(port) {
    const pageDir = path.join(__dirname, 'media', 'site');
    
    const server = http.createServer((req, res) => {
        console.log('---');
        console.log('server: GET \'' + req.url + '\'');
        
        let filePath;
        let contentType = 'text/html';
        
        // Route handling
        switch(req.url) {
            case '/':
                filePath = path.join(pageDir, 'index.html');
                break;
            case '/style.css':
                filePath = path.join(pageDir, 'assets', 'style.css');
                contentType = 'text/css';
                break;
            case '/return-policy.html':
                filePath = path.join(pageDir, 'return-policy.html');
                break;
            case '/contact.html':
                filePath = path.join(pageDir, 'contact.html');
                break;
            default:
                // 404 for unknown routes
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Not Found');
                console.log('server: response 404 \'Not Found\'');
                return;
        }
        
        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Not Found');
                console.log('server: response 404 \'Not Found\'');
            } else {
                res.writeHead(200, {'Content-Type': contentType});
                res.end(data);
                console.log('server: response 200 \'' + path.basename(filePath) + '\'');
            }
        });
    });
    
    // Parse port
    port = parseInt(port);
    if (isNaN(port)) {
        console.log('⚠️ ERROR PORT must be an integer !!! \nℹ️ using port 8000');
        port = 8000;
    }
    
    // Start server
    try {
        server.listen(port, () => {
            console.log('ℹ️ server started at port: ' + port);
        });
        
        // Handle shutdown
        process.on('SIGINT', () => {
            console.log('👋 server shutting down...');
            server.close(() => process.exit(0));
        });
    } catch (error) {
        console.log('⚠️ ERROR starting server at port: ' + port + ' error: ' + error.message);
    }
}

module.exports = { start };