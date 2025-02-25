import Authentication from "../components/Authentication";
import { useSelector } from "react-redux";
import Notices from "../components/Notices";
import { useLoaderData } from "react-router-dom";

export default function Homepage() {
  const notices = useLoaderData();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-6 pt-6 pb-12">
      {!isAuthenticated && <Authentication />}

      <main className="flex flex-col lg:flex-row gap-8 mx-auto max-w-6xl bg-white shadow-lg rounded-lg p-6">
        {/* Sidebar */}
        <div className="lg:w-2/5 w-full bg-gray-100 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Notice Board</h2>
          <Notices notices={notices} />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/5 w-full bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            The Engineering Entrance Examinations Board was formed as Board of
            Examination for Admission to Engineering Degree Colleges in the year 1962,
            born out of a concept of holding a common admission test for the
            Engineering colleges of the State of West Bengal. The basic purpose was to
            select candidates for consideration for admission to the State Colleges on
            the basis of the results of a single competitive examination, which would
            also lead to saving of time, energy and expenditure on the part of the
            candidates in appearing at a number of entrance tests.
          </p>
        </div>
      </main>
    </div>
  );
}
