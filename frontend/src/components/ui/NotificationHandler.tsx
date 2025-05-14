import React, { useEffect, useState } from "react";
import { TaskManager } from "../../utils/task/TaskManager";
import Notification from "./Notification";

interface AppNotification {
  id: string;
  message: string;
  type: "overdue" | "general" | "error" | "success";
}

const NotificationHandler: React.FC = () => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    const handleNewNotification = (
      message: string,
      type: AppNotification["type"]
    ) => {
      const newNotif = {
        id: Date.now().toString() + Math.random(),
        message,
        type,
      };
      setNotifications((prev) => [newNotif, ...prev.slice(0, 4)]);

      if (type !== "error") {
        setTimeout(
          () => {
            setNotifications((curr) =>
              curr.filter((n) => n.id !== newNotif.id)
            );
          },
          type === "overdue" ? 10000 : 5000
        );
      }
    };

    TaskManager.subscribe(handleNewNotification);

    return () => {
      TaskManager.unsubscribe(handleNewNotification);
    };
  }, []);

  const closeNotification = (id: string) => {
    setNotifications((curr) => curr.filter((n) => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[100] w-full max-w-sm space-y-3">
      {notifications.map((notif) => (
        <Notification
          key={notif.id}
          message={notif.message}
          type={notif.type === "general" ? "info" : notif.type}
          onClose={() => closeNotification(notif.id)}
        />
      ))}
    </div>
  );
};
export default NotificationHandler;
