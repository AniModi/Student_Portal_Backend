// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

function connectToMongo() {
  const db_uri = process.env.DB_URI;
  mongoose
    .connect(db_uri)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

connectToMongo();

const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const semesterRegistrationRoutes = require("./routes/semesterRegistrationRoutes");
const verifyFeesRoutes = require("./routes/verifyFeesRoute.js");
const fetchDocumentRoutes = require("./routes/fetchDocumentRoutes.js");
const addCommentRoutes = require("./routes/commentRoute.js");


app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/registration", semesterRegistrationRoutes);
app.use("/api/verify-fees", verifyFeesRoutes);
app.use("/api/fetch-documents", fetchDocumentRoutes)
app.use("/api/comment", addCommentRoutes);