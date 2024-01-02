declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[];
  }

  interface Array<T> {
    toSpliced: (a: number, b: number) => T[];
  }
}

interface PreparationBaseProps {
  label: string;
  value: string;
  photo: string;
}

interface PreparationProps extends PreparationBaseProps {
  id: string;
}

export interface PreparationPropsFromAPI extends PreparationBaseProps {
  _id: string;
}

export interface RecipeBaseProps {
  createdAt: string;
  mainPhoto: Blob | Uint8Array | ArrayBuffer | any;
  title: string;
  author: string;
  description: string;
  category: string;
  cookingTime: number | string;
  peopleQuantity: number | string;
  ingredients: string[] | string;
  preparation: PreparationProps[];
}

export interface RecipeProps extends RecipeBaseProps {
  id: string;
  preparation: PreparationProps[];
}

export interface RecipePropsFromAPI extends RecipeBaseProps {
  _id: string;
  updatedAt: string;
  preparation: PreparationPropsFromAPI[];
}

type ResponseRecipesMessageProps = {
  message: string;
  recipes: RecipePropsFromAPI[] | [];
};

export interface ResponseAPIProps {
  status: number;
  response: ResponseRecipesMessageProps;
  ok: boolean;
}
