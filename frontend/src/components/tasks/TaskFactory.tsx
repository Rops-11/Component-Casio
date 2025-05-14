import React from "react";
import BasicTask from "./BasicTask";
import TimedTask from "./TimedTask";
import ChecklistTask from "./CheckListTask";
import { ChecklistItemData, Task } from "../../types/task.types";

interface TaskFactoryProps {
  type: Task["type"];
  taskData: Task;
  onUpdateTaskItems?: (items: ChecklistItemData[]) => void;
}

const TaskFactory: React.FC<TaskFactoryProps> = ({
  type,
  taskData,
  onUpdateTaskItems,
}) => {
  switch (type) {
    case "basic":
      return <BasicTask task={taskData} />;
    case "timed":
      return <TimedTask task={taskData} />;
    case "checklist":
      return (
        <ChecklistTask
          task={taskData}
          onUpdateTaskItems={onUpdateTaskItems}
        />
      );
    default:
      console.warn(
        `Unknown task type: ${type}. Rendering BasicTask as fallback.`
      );
      return (
        <BasicTask
          task={{ ...taskData, title: `(Unsupported Type) ${taskData.title}` }}
        />
      );
  }
};
export default TaskFactory;
