// frontend/src/components/TaskList.tsx
import React from "react";
import TaskFactory from "./TaskFactory";
import {
  SortingStrategyType,
  TaskSortingStrategy,
} from "../../patterns/TaskSortingStrategy";
import { ChecklistItemData, Task } from "../../types/task.types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  currentSortStrategy: SortingStrategyType;
  onRemoveTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  currentSortStrategy,
  onRemoveTask,
  onUpdateTask,
  onEditTask,
}) => {
  const sortedTasks = TaskSortingStrategy[currentSortStrategy](tasks);

  if (tasks.length === 0) {
    return (
      <p className="text-center text-slate-500 py-8">
        No tasks yet. Add one above!
      </p>
    );
  }

  const handleChecklistItemsUpdate = (
    taskId: string,
    items: ChecklistItemData[]
  ) => {
    onUpdateTask(taskId, { items });
  };
  
  const handleToggleComplete = (task: Task) => {
    onUpdateTask(task.id, { completed: !task.completed });
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Sample TaskFactory */}
      {/* <div className="my-6 p-3 border border-dashed border-slate-300 rounded-md">
        <h2 className="text-lg font-medium mb-2 text-slate-600">
          TaskFactory Examples:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2 border rounded-md bg-white">
            <span className="font-semibold">Basic:</span>{" "}
            <TaskFactory
              type="basic"
              taskData={{
                id: "fb",
                title: "Factory Basic",
                type: "basic",
                completed: false,
              }}
            />
          </div>
          <div className="p-2 border rounded-md bg-white">
            <span className="font-semibold">Timed:</span>{" "}
            <TaskFactory
              type="timed"
              taskData={{
                id: "ft",
                title: "Factory Timed",
                dueDate: new Date(),
                type: "timed",
                completed: false,
              }}
            />
          </div>
          <div className="p-2 border rounded-md bg-white">
            <span className="font-semibold">Checklist:</span>{" "}
            <TaskFactory
              type="checklist"
              taskData={{
                id: "fc",
                title: "Factory Checklist",
                type: "checklist",
                items: [{ text: "Item 1", completed: false }],
                completed: false,
              }}
            />
          </div>
        </div>
      </div> */}

      {sortedTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onRemove={() => onRemoveTask(task.id)}
          onToggleComplete={() => handleToggleComplete(task)}
          onEdit={() => onEditTask(task)}>
          <TaskFactory
            type={task.type}
            taskData={task}
            onUpdateTaskItems={(items) =>
              handleChecklistItemsUpdate(task.id, items)
            }
          />
        </TaskCard>
      ))}
    </div>
  );
};
export default TaskList;
