const express = require("express");
require("dotenv").config();
const httpLogger = require("./src/middleware/httpLogger");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { DB_URI, PORT } = require("./src/config/Keys");

const authRoutes = require("./src/routes/authRoutes/auth.routes");
const userRoutes = require("./src/routes/userRoutes/user.routes");
const lab = require("./src/routes/laboratoryRoutes/laboratory.routes");
const medicalTest = require("./src/routes/medicalTest/medicalTest.routes");
const doctor = require("./src/routes/userRoutes/doctor.routes");
const booking = require("./src/routes/bookingRoutes/bookingTest.routes");
const review = require("./src/routes/reviewRoutes/review.routes");
const { verifyToken } = require("./src/middleware/verifyToken");

const app = express();
app.use(httpLogger);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const uri = "mongodb+srv://applore_book_your_test:applorebook1234@bookyourtestadmin.ytley.mongodb.net/book_your_test?retryWrites=true&w=majority";




mongoose
  .connect( uri , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, (req, res) =>
      console.log(`Connected To Mongoose And Server Is Started On ${PORT}`)
    )
  )
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to book your test backend");
});

app.use("/api/auth", authRoutes);

app.use("/api/user", verifyToken(), userRoutes);

app.use("/api/lab", verifyToken(), lab);

app.use("/api/test", verifyToken(), medicalTest);

app.use("/api/doctor", verifyToken(), doctor);

app.use("/api/book", verifyToken(), booking);

app.use("/api/review", verifyToken(), review); 
