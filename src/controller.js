
const queueProcess = require("../lib/rabbit-queue");

const createRecipes = async (req, res, next ) => {
    
    const { userId,  recipe_name, customer_name, count, price ,createdAt } = req.body;
     
    let payload;

    try {

      payload = {
        userId, recipe_name, customer_name, count, price ,createdAt
      };

      await queueProcess(payload);

  
      res.status(201).json({ userId, recipe_name, customer_name, count, price , createdAt });  
  
    } catch (error) {
       return next(error); 
    } 

};


exports.createRecipes = createRecipes;