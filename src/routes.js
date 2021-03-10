
const  { Router } = require("express");

const router = Router();

const recipes = require("./controller");


router.post("/recipes", recipes.createRecipes );

module.exports = router;