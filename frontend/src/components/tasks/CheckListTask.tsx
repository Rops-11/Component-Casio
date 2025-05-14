import React from "react";
import { ChecklistItemData, Task } from "../../types/task.types";

interface ChecklistTaskProps {
  task: Task;
  onUpdateSubItem?: (itemId: string | number, completed: boolean) => void;
  onUpdateTaskItems?: (items: ChecklistItemData[]) => void;
}
const ChecklistTask: React.FC<ChecklistTaskProps> = ({
  task,
  onUpdateTaskItems,
}) => {
  const handleItemToggle = (index: number) => {
    if (task.items && onUpdateTaskItems) {
      const updatedItems = task.items.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      );
      onUpdateTaskItems(updatedItems);
    }
  };

  return (
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
      {task.items && task.items.length > 0 && (
        <ul className="list-none mt-2 space-y-1 pl-0">
          {task.items.map((item, index) => (
            <li
              key={item.id || index}
              className="flex items-center">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleItemToggle(index)}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 accent-blue-500"
                disabled={task.completed}
              />
              <span
                className={`${
                  item.completed ? "line-through text-gray-500" : ""
                } ${task.completed && !item.completed ? "text-gray-400" : ""}`}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ChecklistTask;
