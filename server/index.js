import express from "express";
import cors from "cors";
import { RecipesModel } from "./models/mongodb/recipes.js";

const recipes2 = [
  {
    _id: "new1111",
    timeStamp: "string2",
    title: "Spaghetti Bolognese nombre largo!",
    author: "Chef John 2",
    description: "A classic Italian dish with a twist.",
    category: "Pasta",
    cookingTime: "30 minutes",
    peopleQuantity: 4,
    ingredients: "Ground beef, tomatoes, pasta, onion, garlic, herbs",
    preparation: [
      {
        label: "Preparación paso 1",
        description: "Pelamos el tomate para cortarlo en finas rodajas.",
        img: "img.png",
      },
    ],
    mainPhoto:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "2222",
    timeStamp: "string2",
    title: "Spaghetti Bolognese",
    author: "Chef John 2",
    description: "A classic Italian dish with a twist.",
    category: "Bologna",
    cookingTime: "30 minutes",
    peopleQuantity: 4,
    ingredients: "Ground beef, tomatoes, pasta, onion, garlic, herbs",
    preparation: [
      {
        label: "Preparación paso 1",
        description: "Pelamos el tomate para cortarlo en finas rodajas.",
        img: "img.png",
      },
    ],
    mainPhoto:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "3333",
    timeStamp: "string2",
    title: "Spaghetti Bolognese 2",
    author: "Nonna",
    description: "A classic Italian dish with a twist.",
    category: "Bologna",
    cookingTime: "30 minutes",
    peopleQuantity: 4,
    ingredients: "Ground beef, tomatoes, pasta, onion, garlic, herbs",
    preparation: [
      {
        label: "Preparación paso 1",
        description: "Pelamos el tomate para cortarlo en finas rodajas.",
        img: "img.png",
      },
    ],
    mainPhoto:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "4444",
    timeStamp: "string2",
    title: "Nonna Bolognese 3",
    author: "Nonna",
    description: "A classic Italian dish with a twist.",
    category: "Bologna",
    cookingTime: "30 minutes",
    peopleQuantity: 4,
    ingredients: "Ground beef, tomatoes, pasta, onion, garlic, herbs",
    preparation: [
      {
        label: "Preparación paso 1",
        description: "Pelamos el tomate para cortarlo en finas rodajas.",
        img: "img.png",
      },
    ],
    mainPhoto:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// const corsOptions = {
//   contentType: "application/json",
//   origin: ["*", "https://family-recipes-api.vercel.app/"],
//   methods: ["POST", "GET"],
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

const PORT = process.env.PORT ?? 1234;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1", async (req, res) => {
  try {
    const recipes = await RecipesModel.getAllRecipes();

    if (recipes.status === 500) {
      res.json({
        status: 500,
        response: recipes.response,
        ok: false,
      });
      return;
    }

    const RESPONSE_SERVER_JSON = {
      status: 200,
      response: recipes,
      ok: true,
    };

    res.json(RESPONSE_SERVER_JSON);
  } catch (error) {
    console.log("error----------", error);
  }
});

app.post("/api/v2/add", async (req, res) => {
  const requestData = req.body;

  const provitionalPreparation = requestData.preparation.map((preparation) => {
    return {
      label: preparation.label,
      value: preparation.value,
      photo: "photo-test",
    };
  });

  const provisionalObj = {
    createdAt: requestData.createdAt,
    mainPhoto: "mainPhoto-test",
    title: requestData.title,
    author: requestData.author,
    description: requestData.description,
    category: requestData.category,
    cookingTime: requestData.cookingTime,
    peopleQuantity: requestData.peopleQuantity,
    ingredients: requestData.ingredients,
    preparation: provitionalPreparation,
  };

  try {
    const recipeAdded = await RecipesModel.setRecipe(provisionalObj);

    console.log("---------recipeAdded", recipeAdded);

    if (recipeAdded === undefined) {
      res.json({
        status: 500,
        response: "Error adding recipe",
        ok: false,
      });
      return;
    }

    const RESPONSE_SERVER_JSON = {
      status: 200,
      response: {
        message: "Successfully added recipe",
        recipe: recipeAdded,
      },
      ok: true,
    };

    res.status(200).json(RESPONSE_SERVER_JSON);
    console.log("-------------------------> end of process");
  } catch (error) {
    console.log("error----------", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
