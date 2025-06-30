const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;


const server = http.createServer(app);

module.exports = server;


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); // Export the server for testing purposes
// This allows the server to be imported in other files, such as for testing    or further configuration.
// The server listens on the specified port and logs a message when it starts successfully. 