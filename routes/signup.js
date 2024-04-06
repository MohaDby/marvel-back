import express from "express";
import uid2 from "uid2";
import bcrypt from "bcrypt";

import "dotenv/config";

import Signup from "../models/Signup.js";
const router = express.Router();

const saltRounds = 10;

router.post("/user/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 6 caractères",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format d'email invalide." });
    }

    const existEmail = await Signup.findOne({ email: email });
    if (existEmail) {
      return res.status(400).json({ message: "L'email existe déja" });
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const newSignup = new Signup({
      email: email,
      username: username,
      hash: hash,
      token: uid2(64),
    });
    await newSignup.save();
    res.json({
      _id: newSignup._id,
      token: newSignup.token,
      account: { username: newSignup.username, email: newSignup.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
