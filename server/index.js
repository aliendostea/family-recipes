import express from "express";
import cors from "cors";

const recipes = [
  {
    id: "new1111",
    timeStamp: "string2",
    title: "Spaghetti Bolognese nombre largo!",
    autor: "Chef John 2",
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
    id: "2222",
    timeStamp: "string2",
    title: "Spaghetti Bolognese",
    autor: "Chef John 2",
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
    id: "3333",
    timeStamp: "string2",
    title: "Spaghetti Bolognese 2",
    autor: "Nonna",
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

const PORT = process.env.PORT ?? 1234;

const corsOptions = {
  origin: ["*", "https://family-recipes-api.vercel.app/"],
  methods: ["POST", "GET"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const RESPONSE_SERVER_JSON = {
    status: 200,
    response: recipes,
    ok: true,
  };

  res.json(RESPONSE_SERVER_JSON);
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
  console.log(
    `server listening on port  https://family-recipes-seven.vercel.app:${PORT}`
  );
});
