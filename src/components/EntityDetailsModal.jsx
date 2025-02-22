import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const EntityDetailsModal = ({children, data, isOpen, isLoading, onClose}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-3/5 max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-600 hover:text-gray-900 text-xl"
        >
          <CloseIcon />
        </button>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <CircularProgress />
          </div>
        ) : (
            children && React.cloneElement(children, { data })
        )}
      </div>
    </div>
  );
};

export default EntityDetailsModal;
