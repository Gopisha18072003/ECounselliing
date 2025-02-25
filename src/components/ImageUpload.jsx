import { useRef } from "react";
import dummyImage from "../assets/images/dummy.png";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from "react";
export default function ImageUpload({ label, onImageChange, previewImage }) {
  const fileInputRef = useRef(null);
  return (
    <div className="mb-4 w-full flex flex-col justify-center items-center">
      {label && (
        <label className="block text-p font-medium text-gray-700">
          {label}
        </label>
      )}

      {previewImage && (
        <img
          src={previewImage}
          alt="Selected"
          className="mt-2 h-24 w-24 rounded-full object-cover"
        />
      )}
      {!previewImage && (
        <img
          src={dummyImage}
          alt="Selected"
          className="mt-2 h-24 w-24 rounded-full object-cover ring-2 ring-blue-500"
        />
      )}
      <input
        type="file"
        accept="image/*"
        name="image"
        onChange={onImageChange}
        className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer hidden"
        ref={fileInputRef}
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md text-p font-medium"
        type="button"
      >
       <CloudUploadIcon /> Upload Image
      </button>
    </div>
  );
}
