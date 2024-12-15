const express = require('express');
const chartRoutes = require('./routes/chartRoutes');
require('dotenv').config();

const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5176', 
    methods: 'GET,POST,PUT,DELETE', 
    credentials: true 
}));

app.use('/api/charts', chartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
