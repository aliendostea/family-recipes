import mongoose from "mongoose";
import dotenv from "dotenv";
const Schema = mongoose.Schema;

dotenv.config();

const DB_URI = `mongodb+srv://${process.env.DATA_BASE_USER}:${process.env.DATA_BASE_PASSWORD}@${process.env.DATA_BASE_NAME}.emcytap.mongodb.net/?retryWrites=true&w=majority`;

const recipeSchema = new Schema(
  {
    mainPhoto: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: String,
      required: true,
    },
    peopleQuantity: {
      type: String,
      required: true,
    },
    ingredients: [String],
    preparation: [
      {
        label: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
        photo: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const RecipesModelMongoose = mongoose.model("Recipes", recipeSchema);

export class RecipesModel {
  static async getAllRecipes() {
    try {
      await this.connectToMongoDB();

      return await RecipesModelMongoose.find();
    } catch (error) {
      console.log("error", error);

      return {
        status: 500,
        response: error,
        ok: false,
      };
    }
  }

  static async setRecipe(recipeToAdd) {
    try {
      await this.connectToMongoDB();

      const recipe = new RecipesModelMongoose(recipeToAdd);

      return await recipe.save();
    } catch (error) {
      console.log("error", error);
    }
  }

  static async deleteRecipe(recipeToDelete) {}

  static async connectToMongoDB() {
    try {
      await mongoose.connect(DB_URI);
      console.log("----- connected to mongoose");
    } catch (error) {
      console.log("error mongoose", error);
    }
  }
}
