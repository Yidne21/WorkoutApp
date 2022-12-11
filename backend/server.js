require("dotenv").config();
const express = require("express");
const WorkoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");


//express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workoutes", WorkoutRoutes);

//connect to db
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT, () => {
  console.log("connected to db & listening on port", process.env.PORT);
});
