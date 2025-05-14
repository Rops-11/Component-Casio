import { NewTask, Task } from "../../types/task.types";

interface ApiTask {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  type: "basic" | "timed" | "checklist";
  completed: boolean;
  items?: Array<{ id: string; text: string; completed: boolean }>;
  createdAt: string;
  updatedAt: string;
}

interface ApiNewTask {
  title: string;
  description?: string;
  dueDate?: string | null;
  type: Task["type"];
  completed?: boolean;
  items?: Array<{ text: string; completed: boolean }>;
}

export class TaskAdapter {
  static toInternalTask(apiTask: ApiTask): Task {
    return {
      id: apiTask.id,
      title: apiTask.title,
      description: apiTask.description,
      dueDate: apiTask.dueDate ? new Date(apiTask.dueDate) : undefined,
      type: apiTask.type,
      completed: apiTask.completed,
      items: apiTask.items?.map((item) => ({
        id: item.id,
        text: item.text,
        completed: item.completed,
      })),
    };
  }

  static toApiTask(
    internalTask: Partial<Task> | NewTask,
    isUpdate: boolean = false
  ): Partial<ApiNewTask> {
    const apiTask: Partial<ApiNewTask> = {};

    if ("title" in internalTask && internalTask.title !== undefined)
      apiTask.title = internalTask.title;
    if ("description" in internalTask)
      apiTask.description = internalTask.description;

    if (internalTask.dueDate === null) {
      apiTask.dueDate = null;
    } else if (internalTask.dueDate instanceof Date) {
      apiTask.dueDate = internalTask.dueDate.toISOString();
    }
    
    if ("type" in internalTask && internalTask.type !== undefined)
      apiTask.type = internalTask.type;
    if ("completed" in internalTask && internalTask.completed !== undefined)
      apiTask.completed = internalTask.completed;

    if ("items" in internalTask && internalTask.items) {
      apiTask.items = internalTask.items.map((item) => ({
        text: item.text,
        completed: item.completed,
      }));
    }

    return apiTask;
  }
}
