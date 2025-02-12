import { Router } from "express";
import { createJoke, getJokes, getJokeById, updateJoke, deleteJoke } from "../controllers/joke_controller";
import { verifyToken } from "../middleware/jwt";

const router = Router();

router.post("/jokes", verifyToken, createJoke);
router.get("/jokes", getJokes);
router.get("/jokes/:id", getJokeById);
router.put("/jokes/:id", verifyToken, updateJoke);
router.delete("/jokes/:id", verifyToken, deleteJoke);

export default router;
