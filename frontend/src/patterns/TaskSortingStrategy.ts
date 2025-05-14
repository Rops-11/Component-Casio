import { Task } from "../types/task.types";

export type SortingStrategyType = "dueDate" | "name" | "id" | "creationDate";

type SortFunction = (tasks: Task[]) => Task[];

const sortByDueDate: SortFunction = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
};

const sortByName: SortFunction = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return a.title.localeCompare(b.title);
  });
};

const sortById: SortFunction = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return a.id.localeCompare(b.id);
  });
};

const sortByCreationDate: SortFunction = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return b.id.localeCompare(a.id);
  });
};

export const TaskSortingStrategy = {
  dueDate: sortByDueDate,
  name: sortByName,
  id: sortById,
  creationDate: sortByCreationDate,
};
