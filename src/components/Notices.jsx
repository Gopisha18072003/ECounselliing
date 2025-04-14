import React, { useEffect, useRef } from "react";

export default function Notices({ notices }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let animationFrameId;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollTop += 1; // Adjust scrolling speed

        if (scrollContainer.scrollTop >= scrollContainer.scrollHeight / 2) {
          scrollContainer.scrollTop = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (!notices || notices.length === 0) {
    return <p className="text-center text-gray-500 h-full flex items-center justify-center"><span>No notices available.</span></p>;
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Latest Notices
      </h2>
      <div ref={scrollContainerRef} className="h-40 overflow-hidden relative">
        <div className="flex flex-col space-y-4" style={{ height: "200%" }}>
          {[...notices, ...notices].map((notice, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-md border-l-4 border-blue-500"
            >
              <h3 className="text-lg font-semibold text-gray-800">{notice.title}</h3>
              <p className="text-gray-600 text-sm truncate">{notice.description}</p>
              <p className="text-gray-500 text-xs mt-1">
                Published on: {new Date(notice.publishedDate).toLocaleDateString("en-GB")}

              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
