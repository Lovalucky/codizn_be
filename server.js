const express = require('express');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');
const routes = require("./src/Routes/routes");
const cors = require('cors');
// app.use("/uploads", express.static("uploads"));
dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
