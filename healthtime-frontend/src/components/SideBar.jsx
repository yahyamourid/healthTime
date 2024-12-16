// src/components/SideBar.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IoMdSchool, IoMdClock } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaTasks, FaUserClock, FaHistory, FaUsersCog, FaChartLine, FaUserCog  } from "react-icons/fa";
import { MdOutlineAppRegistration, MdTopic } from "react-icons/md";
import { GiReceiveMoney, GiPayMoney, GiMoneyStack } from "react-icons/gi";
import Logout from './Logout';
import axios from 'axios';
import config from '../config';
const SideBar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const [taskNbr, setTaskNbr] = useState(0)

    useEffect(() => {
        getTasksNotViewed()
    }, [])

    const getTasksNotViewed = async () => {
        if (storedUserData.role === "ADMIN") {
            try {
                const rep = await axios.get(`${config.BACKEND_URL}/tasks/user/${storedUserData.id}/notViewed`)

                setTaskNbr(rep.data.length)
            } catch (error) {
                console.log(error);
            }
        }
    }

    const makeTasksViewed = async () => {
        if (taskNbr > 0) {
            try {
                await axios.put(`${config.BACKEND_URL}/tasks/user/${storedUserData.id}/mark-as-viewed`)
                setTaskNbr(0)
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div className='fixed top-0 left-0 flex flex-col items-center justify-start py-5 w-1/6 min-h-screen max-h-screen shadow-lg bg-white '>
            <div className='flex items-center gap-1 pb-3 text-dimGray font-extrabold tracking-wide text-3xl w-3/4 h-1/12 '>
                <IoMdSchool className='text-burntSienna' />
                <p><span className='text-burntSienna'>IS</span>EEM</p>
            </div>

            <div className="flex flex-col gap-2 px-2 text-sm font-medium tracking-wide text-dimGray w-full ">
                {/* <NavLink to="/dashboard" className={`flex items-center gap-3 px-4 py-1 rounded-r-xl hover:bg-whiteSmoke hover:text-burntSienna duration-150 hover:border-l-2 hover:border-l-burntSienna ${isActive('/dashboard') ? 'bg-whiteSmoke text-burntSienna border-l-2 border-l-burntSienna' : ''}`}>
                    <LuLayoutDashboard className='w-4 h-4' />
                    <p>Dashboard</p>
                </NavLink> */}
                <NavLink to="/taches" className={`flex items-center gap-3 px-4 py-1 rounded-r-xl hover:bg-whiteSmoke hover:text-burntSienna duration-150 hover:border-l-2 hover:border-l-burntSienna ${isActive('/taches') ? 'bg-whiteSmoke text-burntSienna border-l-2 border-l-burntSienna' : ''}`}>
                    <FaTasks className='w-4 h-4' />
                    {storedUserData && storedUserData.role === 'ADMIN' ?
                        <div className="flex justify-between w-full" onClick={() => makeTasksViewed()}>
                            <p>Mes tâches</p>
                            {taskNbr > 0 && <p className='bg-red-400 text-center w-5 h-5 rounded-full text-white'>{taskNbr}</p>}
                        </div>
                        :
                        <p>Tâches</p>
                    }
                </NavLink>
                <NavLink to="/formations" className={`flex items-center gap-3 px-4 py-1 rounded-r-xl hover:bg-whiteSmoke hover:text-burntSienna duration-150 hover:border-l-2 hover:border-l-burntSienna ${isActive('/formations') ? 'bg-whiteSmoke text-burntSienna border-l-2 border-l-burntSienna' : ''}`}>
                    <MdTopic className='w-4 h-4' />
                    <p>Formations</p>
                </NavLink>
                <NavLink to="/leads" className={`flex items-center gap-3 px-4 py-1 rounded-r-xl hover:bg-whiteSmoke hover:text-burntSienna duration-150 hover:border-l-2 hover:border-l-burntSienna ${isActive('/leads') ? 'bg-whiteSmoke text-burntSienna border-l-2 border-l-burntSienna' : ''}`}>
                    <FaUserClock className='w-4 h-4' />
                    <p>Leads</p>
                </NavLink>
                {/* <NavLink to="/clients" className={`flex items-center gap-3 px-4 py-1 rounded-r-xl hover:bg-whiteSmoke hover:text-burntSienna duration-150 hover:border-l-2 hover:border-l-burntSienna ${isActive('/clients') ? 'bg-whiteSmoke text-burntSienna border-l-2 border-l-burntSienna' : ''}`}>
                    <FaUserGraduate className='w-4 h-4' />
                    <p>Clients</p>
                </NavLink> */}
                <NavLink to="/rendezvous" className={`flex items-center gap-3 px-4 py-1 rounded-r-xl hover:bg-whiteSmoke hover:text-burntSienna duration-150 hover:border-l-2 hover:border-l-burntSienna ${isActive('/rendezvous') ? 'bg-whiteSmoke text-burntSienna border-l-2 border-l-burntSienna' : ''}`}>
                    <IoMdClock className='w-4 h-4' />
                    <p>Rendez-Vous</p>
                </NavLink>
                <NavLink to="/caisse" className={`flex items-center gap-3 px-4 py-1 rounded-r-xl hover:bg-whiteSmoke hover:text-burntSienna duration-150 hover:border-l-2 hover:border-l-burntSienna ${storedUserData && storedUserData.role === 'ADMIN' && 'hidden'} ${isActive('/caisse') ? 'bg-whiteSmoke text-burntSienna border-l-2 border-l-burntSienna' : ''}`}>
                    <GiMoneyStack className='w-4 h-4' />
                    <p>Caisse</p>
                </NavLink>
                {/* <NavLink to="/inscription" className={`flex items-center gap-3 px-4 py-1 rounded-r-xl hover:bg-whiteSmoke hover:text-burntSienna duration-150 hover:border-l-2 hover:border-l-burntSienna ${isActive('/inscription') ? 'bg-whiteSmoke text-burntSienna border-l-2 border-l-burntSienna' : ''}`}>
                    <MdOutlineAppRegistration className='w-4 h-4' />
                    <p>Inscription</p>
                </NavLink> */}
                <NavLink to="/utilisateurs" className={`flex items-center gap-3 px-4 py-1 rounded-r-xl hover:bg-whiteSmoke hover:text-burntSienna duration-150 hover:border-l-2 hover:border-l-burntSienna ${storedUserData && storedUserData.role === 'ADMIN' && 'hidden'} ${isActive('/utilisateurs') ? 'bg-whiteSmoke text-burntSienna border-l-2 border-l-burntSienna' : ''}`}>
                    <FaUsersCog className='w-4 h-4' />
                    <p>Utilisateurs</p>
                </NavLink>
                <NavLink to="/statistiques" className={`flex items-center gap-3 px-4 py-1 rounded-r-xl hover:bg-whiteSmoke hover:text-burntSienna duration-150 hover:border-l-2 hover:border-l-burntSienna ${storedUserData && storedUserData.role === 'ADMIN' && 'hidden'} ${isActive('/statistiques') ? 'bg-whiteSmoke text-burntSienna border-l-2 border-l-burntSienna' : ''}`}>
                    <FaChartLine className='w-4 h-4' />
                    <p>Statistiques</p>
                </NavLink>
                <NavLink to="/historiques" className={`flex items-center gap-3 px-4 py-1 rounded-r-xl hover:bg-whiteSmoke hover:text-burntSienna duration-150 hover:border-l-2 hover:border-l-burntSienna ${storedUserData && storedUserData.role === 'ADMIN' && 'hidden'} ${isActive('/historiques') ? 'bg-whiteSmoke text-burntSienna border-l-2 border-l-burntSienna' : ''}`}>
                    <FaHistory className='w-4 h-4' />
                    <p>Historiques</p>
                </NavLink>
                <NavLink to="/profil" className={`flex items-center gap-3 px-4 py-1 rounded-r-xl hover:bg-whiteSmoke hover:text-burntSienna duration-150 hover:border-l-2 hover:border-l-burntSienna ${isActive('/profil') ? 'bg-whiteSmoke text-burntSienna border-l-2 border-l-burntSienna' : ''}`}>
                    <FaUserCog  className='w-4 h-4' />
                    <p>Profile</p>
                </NavLink>
            </div>
            <Logout />
        </div>
    );
};

export default SideBar;
