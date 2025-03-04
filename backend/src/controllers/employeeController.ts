import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class EmployeeController {
  public getAllEmployees = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const employees = await prisma.employee.findMany();

      res.status(200).json({
        success: true,
        data: employees,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public createEmployee = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const employeeDetails = req.body;

      const newEmployee = await prisma.employee.create({
        data: employeeDetails,
      });

      res.status(201).json({
        success: true,
        data: newEmployee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}
