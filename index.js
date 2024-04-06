import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

import charactersRoutes from "./routes/characters.js";
app.use(charactersRoutes);

import characterRoutes from "./routes/character.js";
app.use(characterRoutes);

import comicsRoutes from "./routes/comics.js";
app.use(comicsRoutes);

import characterComicsRoutes from "./routes/characterComics.js";
app.use(characterComicsRoutes);

import comicRoutes from "./routes/comic.js";
app.use(comicRoutes);

import loginRoutes from "./routes/login.js";
app.use(loginRoutes);

import signupRoutes from "./routes/signup.js";
app.use(signupRoutes);

import favoritesRoutes from "./routes/favorites.js";
app.use(favoritesRoutes);

app.all("*", (req, res) => {
  res.status(400).json({ message: "cette page n'existe pas" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
