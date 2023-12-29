import express from "express";
import cors from "cors";
import { RecipesModel } from "./models/mongodb/recipes.js";

const PORT = process.env.PORT ?? 1234;
const app = express();

const ACCEPTED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:1234",
  "https://family-recipes-api.vercel.app/",
  "https://family-recipes-api.vercel.app/api/v1",
  "https://family-recipes-api.vercel.app/api/v2/add",
];

const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  });

app.use(corsMiddleware());
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
      response: {
        message: "Successfully recipes sent",
        recipes: recipes,
      },
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

  console.log("---------", provisionalObj);

  try {
    const recipeAdded = await RecipesModel.setRecipe(provisionalObj);

    console.log("---------recipeAdded", recipeAdded);

    if (recipeAdded === undefined) {
      res.json({
        status: 500,
        response: {
          message: "Error adding recipe",
          recipes: [],
        },
        ok: false,
      });
      return;
    }

    const RESPONSE_SERVER_JSON = {
      status: 200,
      response: {
        message: "Successfully added recipe",
        recipes: [recipeAdded],
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
