import React from "react";
import { useLoaderData } from "react-router-dom";
import { fetchNotices } from "../../utils/http";

export default function AllNotices() {
  const notices = useLoaderData(); // Get notices from loader
    console.log(notices);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-4">All Notices</h1>

        {/* If no notices available */}
        {notices.length === 0 ? (
          <p className="text-gray-600">No notices available.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {notices.map((notice) => (
              <li key={notice.id} className="py-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {notice.title}
                </h2>
                <p className="text-gray-600 mt-1">{notice.description}</p>
                <span className="text-sm text-gray-500">
                  Published on:{" "}
                  {new Date(notice.publishedDate).toLocaleDateString("en-GB")}
                  </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export async function noticesLoader() {
  try {
    const response = await fetchNotices();
    return response;
  } catch (err) {
    console.error("Loader error:", err);
    throw new Response("Error loading notices", { status: 500 });
  }
}
