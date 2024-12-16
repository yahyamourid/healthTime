import React, { useState } from 'react'
import logo from '../../assets/logo.png';
import ChooseRole from '../../components/auth/ChooseRole';
import PatientForm from '../../components/auth/PatientForm'
import SoignantForm from '../../components/auth/SoignantForm'
const Register = () => {
    const [mode, setMode] = useState("soignant")

    const handleModeChange = (newMode) => {
        setMode(newMode)
    }

    return (
        <div className=' flex felx-col text-xs w-full bg-sky-300 bg-opacity-30 min-h-screen max-h-screen h-screen  items-center justify-center font-[Lato]'>
            <div className="flex justify-center items-center mx-4 w-5/6 h-5/6 gap-5">
                <ChooseRole handleModeChange={handleModeChange} mode={mode} />
                <div className="flex justify-center items-center w-2/3 h-full bg-white rounded-md  shadow-sm">
                    {mode === "soignant" ?
                        <SoignantForm />
                        :
                        <PatientForm />}
                </div>
            </div>
        </div>
    )
}

export default Register
