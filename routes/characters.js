import express from "express";
import axios from "axios";
const router = express.Router();
import "dotenv/config";

router.get("/characters", async (req, res) => {
  const { page = 1, name = "" } = req.query;
  const limit = 100;
  const skip = (page - 1) * limit;

  try {
    const response = await axios.get(
      `${process.env.API_URL}/characters?apiKey=${process.env.API_KEY}&skip=${skip}&limit=${limit}&name=${name}`
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur lors de la récupération des données");
  }
});

export default router;
