const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await
let secondaryRecipe = {
  title: 'Arroz de Pato',
  cuisine: "Portuguese",
  level: "Hard Stuf",
  ingredients: "Rice",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 90,
  creator: "Paulo Abronhosa",
  created: "02/08/2021"
};

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
    // Create
    const recipeDb = {
      title: 'Tarte de Peixe',
      cuisine: "American",
      level:"Easy Peasy",
      ingredients: ["fish"],
      dishType: "breakfast",
      duration: 80,
      creator: "Manuel Alegre",
    };

    // let secondaryRecipeDb = await Recipe.create(secondaryRecipe);

    let createdRecipe = await Recipe.create(recipeDb);

    console.log(createdRecipe);

    let someRecipe = await Recipe.insertMany(data);
    console.log(someRecipe);



    let findOneRecipe = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, { new: true, upsert: true });
console.log(findOneRecipe);


    let removeOneRecipe = await Recipe.deleteOne( {title: "Carrot Cake"});

console.log("*****************");
console.log(findOneRecipe);

mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
