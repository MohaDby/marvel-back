import express from "express";
import bcrypt from "bcrypt";
import Signup from "../models/Signup.js";

const router = express.Router();

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Signup.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.hash);
    if (!isMatch) {
      return res.status(403).json({ message: "Mot de passe incorrect" });
    }

    res.json({
      message: "Connexion réussie",
      token: user.token,
      account: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).send("Erreur lors de la connexion");
  }
});

export default router;
