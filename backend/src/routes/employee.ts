import express, { Request, Response } from "express";
import { EmployeeController } from "../controllers/employeeController";

const router = express();
const employeeController = new EmployeeController();

router.get("/", employeeController.getAllEmployees);
router.post("/", employeeController.createEmployee);

export default router;
