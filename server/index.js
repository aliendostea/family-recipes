import express from "express";
import cors from "cors";
import { RecipesModel } from "./models/mongodb/recipes.js";
import { validateRecipe } from "./schemas/recipeSchema.js";

const PORT = process.env.PORT ?? 1234;
const app = express();

const ACCEPTED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5173/",
  "http://localhost:5173/add-recipe",
  "http://localhost:1234",
  "http://localhost:1234/api/v2/add",
  "https://family-recipes-seven.vercel.app",
  "https://family-recipes-seven.vercel.app/",
  "https://family-recipes-seven.vercel.app/add-recipe",
  "https://family-recipes-api.vercel.app",
  "https://family-recipes-api.vercel.app/",
  "https://family-recipes-api.vercel.app/api/v1",
  "https://family-recipes-api.vercel.app/api/v2/add",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
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
  const result = validateRecipe(req.body);

  if (result.error) {
    return res.json({
      status: 400,
      response: {
        message: JSON.parse(result.error.message),
        recipes: [],
      },
      ok: false,
    });
  }

  const { data } = result;
  const provitionalPreparation = data.preparation.map((preparation) => {
    return {
      label: preparation.label,
      value: preparation.value,
      photo: "photo-test",
    };
  });

  const provisionalObj = {
    createdAt: data.createdAt,
    mainPhoto: data.mainPhoto,
    title: data.title,
    author: data.author,
    description: data.description,
    category: data.category,
    cookingTime: data.cookingTime,
    peopleQuantity: data.peopleQuantity,
    ingredients: data.ingredients,
    preparation: provitionalPreparation,
  };

  try {
    const recipeAdded = await RecipesModel.setRecipe(provisionalObj);

    if (recipeAdded === undefined) {
      return res.json({
        status: 500,
        response: {
          message: "Error adding recipe",
          recipes: [],
        },
        ok: false,
      });
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
