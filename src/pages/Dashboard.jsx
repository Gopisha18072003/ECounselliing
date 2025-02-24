import { useSelector } from "react-redux";
import StudentDashboard from "./student/Dashboard";
import AdminDashboard from "./administration/Dashboard";
import CollegeDashboard from "./college/Dashboard";
import { redirect, useNavigate } from "react-router-dom";

export default function DashboardPage() {
    const ROLE = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : undefined;
    let component = undefined;

    
    if (ROLE === 'STUDENT') {
        component = <StudentDashboard />;
    } else if (ROLE === 'COLLEGE') {
        component = <CollegeDashboard />;
    } else if(ROLE === 'ADMIN') {
        component = <AdminDashboard />;
    }else {
       redirect("/");
    }

    return component;
}
