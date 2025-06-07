const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URL;

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to MongoDB")
    }).catch((e) => {
        console.log("Error: ", e)
    })

}

module.exports = connectToMongo;