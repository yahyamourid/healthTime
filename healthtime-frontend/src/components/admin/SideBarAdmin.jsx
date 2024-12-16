import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FaUserDoctor, FaListCheck, FaChartColumn } from "react-icons/fa6";
import { MdOutlineSick } from "react-icons/md";
import { FaHandHoldingMedical } from "react-icons/fa";

const SideBarAdmin = () => {
  const menuItems = [
    { name: "Soignants", icon: <FaUserDoctor size={16} />, path: "/admin/soignants" },
    { name: "Patients", icon: <MdOutlineSick size={17} />, path: "/admin/patients" },
    { name: "Demandes", icon: <FaListCheck size={16} />, path: "/admin/demandes" },
    { name: "Spécialités", icon: <FaHandHoldingMedical size={16} />, path: "/admin/specialites" },
    { name: "Statistiques", icon: <FaChartColumn size={16} />, path: "/admin/statistiques" },
  ];

  return (
    <div className='fixed top-0 left-0 flex flex-col items-center justify-start py-5 w-1/6 min-h-screen max-h-screen shadow-lg bg-white'>
      <a href='/' className='flex items-center gap-1 text-cadetGray font-extrabold tracking-wide text-2xl w-full px-3'>
        <img src={logo} className='w-6 h-6' alt="Logo" />
        <p className='text-sky-700 italic'><span className='text-orange-400'>Health</span>Time</p>
      </a>
      <div className="flex flex-col w-full mt-20 gap-3 text-sm text-gray-400 tracking-wide px-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-1.5 w-full px-6 py-2 cursor-pointer border-l-4 ${
                isActive ? "text-sky-900 bg-orange-200 border-l-sky-700" : "border-l-white hover:text-gray-600 hover:bg-orange-200 hover:border-l-sky-700"
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

export default SideBarAdmin;
