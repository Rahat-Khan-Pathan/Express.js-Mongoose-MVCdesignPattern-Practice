const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./Routes/student");
const marksRoutes = require("./Routes/marks");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

mongoose.connect(`${process.env.MONGODB}`);

app.use("/student", studentRoutes);
app.use("/marks", marksRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
