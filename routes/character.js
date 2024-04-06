import express from "express";
import axios from "axios";
import "dotenv/config";

const router = express.Router();

router.get("/character/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${process.env.API_URL}/character/${id}?apiKey=${process.env.API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

export default router;
