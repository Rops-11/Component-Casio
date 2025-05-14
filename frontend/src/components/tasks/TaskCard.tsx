import React from "react";
import {
  BellIcon,
  TrashIcon,
  PencilSquareIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";
import { Task } from "../../types/task.types";

interface TaskCardProps {
  task: Task;
  children: React.ReactNode;
  onRemove: () => void;
  onToggleComplete: () => void;
  onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  children,
  onRemove,
  onToggleComplete,
  onEdit,
}) => {
  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  return (
    <div
      className={`relative p-4 border rounded-lg shadow-md transition-all duration-200
            ${
              task.completed
                ? "bg-green-50 border-green-200"
                : "bg-white hover:shadow-lg"
            }
            ${
              isOverdue
                ? "border-red-400 bg-red-50"
                : task.completed
                ? "border-green-200"
                : "border-gray-200"
            }
        `}>
      {task.dueDate && !task.completed && (
        <span
          className={`absolute top-2 right-2 p-1 rounded-full
                        ${
                          isOverdue
                            ? "text-red-600 bg-red-100"
                            : "text-yellow-600 bg-yellow-100"
                        }
                    `}
          title={isOverdue ? "Task is Overdue!" : "Reminder Set"}>
          <BellIcon className="h-5 w-5" />
        </span>
      )}

      <div className="pr-10">{children}</div>

      <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
        <button
          onClick={onToggleComplete}
          className={`flex items-center px-3 py-1 rounded text-sm font-medium transition-colors
                        ${
                          task.completed
                            ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
          title={task.completed ? "Mark as Incomplete" : "Mark as Complete"}>
          {task.completed ? (
            <CheckCircleSolidIcon className="h-5 w-5 mr-1 text-green-600" />
          ) : (
            <CheckCircleIcon className="h-5 w-5 mr-1" />
          )}
          {task.completed ? "Completed" : "Complete"}
        </button>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
            title="Edit Task">
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button
            onClick={onRemove}
            className="p-1 text-gray-500 hover:text-red-600 transition-colors"
            title="Remove Task">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isOverdue && (
        <div className="mt-2 text-xs text-red-700 font-medium p-2 bg-red-100 rounded">
          This task is overdue!
        </div>
      )}
    </div>
  );
};

export default TaskCard;
