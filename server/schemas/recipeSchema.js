import z from "zod";

const recipeSchema = z.object({
  createdAt: z
    .string({
      invalid_type_error: "createdAt must be a string",
    })
    .optional(),
  mainPhoto: z.string({
    invalid_type_error: "mainPhoto must be a string",
    required_error: "mainPhoto is required",
  }),
  title: z.string({
    invalid_type_error: "title must be a string",
    required_error: "title is required",
  }),
  author: z.string({
    invalid_type_error: "author must be a string",
    required_error: "author is required",
  }),
  description: z.string({
    invalid_type_error: "description must be a string",
    required_error: "description is required",
  }),
  category: z.string({
    invalid_type_error: "category must be a string",
    required_error: "category is required",
  }),
  cookingTime: z.string({
    invalid_type_error: "cookingTime must be a string",
    required_error: "cookingTime is required",
  }),
  peopleQuantity: z.string({
    invalid_type_error: "peopleQuantity must be a string",
    required_error: "peopleQuantity is required",
  }),
  ingredients: z.array(
    z.string({
      invalid_type_error: "ingredients must be a string",
      required_error: "ingredients is required",
    })
  ),
  preparation: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        photo: z.string(),
      })
    )
    .optional(),
});

export function validateRecipe(input) {
  return recipeSchema.safeParse(input);
}
