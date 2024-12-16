import React, { useState } from 'react';
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ToastComponent, { showErrorToast, showSuccessToast, showWarnToast, showInfoToast } from '../../components/ToastComponent';
import config from '../../config';

const ResetPassword = () => {
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState({
        i1: '',
        i2: '',
        i3: '',
        i4: ''
    });
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const codeString = code.i1.toString() + code.i2.toString() + code.i3.toString() + code.i4.toString();

    const isValid = codeString.length === 4 && newPassword.trim() && confirmPassword === newPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            showInfoToast('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            setLoading(true);
            await axios.post(config.BACKEND_URL + '/users/verify-code', null, {
                params: {
                    email: email,
                    code: codeString,
                    newPassword: newPassword
                }
            });
            localStorage.removeItem("email");
            setTimeout(() => {
                showSuccessToast('Mot de passe réinitialisé avec succès.');
                setLoading(false);
                window.location = '/login';
            }, 2000);
        } catch (error) {
            setTimeout(() => {
                showErrorToast('Erreur lors de la réinitialisation du mot de passe.');
                setLoading(false);
                setCode({
                    i1: '',
                    i2: '',
                    i3: '',
                    i4: ''
                });
                setNewPassword('');
                setConfirmPassword('');
            }, 2000);
        }
    };

    const handleChangeCode = (e) => {
        const { name, value } = e.target;
        setCode({ ...code, [name]: value });
    };

    return (
        <div className='flex items-center justify-center bg-whiteSmoke w-full min-h-screen font-[Lato] text-xs'>
            <div className="flex flex-col justify-center items-center w-1/3 py-5 border bg-white rounded shadow-lg">
                <p className="text-xl text-center font-bold mb-3 w-4/5 text-gray-700">Modification de mot de passe</p>
                <p className='text-xs text-gray-400 w-5/6 text-center mb-4'>Veuillez entrer le code que vous avez reçu par email, ainsi que votre nouveau mot de passe</p>
                <div className='flex flex-col px-10 justify-center items-center w-full'>
                    <div className="flex flex-col items-center w-2/3 mb-4">
                        <p className='flex text-gray-400 text-xs font-bold mb-1'>Code de vérification</p>
                        <div className="flex items-center w-full gap-2">
                            <input
                                pattern="[0-9]"
                                maxLength="1"
                                inputMode="numeric"
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                name='i1'
                                value={code.i1}
                                onChange={handleChangeCode}
                                className="text-center font-bold appearance-none border-2 border-gray-200 text-xl bg-gray-50 text-gray-500 rounded w-1/4 py-3 focus:ring-0 focus:border-2 focus:border-burntSienna"
                                required
                            />
                            <input
                                pattern="[0-9]"
                                maxLength="1"
                                inputMode="numeric"
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                value={code.i2}
                                name='i2'
                                onChange={handleChangeCode}
                                className="text-center font-bold appearance-none border-2 border-gray-200 text-xl bg-gray-50 text-gray-500 rounded w-1/4 py-3 focus:ring-0 focus:border-2 focus:border-burntSienna"
                                required
                            />
                            <input
                                pattern="[0-9]"
                                maxLength="1"
                                inputMode="numeric"
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                value={code.i3}
                                name='i3'
                                onChange={handleChangeCode}
                                className="text-center font-bold appearance-none border-2 border-gray-200 text-xl bg-gray-50 text-gray-500 rounded w-1/4 py-3 focus:ring-0 focus:border-2 focus:border-burntSienna"
                                required
                            />
                            <input
                                pattern="[0-9]"
                                maxLength="1"
                                inputMode="numeric"
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                value={code.i4}
                                name='i4'
                                onChange={handleChangeCode}
                                className="text-center font-bold appearance-none border-2 border-gray-200 text-xl bg-gray-50 text-gray-500 rounded w-1/4 py-3 focus:ring-0 focus:border-2 focus:border-burntSienna"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center w-full gap-3 mb-4">
                        <div className="flex flex-col w-1/2 mb-4 relative">
                            <p className='flex text-gray-400 text-xs font-bold mb-1'>Nouveau mot de passe</p>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='appearance-none border-gray-200 text-xs bg-gray-50 text-gray-500 rounded w-full py-2 pr-8 focus:ring-0 focus:border focus:border-gray-400'
                                required
                            />
                            <span
                                className="absolute right-2 top-8 cursor-pointer text-gray-300"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className="flex flex-col w-1/2 mb-4 relative">
                            <p className='flex text-gray-400 text-xs font-bold mb-1'>Confirmer le mot de passe</p>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='appearance-none border-gray-200 text-xs bg-gray-50 text-gray-500 rounded w-full py-2 pr-8 focus:ring-0 focus:border focus:border-gray-400'
                                required
                            />
                            <span
                                className="absolute right-2 top-8 cursor-pointer text-gray-300"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    {
                        loading ?
                            <button
                                className={`w-3/4 flex items-center gap-1 justify-center bg-burntSienna text-white text-xs py-2 px-4 rounded hover:bg-burntSienna/90 opacity-50 cursor-not-allowed`}
                                disabled={true}
                            >
                                <p>Réinitialisation de mot de passe</p>
                                <PulseLoader size={8} color="#ffffff" />
                            </button>
                            :
                            <button
                                type="submit"
                                className={`w-3/4 text-xs font-semibold  text-white py-2 rounded  duration-300 ${!isValid ? 'cursor-not-allowed bg-burntSienna/30' : 'hover:bg-burntSienna bg-burntSienna/90'}`}
                                disabled={!isValid}
                                onClick={handleSubmit}
                            >
                                Réinitialiser le mot de passe
                            </button>
                    }
                </div>
                {message && <p className="mt-4 text-green-500">{message}</p>}
            </div>
            <ToastComponent />
        </div>
    );
};

export default ResetPassword;
