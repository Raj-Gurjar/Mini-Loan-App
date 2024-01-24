require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("*", cors());

app.use("/api/user", require("./routes/user"));
app.use("/api/loan", require("./routes/loan"));


app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

const dbConnect = require("./config/database");
dbConnect();
