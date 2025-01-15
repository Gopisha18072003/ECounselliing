import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FolderIcon from "@mui/icons-material/Folder";
import ArchiveIcon from "@mui/icons-material/Archive";
import ContactPageIcon from "@mui/icons-material/ContactPage";

export default function NavigationBar() {
  return (
    <nav className="navigation-bar  text-white bg-blue-500 px-8">
      <ul className="p-2 w-2/3 flex justify-between items-center">
        <li>
          <a className="flex flex-row items-center  gap-1">
            <span>Home</span>
            <HomeIcon fontSize="small" />
          </a>
        </li>
        <li>
          <a className="flex flex-row items-center gap-1 active:font-bold">
            <span>About Us</span>
            <InfoIcon fontSize="small" />
          </a>
        </li>
        <li>
          <a className="flex flex-row items-center gap-1">
            <span>Old Question Papers</span>
            <FolderIcon fontSize="small" />
          </a>
        </li>
        <li>
          <a className="flex flex-row items-center gap-1">
            <span>Archive</span>
            <ArchiveIcon fontSize="small" />
          </a>
        </li>
        <li>
          <a className="flex flex-row items-center gap-1">
            <span>Contact Us</span>
            <ContactPageIcon fontSize="small" />
          </a>
        </li>
      </ul>

      {/* {isloggedIn && <ul></ul>} */}
    </nav>
  );
}
