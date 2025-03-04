import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserController {
  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await prisma.user.findMany();

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const user = await prisma.user.findUnique({ where: { id: userId } });

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, age } = req.body;

      const newUser = await prisma.user.create({
        data: {
          name: name,
          age: age,
        },
      });

      res.status(201).json({
        success: true,
        data: newUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const user = await prisma.user.delete({ where: { id: userId } });

      res.status(201).json({
        success: true,
        data: user,
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
