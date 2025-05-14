import { useEffect, useState, useCallback } from "react";
import { SortingStrategyType } from "../patterns/TaskSortingStrategy";
import { NewTask, Task } from "../types/task.types";
import { TaskManager } from "../utils/task/TaskManager";
import NotificationHandler from "../components/ui/NotificationHandler";
import AddTaskForm from "../components/tasks/AddForm";
import TaskList from "../components/tasks/TaskList";

function ToDoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSortStrategy, setCurrentSortStrategy] =
    useState<SortingStrategyType>("creationDate");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedTasks = await TaskManager.fetchTasks();
      setTasks(fetchedTasks);
      TaskManager.checkOverdueTasks(fetchedTasks);
    } catch (error) {
      let errorMessage = "Failed to load tasks.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      TaskManager.notifyObservers(errorMessage, "error");
      console.error("Load tasks error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
    const intervalId = setInterval(() => {
      setTasks((currentTasks) => {
        TaskManager.checkOverdueTasks(currentTasks);
        return currentTasks;
      });
    }, 60000);
    return () => clearInterval(intervalId);
  }, [loadTasks]);

  const handleAddTask = async (taskData: NewTask | Task) => {
    try {
      let updatedOrNewTask: Task;
      if ("id" in taskData && taskData.id) {
        updatedOrNewTask = await TaskManager.updateTask(
          taskData.id,
          taskData as Partial<Task>
        );
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === updatedOrNewTask.id ? updatedOrNewTask : t
          )
        );
        TaskManager.notifyObservers(
          `Task "${updatedOrNewTask.title}" updated.`,
          "success"
        );
      } else {
        updatedOrNewTask = await TaskManager.addTask(taskData as NewTask);
        setTasks((prevTasks) => [updatedOrNewTask, ...prevTasks]);
        TaskManager.notifyObservers(
          `Task "${updatedOrNewTask.title}" added.`,
          "success"
        );
      }

      TaskManager.checkOverdueTasks([updatedOrNewTask, ...tasks]);
      setEditingTask(null);
    } catch (error) {
      let errorMessage = "Operation failed.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      TaskManager.notifyObservers(errorMessage, "error");
      console.error("Add/Update task error:", error);
    }
  };

  const handleRemoveTask = async (taskId: string) => {
    const taskToRemove = tasks.find((t) => t.id === taskId);
    if (
      window.confirm(
        `Are you sure you want to delete "${
          taskToRemove?.title || "this task"
        }"?`
      )
    ) {
      try {
        await TaskManager.removeTask(taskId);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        TaskManager.notifyObservers(
          `Task "${taskToRemove?.title || "Untitled Task"}" removed.`,
          "success"
        );
      } catch (error) {
        let errorMessage = "Failed to remove task.";
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        TaskManager.notifyObservers(errorMessage, "error");
        console.error("Remove task error:", error);
      }
    }
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await TaskManager.updateTask(taskId, updates);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
      );
      TaskManager.checkOverdueTasks([updatedTask]);
    } catch (error) {
      let errorMessage = "Failed to update task.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      TaskManager.notifyObservers(errorMessage, "error");
      console.error("Update task error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex p-4 md:p-10 justify-center items-start bg-slate-100">
      {" "}
      {}
      <NotificationHandler /> {}
      <div className="container mx-auto p-3 sm:p-6 bg-white rounded-xl shadow-xl w-full max-w-3xl">
        {" "}
        {}
        <header className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600">
            My To-Do List
          </h1>{" "}
          {}
        </header>
        <AddTaskForm
          onAddTask={handleAddTask}
          existingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />
        <div className="my-6 p-4 bg-slate-50 rounded-lg shadow-sm border border-slate-200">
          {" "}
          {}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-2">
            {" "}
            {}
            <h2 className="text-xl font-semibold text-slate-700 mb-2 sm:mb-0">
              Your Tasks
            </h2>
            <div>
              <label
                htmlFor="sort"
                className="mr-2 text-sm font-medium text-slate-600">
                Sort by:
              </label>
              {}
              <select
                id="sort"
                value={currentSortStrategy}
                onChange={(e) =>
                  setCurrentSortStrategy(e.target.value as SortingStrategyType)
                }
                className="form-select py-1.5 text-sm rounded-md border border-slate-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option value="creationDate">Recently Added</option>
                <option value="dueDate">Due Date</option>
                <option value="name">Name (A-Z)</option>
                <option value="id">ID (Oldest)</option>
              </select>
            </div>
          </div>
          {isLoading ? (
            <p className="text-center text-slate-500 py-5">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-slate-500 py-5">
              No tasks yet. Add one above!
            </p>
          ) : (
            <TaskList
              tasks={tasks}
              currentSortStrategy={currentSortStrategy}
              onRemoveTask={handleRemoveTask}
              onUpdateTask={handleUpdateTask}
              onEditTask={setEditingTask}
            />
          )}
        </div>
        <footer className="text-center mt-8 text-sm text-slate-500">
          <p>To-Do App © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
export default ToDoPage;
