import express from "express";
import axios from "axios";
import "dotenv/config";

const router = express.Router();

router.get("/comic/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${process.env.API_URL}/comic/${id}?apiKey=${process.env.API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
