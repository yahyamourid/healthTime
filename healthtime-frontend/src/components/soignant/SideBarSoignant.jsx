import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FaUserDoctor, FaListCheck, FaChartColumn } from "react-icons/fa6";
import { MdOutlineSick } from "react-icons/md";
import { FaHandHoldingMedical, FaUsers  } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegCalendarTimes } from "react-icons/fa";

const SideBarSoignant = () => {
  const menuItems = [
    { name: "Dashboard", icon: <MdOutlineDashboard size={16} />, path: "/soignant/dashboard" },
    { name: "Renedez-vous", icon: <FaRegCalendarTimes size={17} />, path: "/soignant/rendez-vous" },
    { name: "Patients", icon: <FaUsers  size={17} />, path: "/soignant/patients" },
    { name: "Profile", icon: <FaUserDoctor size={16} />, path: "/soignant/profil" }
  ];

  return (
    <div className='fixed top-0 left-0 flex flex-col items-center justify-start py-5 w-1/6 min-h-screen max-h-screen shadow-lg bg-white'>
      <a href='/' className='flex items-center gap-1 text-cadetGray font-extrabold tracking-wide text-2xl w-full px-3'>
        <img src={logo} className='w-6 h-6' alt="Logo" />
        <p className='text-sky-700 italic'><span className='text-sky-400'>Health</span>Time</p>
      </a>
      <div className="flex flex-col w-full mt-20 gap-3 text-sm text-gray-400 tracking-wide px-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-1.5 w-full px-6 py-2 cursor-pointer border-l-4 ${
                isActive ? "text-sky-900 bg-sky-200 border-l-sky-700" : "border-l-white hover:text-gray-600 hover:bg-sky-200 hover:border-l-sky-700"
              } rounded-r-full duration-300`
            }
          >
            {item.icon}
            <p>{item.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBarSoignant;
