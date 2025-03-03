import express, { Request, Response } from "express";
import { UserController } from "../controllers/userController";

const router = express();
const userController = new UserController();

router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUserById)
router.post("/", userController.createUser)
router.delete("/:id", userController.deleteUser)


export default router;
