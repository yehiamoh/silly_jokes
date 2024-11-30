import express from "express";
import {register} from "../controllers/auth_controller";

const authRouter = express.Router();

authRouter.post("/auth",register)
export default authRouter;