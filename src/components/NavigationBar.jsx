import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FolderIcon from "@mui/icons-material/Folder";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
export default function NavigationBar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.user);
  return (
    <nav className="navigation-bar  text-white bg-blue-500 px-8 flex justify-between h-[4rem]">
      <ul className="pt-2 px-2 w-2/3 flex justify-between items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-row items-center gap-1 pb-2 ${
                isActive ? "font-bold border-b-2 border-white" : ""
              }`
            }
            end={true}
          >
            <span>Home</span>
            <HomeIcon fontSize="small" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              `flex flex-row items-center gap-1 pb-2 ${
                isActive ? "font-bold border-b-2 border-white" : ""
              }`
            }
          >
            <span>About Us</span>
            <InfoIcon fontSize="small" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notices"
            className={({ isActive }) =>
              `flex flex-row items-center gap-1 pb-2 ${
                isActive ? "font-bold border-b-2 border-white" : ""
              }`
            }
          >
            <span>Notices</span>
            <NotificationsIcon fontSize="small" />
          </NavLink>
        </li>
        
        <li>
          <NavLink
            to="/contactus"
            className={({ isActive }) =>
              `flex flex-row items-center gap-1 pb-2 ${
                isActive ? "font-bold border-b-2 border-white" : ""
              }`
            }
          >
            <span>Contact Us</span>
            <ContactPageIcon fontSize="small" />
          </NavLink>
        </li>
      </ul>

      {/* {isloggedIn && <ul></ul>} */}
      {
        isAuthenticated && (
          <ul className="w-1/3 flex justify-end items-center gap-2">
            {
              (userData.role !== "ADMIN") && <img src={userData.img||userData.logo} alt="user profile" className="w-[2rem] h-[2rem] rounded-full border-2 border-white"/>
            }
            <Link to="/dashboard" className="cursors-pointer">{userData.studentName || userData.collegeName || "My Dashboard"}</Link>
          </ul>
        )
      }
    </nav>
  );
}
