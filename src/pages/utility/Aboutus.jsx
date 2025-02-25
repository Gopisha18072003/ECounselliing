import React from "react";
import engineering from "../../assets/images/engineering.jpg";
import gopi from "../../assets/images/gopi.jpeg";
import aditya from "../../assets/images/aditya.jpg";
import samir from "../../assets/images/samir.jpg"
import abhay from "../../assets/images/abhay.jpg"
export default function AboutUs() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relativ text-center py-20">
        <h1 className="text-4xl font-bold text-blue-500">About Us</h1>
        <p className="mt-2 text-lg">Your gateway to hassle-free engineering admissions</p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8 space-y-12">
        
        {/* About Our Platform */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600">What is E-Counselling?</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Our <span className="font-semibold">E-Counselling platform for Engineering Courses</span> is designed to simplify the 
            admission process by providing students with a seamless and transparent experience. 
            We offer a structured <span className="font-semibold">counselling, college selection, and seat allotment</span> system 
            that helps students secure their desired engineering college.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-600">Why Choose Us?</h2>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>✔️ <span className="font-semibold">Transparent Seat Allotment Process</span></li>
              <li>✔️ <span className="font-semibold">Real-Time Updates & Notifications</span></li>
              <li>✔️ <span className="font-semibold">Personalized Counselling Support</span></li>
              <li>✔️ <span className="font-semibold">Secure & Easy Online Application</span></li>
            </ul>
          </div>

          {/* Image or Illustration */}
          <div className="flex justify-center items-center">
            <img
              src={engineering}
              alt="E-Counselling Illustration"
              className="rounded-lg shadow-md"
            />
          </div>
        </section>

        {/* Our Mission & Vision */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600">Our Mission & Vision</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Our <span className="font-semibold">mission</span> is to bridge the gap between students and their dream engineering colleges 
            by providing a digital, fair, and efficient counselling system. We aim to eliminate 
            traditional paperwork and long queues, making the admission process hassle-free.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Our <span className="font-semibold">vision</span>is to be the <span className="font-semibold">most trusted platform</span> for engineering admissions, ensuring 
            that every student finds the right college based on their merit, preference, and career goals.
          </p>
        </section>

        {/* Optional: Meet Our Team */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-blue-600">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8 mt-6">
            {/* Team Member 1 */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={abhay}
                alt="Team Member"
                className="mx-auto rounded-full max-h-[300px] object-fill"
              />
              <h3 className="text-xl font-semibold mt-3 ">Abhay Shaw</h3>
              <p className="text-gray-500">Project Lead & Backend Developer</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={aditya}
                alt="Team Member"
                className="mx-auto rounded-full"
              />
              <h3 className="text-xl font-semibold mt-3">Aditya Shukla</h3>
              <p className="text-gray-500">Backend Developer</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={gopi}
                alt="Team Member"
                className="mx-auto rounded-full"
              />
              <h3 className="text-xl font-semibold mt-3">Gopi Kumar Shaw</h3>
              <p className="text-gray-500">Frontend Developer</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={samir}
                alt="Team Member"
                className="mx-auto rounded-full"
              />
              <h3 className="text-xl font-semibold mt-3">Samir Kumar</h3>
              <p className="text-gray-500">Frontend Developer & Operations</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
