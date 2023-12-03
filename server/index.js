import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import recipes from "./recipes.json" assert { type: "json" };

dotenv.config();

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
