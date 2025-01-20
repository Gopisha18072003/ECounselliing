import {useState}  from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Link} from 'react-router-dom';

export default function Authentiction() {
  const [toggleLoginSelection, setToggleLoginSelection] = useState(false);
  const [toggleRegistrationSelection, setToggleRegistrationSelection] =
    useState(false);

  function handleLoginSelection() {
    setToggleLoginSelection((prev) => !prev);
    setToggleRegistrationSelection(false);
  }

  function handleRegistrationSelection() {
    setToggleRegistrationSelection((prev) => !prev);
    setToggleLoginSelection(false);
  }


  return (
    <div className="w-full flex justify-end items-start gap-4 px-4 py-2 h-[155px]">
      {/* if not logged in */}
      <div className='flex flex-col'>
        <button className="text-black font-semibold px-4 py-2 border-2 border-blue-500 rounded-md" onClick={handleLoginSelection}>
            <span>Sign-in</span>
            {
                toggleLoginSelection ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
            }
        </button>
        {
            toggleLoginSelection && (
                <div className='flex flex-col bg-blue-100'>   
                <Link to='/login/student' className=' text-start p-1 border-b-2 border-blue-300 hover:bg-blue-200'>For Students</Link>
                <Link to='/login/college' className='text-start p-1 border-b-2 border-blue-300 hover:bg-blue-200'>For Colleges</Link>
                <Link to='/login/admin' className='text-start p-1 hover:bg-blue-200'>For Administrator</Link>
                </div>
            )
        }
      </div>
        <div className='flex flex-col'>
      <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600" onClick={handleRegistrationSelection}>
        <span>Register</span>
        {
            toggleRegistrationSelection ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
        }
      </button>
        {
            toggleRegistrationSelection && (
                <div className='flex flex-col'>
                <Link to="/register/student" className='bg-yellow-100 border-b-2 border-yellow-300 p-1 hover:bg-yellow-200'>For Students</Link>
                <Link to="/register/college" className='bg-yellow-100 p-1 hover:bg-yellow-200'>For Colleges</Link>
                </div>
            )
        }
      </div>
    </div>
  );
}
