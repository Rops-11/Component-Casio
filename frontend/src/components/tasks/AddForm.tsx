import React, { useState } from "react";
import { ChecklistItemData, NewTask, Task } from "../../types/task.types";
import { TaskManager } from "../../utils/task/TaskManager";

interface AddTaskFormProps {
  onAddTask: (taskData: NewTask) => Promise<void>;
  existingTask?: Task | null;
  onCancelEdit?: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onAddTask,
  existingTask,
  onCancelEdit,
}) => {
  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(
    existingTask?.description || ""
  );
  const [dueDate, setDueDate] = useState(
    existingTask?.dueDate
      ? existingTask.dueDate.toISOString().split("T")[0]
      : ""
  );
  const [type, setType] = useState<NewTask["type"]>(
    existingTask?.type || "basic"
  );
  const [items, setItems] = useState<ChecklistItemData[]>(
    existingTask?.items || []
  );
  const [currentItemText, setCurrentItemText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!existingTask;

  React.useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description || "");
      setDueDate(
        existingTask.dueDate
          ? existingTask.dueDate.toISOString().split("T")[0]
          : ""
      );
      setType(existingTask.type);
      setItems(existingTask.items || []);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setType("basic");
      setItems([]);
    }
  }, [existingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      TaskManager.notifyObservers("Title is required!", "error");
      return;
    }
    setIsLoading(true);
    const taskPayload: NewTask = {
      title,
      description: description || undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      type,
      ...(type === "checklist" && { items }),
      ...(isEditing && { completed: existingTask.completed }),
    };
    if (isEditing && existingTask.id) {
      await onAddTask({ ...taskPayload, id: existingTask.id } as Task);
    } else {
      await onAddTask(taskPayload);
    }

    setIsLoading(false);
    if (!isEditing) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setType("basic");
      setItems([]);
      setCurrentItemText("");
    } else if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleAddItem = () => {
    if (currentItemText.trim()) {
      setItems([...items, { text: currentItemText, completed: false }]);
      setCurrentItemText("");
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 sm:p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">
        {isEditing ? "Edit Task" : "Add New Task"}
      </h2>
      <div className="mb-3">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-slate-600 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="block w-full px-3 py-2 border-slate-300 shadow-sm
           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none rounded-md border p-2"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-slate-600 mb-1">
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as NewTask["type"])}
          className="block w-full px-3 py-2 border-slate-300 shadow-sm
           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none rounded-md border p-2">
          <option value="basic">Basic</option>
          <option value="timed">Timed</option>
          <option value="checklist">Checklist</option>
        </select>
      </div>

      <div className="mb-3">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-600 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="min-h-[60px] block w-full px-3 py-2 border-slate-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none rounded-md border p-2"
        />
      </div>

      {type === "timed" && (
        <div className="mb-3">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-slate-600 mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="block w-full px-3 py-2 border-slate-300 shadow-sm
           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none rounded-md border p-2"
          />
        </div>
      )}

      {type === "checklist" && (
        <div className="mb-3">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Checklist Items
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={currentItemText}
              onChange={(e) => setCurrentItemText(e.target.value)}
              placeholder="New item..."
              className="block w-full px-3 py-2 border-slate-300 shadow-sm
           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none flex-grow rounded-r-none"
            />
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex justify-center items-center px-4 py-2  border-transparent text-sm font-medium  shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed rounded-l-none">
              Add
            </button>
          </div>
          <ul className="space-y-1 max-h-32 overflow-y-auto">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-sm bg-slate-100 p-1.5 rounded">
                <span>{item.text}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700 text-xs">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="inline-flex justify-center items-center px-4 py-2  border-transparent text-sm font-medium  shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed w-full sm:w-auto rounded-md border p-2"
          disabled={isLoading}>
          {isLoading
            ? isEditing
              ? "Saving..."
              : "Adding..."
            : isEditing
            ? "Save Changes"
            : "Add Task"}
        </button>
        {isEditing && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex justify-center items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-100 disabled:cursor-not-allowed w-full sm:w-auto">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
export default AddTaskForm;
