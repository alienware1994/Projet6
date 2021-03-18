const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


require("dotenv").config();
// Fonction pour la création d'un utilisateur quand celui ci s'inscrit avec le masquage de l'adrtesse mail 
exports.signup = (req, res, next) => {
 
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
         email: req.body.email,
         
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur crée !!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
// fonction pour la connexion de l'utilisateur en traduisant l'adresse mail masquer et le mot de passe crypter avec Bcrypt
exports.login = (req, res, next) => {
  
  const maskedMail = req.body.email;
  
  User.findOne({ email: maskedMail }) // masquage de l'adresse mail
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
