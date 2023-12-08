declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[];
  }

  interface Array<T> {
    toSpliced: (a: number, b: number) => T[];
  }
}

type PreparationSteps = {
  id: string;
  label: string;
  value: string;
  photo: string;
};

export interface RecipeProps {
  id: string;
  timeStamp: string;
  mainPhoto: Blob | Uint8Array | ArrayBuffer | any;
  title: string;
  autor: string;
  description: string;
  category: string;
  cookingTime: number | string;
  peopleQuantity: number | string;
  ingredients: string[] | string;
  preparation: PreparationSteps[];
}

export interface ResponseAPIProps {
  status: number;
  response: RecipeProps[];
  ok: boolean;
}
