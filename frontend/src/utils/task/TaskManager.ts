import { NewTask, Task } from "../../types/task.types";
import { TaskAdapter } from "./TaskAdapter";

class TaskManagerService {
  private static instance: TaskManagerService;

  private constructor() {}

  public static getInstance(): TaskManagerService {
    if (!TaskManagerService.instance) {
      TaskManagerService.instance = new TaskManagerService();
    }
    return TaskManagerService.instance;
  }

  async fetchTasks(): Promise<Task[]> {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/task`);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    const apiTasks = await response.json();
    return apiTasks.map(TaskAdapter.toInternalTask);
  }

  async addTask(taskData: NewTask): Promise<Task> {
    const apiTaskData = TaskAdapter.toApiTask(taskData);
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiTaskData),
    });
    if (!response.ok) throw new Error("Failed to add task");
    const newApiTask = await response.json();
    return TaskAdapter.toInternalTask(newApiTask);
  }

  async removeTask(taskId: string): Promise<void> {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/task/${taskId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok && response.status !== 204) {
      throw new Error("Failed to remove task");
    }
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    const apiUpdates = TaskAdapter.toApiTask(updates, true);

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/task/${taskId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiUpdates),
      }
    );
    if (!response.ok) throw new Error("Failed to update task");
    const updatedApiTask = await response.json();
    return TaskAdapter.toInternalTask(updatedApiTask);
  }

  searchTask(tasks: Task[], query: string): Task[] {
    if (!query.trim()) return tasks;
    const lowerQuery = query.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        (task.description &&
          task.description.toLowerCase().includes(lowerQuery))
    );
  }

  private observers: Array<
    (message: string, type: "overdue" | "general" | "error" | "success") => void
  > = [];

  subscribe(
    observer: (
      message: string,
      type: "overdue" | "general" | "error" | "success"
    ) => void
  ): void {
    this.observers.push(observer);
  }

  unsubscribe(
    observer: (
      message: string,
      type: "overdue" | "general" | "error" | "success"
    ) => void
  ): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(
    message: string,
    type: "overdue" | "general" | "error" | "success"
  ): void {
    this.observers.forEach((observer) => observer(message, type));
  }

  public checkOverdueTasks(tasks: Task[]): void {
    const now = new Date();
    tasks.forEach((task) => {
      if (task.dueDate && task.dueDate < now && !task.completed) {
        this.notifyObservers(`Task "${task.title}" is overdue!`, "overdue");
      }
    });
  }
}

export const TaskManager = TaskManagerService.getInstance();
