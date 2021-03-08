const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
const path = require("path");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const Sauces = require("./models/Sauces");
const { createSauce } = require("./controllers/sauces");


const app = express();

require("dotenv").config(); //import de dotenv pour gérer des variables dissimulées

app.use(helmet()); //Import de helmet pour configurer de manière appropriée des en-têtes HTTP
app.use(mongoSanitize()); //Import de mongo-sanitize pour empecher les attaques par injection

mongoose
  .connect(
    "mongodb+srv://dylanp6:adminp6@cluster0.xk6fh.mongodb.net/testp6?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;