import React from "react";
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

interface NotificationProps {
  message: string;
  type: "info" | "warning" | "success" | "error" | "overdue";
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  let bgColor, textColor, Icon;

  switch (type) {
    case "success":
      bgColor = "bg-green-100";
      textColor = "text-green-700";
      Icon = CheckCircleIcon;
      break;
    case "warning":
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-700";
      Icon = ExclamationTriangleIcon;
      break;
    case "error":
      bgColor = "bg-red-100";
      textColor = "text-red-700";
      Icon = XCircleIcon;
      break;
    case "overdue":
      bgColor = "bg-orange-100";
      textColor = "text-orange-700";
      Icon = ExclamationTriangleIcon;
      break;
    case "info":
    default:
      bgColor = "bg-blue-100";
      textColor = "text-blue-700";
      Icon = InformationCircleIcon;
      break;
  }

  return (
    <div
      className={`${bgColor} ${textColor} p-4 rounded-md shadow-lg flex items-center space-x-3`}>
      <Icon className={`h-6 w-6 ${textColor}`} />
      <span className="flex-grow">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className={`${textColor} opacity-70 hover:opacity-100`}>
          <XCircleIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Notification;
