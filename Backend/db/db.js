const mongoose = require('mongoose');

function connectToDb () {
    mongoose.connect(process.env.DB_CONNECT, {
    }).then(() => {
        console.log('Connected to database');
    }).catch(err => console.log(err));
}

module.exports = connectToDb;
// This code connects to a MongoDB database using Mongoose.
// It exports a function `connectToDb` that attempts to connect to the database using the URI stored in the environment variable `MONGO_URI`.
// If the connection is successful, it logs the host of the connected database.