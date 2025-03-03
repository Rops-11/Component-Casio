import express, { Request, Response } from "express";
import { UserController } from "../controllers/userController";

const router = express();
const userController = new UserController();

router.get("/", userController.getAllUsers)
router.get("/id", userController.getAllUsers)
router.post("/create", userController.createUser)


export default router;
