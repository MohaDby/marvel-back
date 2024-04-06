import express, { query } from "express";
import axios from "axios";
import "dotenv/config";

const router = express.Router();

router.get("/comics", async (req, res) => {
  const { page = 1, title = "" } = req.query;
  const limit = 100;
  const skip = (page - 1) * limit;
  console.log(title);
  try {
    const response = await axios.get(
      `${process.env.API_URL}/comics?apiKey=${process.env.API_KEY}&skip=${skip}&limit=${limit}&title=${title}`
    );

    if (response.data && response.data.results) {
      const sortedComics = response.data.results.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });

      res.json({
        results: sortedComics,
        total: response.data.count,
      });
    } else {
      return res.status(500).send("Aucune donnée disponible");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur lors de la récupération des données");
  }
});

export default router;
