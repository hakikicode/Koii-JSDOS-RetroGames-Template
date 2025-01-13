import express from "express";
import { namespaceWrapper } from "@_koii/namespace-wrapper";

export const routes = express.Router(); // Named export

/**
 * Endpoint to get the reward for a specific round.
 */
routes.get("/reward/:roundNumber", async (req, res) => {
  try {
    const roundNumber = req.params.roundNumber;
    const reward = await namespaceWrapper.storeGet(`reward_${roundNumber}`);
    if (reward === null || reward === undefined) {
      return res.status(404).json({ error: "Reward not found for this round." });
    }
    res.json({ roundNumber, reward });
  } catch (error) {
    console.error("Error fetching reward:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

/**
 * Endpoint to get clicks for a specific round.
 */
routes.get("/clicks/:roundNumber", async (req, res) => {
  try {
    const roundNumber = req.params.roundNumber;
    const clicks = await namespaceWrapper.storeGet("clicks");
    if (clicks === null || clicks === undefined) {
      return res.status(404).json({ error: "Clicks not found for this round." });
    }
    res.json({ roundNumber, clicks });
  } catch (error) {
    console.error("Error fetching clicks:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

/**
 * Default route to check if the server is running.
 */
routes.get("/", (req, res) => {
  res.send("SMART CLICK Backend API is running.");
});
