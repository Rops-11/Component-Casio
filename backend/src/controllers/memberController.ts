import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MemberController {
  public getAllMembers = async (req: Request, res: Response): Promise<void> => {
    try {
      const members = await prisma.member.findMany();
      res.status(200).json({
        success: true,
        data: members,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public createMember = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        firstName,
        lastName,
        groupName,
        role,
        expectedSalary,
        expectedDateOfDefense,
      } = req.body;

      const member = await prisma.member.create({
        data: {
          firstName,
          lastName,
          groupName,
          role,
          expectedSalary,
          expectedDateOfDefense,
        },
      });

      res.status(201).json({
        success: true,
        data: member,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public updateMember = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const {
        firstName,
        lastName,
        groupName,
        role,
        expectedSalary,
        expectedDateOfDefense,
      } = req.body;

      const member = await prisma.member.update({
        where: { id },
        data: {
          firstName,
          lastName,
          groupName,
          role,
          expectedSalary,
          expectedDateOfDefense,
        },
      });

      res.status(200).json({
        success: true,
        data: member,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public deleteMember = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      await prisma.member.delete({
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: "Member deleted successfully",
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

export default MemberController;
