import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NavigationBar from "../components/NavigationBar";
import NotificationManager from "./NotificationManager";
import React from "react";

export default function RootLayout() {
  return (
    <>
      <Header />
      <NavigationBar />
      <NotificationManager/>
      <Outlet/>
      <Footer />
    </>
  );
}
