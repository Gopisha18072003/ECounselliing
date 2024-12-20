import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Input";
import { useState } from "react";
import { GoHomeFill } from "react-icons/go";


export default function Login(){
    const [step, setStep] = useState(1);    
    
    return (
      <div className="container">
        {/* Header Section */}
        <Header />
  
        {/*Nav Bar*/}
        <nav className="h-[2.5rem] w-full bg-blue-500 text-white text-p py-1 px-[1rem]">
          <ul>
            <li>
              <a className="flex items-center cursor-pointer" href="#">
                <GoHomeFill />
                <span className="text-p font-semibold">Home</span>
              </a>
            </li>
          </ul>
        </nav>
  
        {/* Main Content */}
        <div className="min-h-screen  flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-8 w-2/5 my-12">
            <h1 className="text-h3 font-bold text-center mb-6 uppercase">
              Login for Candidates
            </h1>

            <div className="h-[2rem]"></div>
            <form>
              <div
                className={`transition-transform duration-500 ease-in-out ${
                  step === 1 ? " flex flex-col gap-4" : "hidden"
                }`}
              >
                {/* Login Credentials */}
                {/* Inputs */}
                <Input
                  name="applicationId"
                  id="applicationId"
                  label="Application ID"
                  placeholder="Gopi Kumar Shaw123"
                  onChange={() => {}}
                  required
                />
                <Input
                  name="email"
                  id="email"
                  label="Email"
                  placeholder="gopi123@dummy.com"
                  onChange={() => {}}
                  required
                />
                <Input
                  name="password"
                  id="password"
                  label="Password"
                  placeholder="gopi@123321"
                  onChange={() => {}}
                  required
                />

                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-p"
                >
                  Sign-In
                </button>
              </div>

              <div style={{ textAlign:"center"}}>
                <a href="#" style={{textDecoration:"underline",color:"blue",fontSize:"15px"}}>
                  Don't have an account yet, Sign-up
                </a>
              </div>

            </form>
          </div>
        </div>
        {/* Footer Section */}
        <Footer />
      </div>
    );
}