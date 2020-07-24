const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path: './config/config.env'
});
const connectDB = async () => {
    try {

        const connected = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log(`mongodb is connected ${connected.connection.host}`);

    } catch (error) {
        console.log(error);
        process.exit(1);

    }
}
module.exports = connectDB;