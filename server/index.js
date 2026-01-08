const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');

// --- Import Routes (New Code) ---
const foodRoutes = require('./routes/foodRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

dotenv.config({ path: './.env' });
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

// --- Use Routes (New Code) ---
app.use('/api/foods', foodRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/restaurant', restaurantRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});