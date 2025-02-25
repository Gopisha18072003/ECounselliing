import React from "react";
import { Mail } from "lucide-react"; // Using lucide-react for the mail icon

export default function ContactUs() {
  const adminEmail = "admin@ecounselling.com"; // Change to your actual email

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-600">Contact Us</h1>
        <p className="mt-2 text-gray-600">
          Reach out to us for any queries related to engineering admissions.
        </p>

        {/* Contact Info */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Email</h2>
          <p className="mt-2 text-lg text-gray-700">{adminEmail}</p>
        </div>

        {/* Mail Button */}
        <div className="mt-6">
          <a
            href={`mailto:${adminEmail}`}
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-all shadow-md"
          >
            <Mail className="w-5 h-5 mr-2" /> Mail to Admin
          </a>
        </div>
      </div>
    </div>
  );
}
