import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, type, items } = req.body;
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        type,
        completed: false,
        items:
          type === "checklist" && items
            ? {
                create: items.map(
                  (item: { text: string; completed: boolean }) => ({
                    text: item.text,
                    completed: item.completed || false,
                  })
                ),
              }
            : undefined,
      },
      include: { items: true },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      dueDate,
      type: typeFromRequest,
      completed,
      items,
    } = req.body;

    const existingTaskDetails = await prisma.task.findUnique({
      where: { id },
      select: { type: true },
    });

    if (!existingTaskDetails) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    const effectiveType = typeFromRequest || existingTaskDetails.type;

    const updateData: Prisma.TaskUpdateInput = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (typeFromRequest !== undefined) updateData.type = typeFromRequest;
    if (completed !== undefined) updateData.completed = completed;

    if (dueDate !== undefined) {
      updateData.dueDate = dueDate ? new Date(dueDate) : null;
    }

    if (effectiveType === "checklist") {
      if (items !== undefined) {
        await prisma.checklistItem.deleteMany({ where: { taskId: id } });
        if (Array.isArray(items) && items.length > 0) {
          updateData.items = {
            create: items.map((item: { text: string; completed: boolean }) => ({
              text: item.text,
              completed: item.completed,
            })),
          };
        }
      }
    } else if (
      typeFromRequest &&
      typeFromRequest !== "checklist" &&
      existingTaskDetails.type === "checklist"
    ) {
      await prisma.checklistItem.deleteMany({ where: { taskId: id } });
    }

    if (Object.keys(updateData).length === 0 && items === undefined) {
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: updateData,
      include: { items: true },
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Update error in taskController:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
