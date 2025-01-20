import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SuccessNotification({ status, message, onClose }) {
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
      className={`border-2 bg-green-500 rounded-md flex flex-col gap-2 items-center justify-center fixed right-[2%] top-[20%] w-[300px] shadow-md transition-transform duration-500 overflow-hidden ${
        isVisible ? "translate-x-0" : "translate-x-[110%]"
      }`}
    >
      <div className="flex items-center gap-2 px-4 pt-2  text-white">
        <CheckCircleIcon />
        <span className="text-p">{message}</span>
      </div>
      <div className="relative w-full h-2 bg-green-200 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
