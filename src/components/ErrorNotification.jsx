import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ErrorNotification({ status, message, onClose }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the slide-in animation
    setIsVisible(true);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onClose) onClose(); // Automatically close the notification
          return prev;
        }
        return prev + 1;
      });
    }, 30); // 30ms intervals for a 3-second total duration

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <div
      className={`border border-red-600 bg-red-500 rounded-lg flex flex-col gap-2 items-center justify-center fixed z-50 right-5 top-20 w-80 shadow-lg transition-transform duration-500 overflow-hidden transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } p-4`}
    >
      <div className="flex items-center gap-2 px-4 pt-2 text-white font-semibold">
        <CancelIcon className="text-white" />
        <span>{message}</span>
      </div>
      <div className="relative w-full h-2 bg-red-300 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-red-700 transition-all ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
