import { useSelector } from "react-redux";
import StudentDashboard from "./student/Dashboard";
import AdminDashboard from "./administration/Dashboard";
import CollegeDashboard from "./college/Dashboard";

export default function DashboardPage() {
    const ROLE = useSelector((state) => state.auth.user?.role);
    let component = undefined;
    
    if (ROLE === 'STUDENT') {
        component = <StudentDashboard />;
    } else if (ROLE === 'COLLEGE') {
        component = <CollegeDashboard />;
    } else {
        component = <AdminDashboard />;
    }

    return component;
}
