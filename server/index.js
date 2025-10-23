
const app = require('./src/app');
const connectDB = require('./src/config/db')
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB(); // connection of mongodb data base

app.listen(PORT , () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
})