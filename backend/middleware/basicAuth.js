const Sauce = require("../models/Sauces")
const jwt = require("jsonwebtoken");

// middleware concue pour empécher la modification d'une sauce par injection de put dans Restclient par exemple
module.exports = (req, res, next) =>  {
     const token = req.headers.authorization.split(" ")[1];
     const decodedToken = jwt.verify(token, "testest");
     const userId = decodedToken.userId;
     console.log(userId)
    Sauce.findOne({ _id: req.params.id })
      .then(sauceId => {
          
           console.log(sauceId.userId)
   if (sauceId.userId !== userId)  {
    
     console.log("vous etes pas le propriétaire")
   } else {
    next();
       console.log("vous etes  le propriétaire") 
        
   }
})  
};
