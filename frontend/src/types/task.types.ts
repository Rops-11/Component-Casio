export interface ChecklistItemData {
  id?: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  type: "basic" | "timed" | "checklist";
  completed: boolean;
  items?: ChecklistItemData[];
}

export interface NewTask {
  title: string;
  description?: string;
  dueDate?: Date;
  type: Task["type"];
  items?: ChecklistItemData[];
}
