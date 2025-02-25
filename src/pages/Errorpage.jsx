import Footer from "../components/Footer";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import React from "react";

export default function ErrorPage(){
    return (
        <>
            <Header/>
            <NavigationBar />
            <main className="flex flex-col justify-center items-center py-[8rem]">
                <h1 className="text-[14rem] font-roboto font-bold">404</h1>
                <p className="text-[2rem] text-gray-500 font-roboto uppercase">Page Not Found!</p>
            </main>
            <Footer />
        </>
    )
}