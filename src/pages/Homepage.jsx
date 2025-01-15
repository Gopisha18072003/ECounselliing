import Footer from "../components/Footer";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";

export default function Homepage() {
  return (
    <div>
      <Header />
      <NavigationBar />
      <main className="main flex gap-8 h-[32rem] mx-4 my-6">
        <div className="sidebar w-[30%] bg-gray-200 rounded-md">
          <h1 className="w-full p-2 text-lg font-bold text-center border-b-2 border-gray-300">
            Notices
          </h1>
        </div>
        <div className="main-content w-[70%] bg-gray-200 rounded-md p-2">
          <div className="">
            <h2 className="text-lg font-bold text-start p-2 w-full uppercase">
              Introduction
            </h2>
            <p className="p-2 text-justify">
              The Engineering Entrance Examinations Board was formed as
              Board of Examination for Admission to Engineering
              Degree Colleges in the year 1962, born out of a concept of holding
              a common admission test for the Engineering colleges of the State
              of West Bengal. The basic purpose was to select candidates for
              consideration for admission to the State Colleges on the basis of
              the results of a single competitive examination, which would also
              lead to saving of time, energy and expenditure on the part of the
              candidates in appearing at number of entrance tests.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
