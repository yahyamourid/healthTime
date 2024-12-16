import React, { useState } from 'react';
import axios from 'axios';
import { IoKeyOutline } from "react-icons/io5";
import ToastComponent, { showErrorToast, showSuccessToast, showWarnToast, showInfoToast } from '../../components/ToastComponent';
import PulseLoader from 'react-spinners/PulseLoader'
import config from '../../config';
const ForgotPwd = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post(config.BACKEND_URL + `/users/forgot-password`,null, {
                params:{
                    email: email
                }
            });
            localStorage.setItem("email", email);
            setTimeout(() => {
                showSuccessToast('Code de vérification envoyé à votre adresse e-mail...');
                setLoading(false)
                window.location = '/resetpassword'
            }, 2000);
            setEmail('')
        } catch (error) {
            setTimeout(() => {
                showErrorToast('Erreur lors de l\'envoi du code de vérification.');
                setLoading(false)
            }, 2000);
        }
    };

    return (
        <div className='flex  items-center justify-center bg-whiteSmoke w-full min-h-screen font-[Lato] text-xs'>
            <div className="flex flex-col justify-center items-center w-1/3 py-5 border bg-white rounded shadow-lg">
                <div className="w-20 h-20 bg-burntSienna/10 rounded-full p-2 mb-2">
                    <div className="flex justify-center items-center w-16 h-16 bg-burntSienna/20 rounded-full p-2 ">
                        <IoKeyOutline size={32} className='text-burntSienna' />
                    </div>
                </div>
                <p className="text-xl text-center font-bold mb-1 w-4/5 text-gray-700">Mot de passe oublié</p>
                <p className='text-xs text-gray-400 w-5/6  text-center'>Entrez votre adresse email pour recevoir un code de vérification</p>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-4/5 px-1 mt-2'>
                    <div className="mb-4 w-full">
                        <p className='flex text-gray-400 text-xs font-bold mb-1'>Email</p>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className='appearance-none border-gray-200 text-xs bg-white text-gray-500 rounded w-full py-2 px-3 focus:ring-0 focus:border focus:border-gray-400'
                            required
                        />
                    </div>

                    {loading ?
                        <button
                            className={`flex items-center gap-1 justify-center bg-burntSienna text-white text-xs py-2 px-4 rounded hover:bg-burntSienna/90 opacity-50 cursor-not-allowed`}
                            disabled={true}
                        >
                            <p>Envoi du code</p>
                            <PulseLoader size={8} color="#ffffff" />
                        </button>
                        :
                        <button
                            type="submit"
                            className={`w-1/3 text-xs font-semibold  text-white py-2 rounded  duration-300 ${!email.trim() ? 'cursor-not-allowed bg-burntSienna/30' : 'hover:bg-burntSienna bg-burntSienna/90'}`}
                            disabled={!email.trim()}
                        >
                            Envoyer le code
                        </button>
                    }
                </form>

            </div>
            <ToastComponent />
        </div>
    );
};

export default ForgotPwd;
