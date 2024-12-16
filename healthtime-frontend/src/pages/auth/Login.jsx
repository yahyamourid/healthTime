import React, { useState } from 'react'
import login from '../../assets/login.png'
import { IoMdSchool, IoMdClock } from "react-icons/io";
import { MdOutlineMail, MdKey } from "react-icons/md";
import logo from '../../assets/logo.png';
import config from '../../config';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader'
import ToastComponent, { showErrorToast, showSuccessToast, showWarnToast, showInfoToast } from '../../components/ToastComponent';
import { jwtDecode } from 'jwt-decode';


const Login = () => {
    const back = import.meta.env.VITE_BACK_URL;
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [formdata, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChangeFormData = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value })
    }

    const decodeToken = (token) => {
        const decodedToken = jwtDecode(token);
        const userData = {
            role: decodedToken.role,
            block: decodedToken.block,
            id: decodedToken.id,
            nom: decodedToken.nom,
            prenom: decodedToken.prenom,
            email: decodedToken.sub,
            token: token
        };
        console.log(userData);

        localStorage.setItem('userData', JSON.stringify(userData));
    }

    const handleSubmit = async (e) => {
        try {
            setLoading(true);
            const rep = await axios.post(back + '/auth/login', formdata);
            decodeToken(rep.data.token)
            setTimeout(() => {
                setLoading(false);
                setSuccessMessage(true)
            }, [300])
            setTimeout(() => {
                window.location = "/"
            }, [1000])
            // console.log(rep.data);

        } catch (error) {
            const resetForm = {
                email: '',
                password: ''
            };
            if (error.response && error.response.status === 404) {
                setTimeout(() => {
                    showErrorToast('Email ou mot de passe invalide');
                    setFormData(resetForm);
                    setLoading(false);
                }, [2000])

            }
            else if (error.response && error.response.status === 403) {
                setTimeout(() => {
                    showErrorToast('Votre compte n\'est pas activé');
                    setFormData(resetForm);
                    setLoading(false);
                }, [2000])
            }
            else {
                console.error('An unexpected error occurred:', error);
            }
        }
    }


    const isValid = formdata.email.trim() && formdata.password.trim() && !loading

    return (
        <div className=' flex felx-col text-xs w-full bg-gray-200 bg-opacity-30 min-h-screen max-h-screen h-screen  items-center justify-center font-[Lato]'>
            {/* <img src={logo} alt="" className='absolute top-2 left-2 w-24 h-12'/> */}

            <div className="flex justify-center items-center w-full mx-4 xl:mx-0 xl:w-3/4 h-4/5 bg-white rounded-md shadow-lg">

                <div className="relative flex flex-col items-center justify-center rounded-lg w-full xl:w-2/5 px-3 py-10 h-full" >
                    <a href='/' className='absolute top-0 flex items-center gap-1 p-3 z-50 text-cadetGray font-extrabold tracking-wide text-2xl w-full '>
                        <img src={logo} className='w-6 h-6' />
                        <p className='text-sky-700 italic'><span className='text-sky-300'>Health</span>Time</p>
                    </a>
                    <p className='text-2xl font-extrabold  tracking-wide text-sky-700 text-left w-5/6'>Bienvenue</p>
                    <p className='text-sm w-5/6 text-gray-400 mb-5'>Veuillez vous connecter à votre compte</p>

                    <div className="flex group items-center justify-center my-2 w-5/6 duration-200 border border-gray-200  text-xs bg-gray-50 bg-opacity-50 text-gray-500 rounded-sm px-3 hover:ring-0 hover:border hover:border-sky-300 ">
                        <MdOutlineMail className='text-gray-300 w-6 h-6 group-hover:text-gray-400 duration-200' />
                        <input
                            type='email'
                            placeholder='email'
                            name='email'
                            value={formdata.email}
                            onChange={handleChangeFormData}
                            className='text-xs w-full border-0 focus:ring-0 text-gray-700 bg-gray-50 bg-opacity-50 '
                        />
                    </div>
                    <div className="flex group items-center justify-center my-2 w-5/6 duration-200 border border-gray-200  text-xs bg-gray-50 bg-opacity-50 text-gray-500 rounded-sm px-3 hover:ring-0 hover:border hover:border-sky-400 ">
                        <MdKey className='text-gray-300 w-6 h-6 group-hover:text-gray-400 duration-200' />
                        <input
                            type='password'
                            placeholder='mot de passe'
                            name='password'
                            value={formdata.password}
                            onChange={handleChangeFormData}
                            className='text-xs w-full border-0 focus:ring-0 text-gray-700 bg-gray-50 bg-opacity-50 '
                        />
                    </div>
                    <div className="flex w-5/6 justify-end">
                        <a href='/forgetpassword' className='text-xs text-gray-500 font-medium tracking-wide mb-2 hover:text-gray-700 duration-200'>mot de passe oublié?</a>
                    </div>
                    {!successMessage ?

                        (loading ?
                            <button
                                className={`w-3/4 flex items-center gap-1 justify-center bg-sky-300/30 text-white text-xs py-2 px-4 rounded  cursor-not-allowed`}
                                disabled={true}
                            >
                                <p>Connexion</p>
                                <PulseLoader size={8} color="#ffffff" />
                            </button>
                            : <button className={`w-5/6 text-sm p-2 rounded-md  text-white my-2  duration-200 ${!isValid ? 'hover:cursor-not-allowed bg-sky-300/30' : 'hover:bg-opacity-100 bg-opacity-90 bg-sky-300'}`}
                                disabled={!isValid}
                                onClick={handleSubmit}>
                                <p>Se connecter</p>
                            </button>
                        )

                        :
                        <p className='text-xs w-3/4 bg-green-500/20 text-green-500 text-center py-1.5 rounded tracking-wider'>Connexion réussie</p>}
                    <div className="absolute bottom-12 text-center flex flex-col gap-1">
                        <p className=' text-xs text-gray-500 '>Vous n'avez pas de compte ? <a href='/register' className='text-sky-700 font-bold'>s'inscrire</a></p>
                        <a href="/" className='text-sky-700 underline'>Home</a>
                    </div>
                </div>
                <div className="xl:flex xl:w-3/5 xl:h-full  hidden bg-sky-300 bg-opacity-90  items-center justify-center rounded-r-md">
                    <div className="flex w-3/4 h-full" style={{ backgroundImage: `url(${login})`, backgroundSize: 'cover' }}></div>
                </div>

            </div>
            <ToastComponent />
        </div>
    )
}
export default Login