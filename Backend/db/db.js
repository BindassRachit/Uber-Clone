const mongoose = require('mongoose');

function connectToDb() {
    console.log('Connecting to MongoDB:', process.env.MONGO_URI);  // debug
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(err => console.log(err));
}

module.exports = connectToDb;
