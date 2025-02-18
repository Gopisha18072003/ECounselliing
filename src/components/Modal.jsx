import { forwardRef, useImperativeHandle, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';

const Modal = forwardRef(({ children, title }, ref) => {
  const modalRef = useRef();

  // Expose open and close functions to parent
  useImperativeHandle(ref, () => ({
    open: () => modalRef.current.showModal(),
    close: () => modalRef.current.close(),
  }));

  return (
    <dialog
      ref={modalRef}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full backdrop:bg-black/50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={() => modalRef.current.close()} className="text-gray-500 hover:text-gray-800 font-bold">
          <CloseIcon/>
        </button>
      </div>
      <div>{children}</div>
    </dialog>
  );
});

export default Modal;
