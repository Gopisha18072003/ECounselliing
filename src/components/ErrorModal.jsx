import React, { forwardRef, useImperativeHandle, useRef } from "react";

const ErrorModal = forwardRef(({ title, errors }, ref) => {
  const dialogRef = useRef();

  // Expose the `open` and `close` methods using `useImperativeHandle`
  useImperativeHandle(ref, () => ({
    open() {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    },
    close() {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    },
  }));

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg bg-white shadow-xl p-6 max-w-md w-full"
    >
      <h2 className="text-lg font-bold mb-4">{title || "Something went wrong"}</h2>
      <ul className="list-disc pl-5 mb-4">
        {errors && Object.keys(errors).length > 0 ? (
          errors.map((error, index) => (
            <li key={index} className="text-red-600">
              {error}
            </li>
          ))
        ) : (
          <li className="text-gray-600">No errors to display.</li>
        )}
      </ul>
      <div className="flex justify-end">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => dialogRef.current.close()}
        >
          Close
        </button>
      </div>
    </dialog>
  );
});

export default ErrorModal;
