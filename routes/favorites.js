import express from "express";
import isAuthenticated from "./middlewares/isAuthenticated.js";

import Signup from "../models/Signup.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/user/favorites/characters", async (req, res) => {
  try {
    const userId = req.user._id;
    const { characterId } = req.body;

    const user = await Signup.findById(userId);
    const index = user.favoriteCharacters.indexOf(characterId);

    let message = "";
    if (index === -1) {
      user.favoriteCharacters.push(characterId);
      message = "Personnage ajouté aux favoris.";
    } else {
      user.favoriteCharacters.splice(index, 1);
      message = "Personnage retiré des favoris.";
    }

    await user.save();
    res
      .status(200)
      .json({ message, action: index === -1 ? "added" : "removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/favorites/comics", async (req, res) => {
  try {
    const userId = req.user._id;
    const { comicId } = req.body;

    const user = await Signup.findById(userId);
    const index = user.favoriteComics.indexOf(comicId);

    let message = "";
    if (index === -1) {
      user.favoriteComics.push(comicId);
      message = "Comic ajouté aux favoris.";
    } else {
      user.favoriteComics.splice(index, 1);
      message = "Comic retiré des favoris.";
    }

    await user.save();
    res
      .status(200)
      .json({ message, action: index === -1 ? "added" : "removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/favorites/characters", isAuthenticated, async (req, res) => {
  try {
    const user = await Signup.findById(req.user._id).populate(
      "favoriteCharacters"
    );
    res.status(200).json(user.favoriteCharacters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/favorites/comics", isAuthenticated, async (req, res) => {
  try {
    const user = await Signup.findById(req.user._id).populate("favoriteComics");

    res.status(200).json(user.favoriteComics);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
