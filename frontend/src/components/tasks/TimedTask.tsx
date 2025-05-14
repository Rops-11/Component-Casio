import React from "react";
import { Task } from "../../types/task.types";

interface TimedTaskProps {
  task: Task;
}

const TimedTask: React.FC<TimedTaskProps> = ({ task }) => (
  <div>
    <h3
      className={`text-lg font-semibold ${
        task.completed ? "line-through text-gray-500" : ""
      }`}>
      {task.title}
    </h3>
    {task.description && (
      <p
        className={`text-sm text-gray-600 ${
          task.completed ? "line-through" : ""
        }`}>
        {task.description}
      </p>
    )}
    {task.dueDate && (
      <p
        className={`text-xs text-gray-500 mt-1 ${
          task.completed ? "line-through" : ""
        }`}>
        Due: {task.dueDate.toLocaleDateString()}
      </p>
    )}
  </div>
);
export default TimedTask;
