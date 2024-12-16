import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import patientSchema from "../../schemas/PatientSchema";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ToastComponent, { showErrorToast, showSuccessToast, showWarnToast, showInfoToast } from '../ToastComponent';
import SuccessModal from "../SuccessModal";
import PulseLoader from 'react-spinners/PulseLoader'
import { getFormattedDate } from "../../utils/DateUtils"
function PatientForm() {
  const back = import.meta.env.VITE_BACK_URL
  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      dateInscription: getFormattedDate()
    }
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const messageModal = "Votre compte patient a été créé avec succès. Merci de vous authentifier pour accéder à votre espace personnel."

  const registerPatient = async (data) => {
    try {
      const finalData = {
        ...data,
        dateInscription: getFormattedDate(),
      }
      console.log("registerPatient");
      const response = await axios.post(`${back}/auth/signup/patient`, finalData);
      setTimeout(() => {
        setShowModal(true);
      }, 1000);
      setTimeout(() => {
        window.location = "/login"
      }, 3000);
    } catch (error) {
      showErrorToast("Erreur lors de l'inscription de patient")
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await axios.get(`${back}/auth/admin/check-email`, {
        params: { email: data.email } // Use params to send query parameters
      });
      console.log(response)
      if (response.data === true) {
        setTimeout(() => {
          setLoading(false)
          setError("email", { type: "manual", message: "Cet email existe déjà" });
        }, 500);
      } else {
        registerPatient(data);
      }
    } catch (error) {
      setLoading(false)
      console.error("Erreur lors de la vérification de l'email", error);
    }
  };


  const evaluatePasswordStrength = (password) => {
    const result = zxcvbn(password);
    if (result.score === 0) setPasswordStrength("Faible");
    else if (result.score === 1) setPasswordStrength("Faible");
    else if (result.score === 2) setPasswordStrength("Moyen");
    else if (result.score === 3) setPasswordStrength("Fort");
    else if (result.score === 4) setPasswordStrength("Très Fort");
  };

  // Surveillance du mot de passe pour évaluer la force
  const passwordValue = watch("password");
  useEffect(() => {
    if (passwordValue) {
      evaluatePasswordStrength(passwordValue);
    }
  }, [passwordValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-11/12  px-6 gap-4">
      <div className="flex items-start justify-center w-full gap-4 text-xs tracking-wide">
        <div className="flex flex-col w-1/3 justify-center items-start gap-1">
          <label className="text-gray-900 font-semibold">Nom</label>
          <input {...register("nom")}
            className={`text-xs w-full bg-gray-100/20 focus:bg-sky-100/20 focus:ring-0 text-gray-500 rounded-md ${errors.nom ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-sky-300'}`}
          />
          {errors.nom && <p className="text-red-600">{errors.nom.message}</p>}
        </div>

        <div className="flex flex-col w-1/3 justify-center items-start gap-1">
          <label className="text-gray-900 font-semibold">Prénom</label>
          <input {...register("prenom")}
            className={`text-xs w-full bg-gray-100/20 focus:bg-sky-100/20 focus:ring-0 text-gray-500 rounded-md ${errors.prenom ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-sky-300'}`}
          />
          {errors.prenom && <p className="text-red-600">{errors.prenom.message}</p>}
        </div>

        <div className="flex flex-col w-1/3 justify-center items-start gap-1">
          <label className="text-gray-900 font-semibold">Sexe</label>
          <div className="flex justify-between items-center w-full py-2">
            <label className="flex items-center gap-2">
              <input type="radio" value="homme" {...register("sexe")} defaultChecked className="focus:ring-white text-sky-300" />
              Homme
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="femme" {...register("sexe")} className="focus:ring-white text-sky-300" />
              Femme
            </label>
          </div>
          {errors.sexe && <p className="error">{errors.sexe.message}</p>}
        </div>
      </div>

      <div className="flex items-start justify-center w-full gap-4">
        <div className="flex flex-col w-1/2 justify-center items-start gap-1">
          <label className="text-gray-900 font-semibold">Date de Naissance</label>
          <input type="date" {...register("dateNaissance")}
            className={`text-xs w-full bg-gray-100/20 focus:bg-sky-100/20 focus:ring-0 text-gray-500 rounded-md ${errors.dateNaissance ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-sky-300'}`} />
          {errors.dateNaissance && <p className="text-red-600">{errors.dateNaissance.message}</p>}
        </div>

        <div className="flex flex-col w-1/2 justify-center items-start gap-1">
          <label className="text-gray-900 font-semibold">Téléphone</label>
          <input {...register("telephone")} type="tel"
            className={`text-xs w-full bg-gray-100/20 focus:bg-sky-100/20 focus:ring-0 text-gray-500 rounded-md ${errors.telephone ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-sky-300'}`} />
          {errors.telephone && <p className="text-red-600">{errors.telephone.message}</p>}
        </div>
      </div>

      <div className="flex items-start justify-center w-full gap-4">
        <div className="flex flex-col w-1/2 justify-center items-start gap-1">
          <label className="text-gray-900 font-semibold">Email</label>
          <input type="email" {...register("email")}
            className={`text-xs w-full bg-gray-100/20 focus:bg-sky-100/20 focus:ring-0 text-gray-500 rounded-md ${errors.email ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-sky-300'}`} />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col w-1/2 justify-center items-start gap-1">
          <label className="text-gray-900 font-semibold">Adresse</label>
          <input {...register("adresse")} className={`text-xs w-full bg-gray-100/20 focus:bg-sky-100/20 focus:ring-0 text-gray-500 rounded-md ${errors.adresse ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-sky-300'}`} />
          {errors.adresse && <p className="text-red-600">{errors.adresse.message}</p>}
        </div>
      </div>

      <div className="flex items-start justify-center w-full gap-4 mb-5">
        {/* Mot de passe et force */}
        <div className="flex w-1/2 gap-3 items-start">
          <div className="flex flex-col w-full gap-0.5">
            <div className="flex justify-between">
              <label className="text-gray-900 font-semibold">Mot de Passe</label>
              {passwordValue && (
                <p className="">
                  <span className={`${passwordStrength === "Faible" ? 'text-red-500' : passwordStrength === "Moyen" ? 'text-yellow-500' : 'text-green-500'} ml-1`}>
                    {passwordStrength}
                  </span>
                </p>
              )}
            </div>

            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`text-xs w-full bg-gray-100/20 focus:bg-sky-100/20 focus:ring-0 text-gray-500 rounded-md ${errors.password ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-sky-300'}`}
            />

            {/* Barre de progression de la force du mot de passe */}
            {passwordValue &&
              <div className="w-full h-2 bg-gray-300 rounded mt-1">
                <div
                  className={`h-full rounded transition-width duration-300 ${passwordStrength === "Faible"
                    ? "bg-red-500 w-1/4"
                    : passwordStrength === "Moyen"
                      ? "bg-yellow-500 w-2/4"
                      : passwordStrength === "Fort"
                        ? "bg-green-500 w-3/4"
                        : "bg-green-600 w-full"
                    }`}
                ></div>
              </div>
            }
            {/* {errors.password && <p className="text-red-600">{errors.password.message}</p>} */}
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className=" text-gray-500 mt-6"
          >
            {showPassword ? <IoMdEyeOff size={16} /> : <IoMdEye size={16} />}
          </button>
        </div>

        {/* Confirmation du mot de passe */}
        <div className="flex flex-col w-1/2 justify-center items-start gap-1">
          <label className="text-gray-900 font-semibold">Confirmation de Mot de Passe</label>
          <div className="flex w-full gap-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className={`text-xs w-full bg-gray-100/20 focus:bg-sky-100/20 focus:ring-0 text-gray-500 rounded-md ${errors.confirmPassword ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-sky-300'}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-500"
            >
              {showConfirmPassword ? <IoMdEyeOff size={16} /> : <IoMdEye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
        </div>
      </div>
      <button type="submit" disabled={loading}
        className={`flex justify-center items-center gap-1 w-1/3 text-sm text-white  mx-auto  py-1 rounded ${loading ? 'bg-sky-300/50 cursor-not-allowed' : 'bg-sky-300'}`}>
        S'inscrire
        {loading && <PulseLoader size={8} color="#ffffff" />}
      </button>
      <ToastComponent />
      {showModal && <SuccessModal message={messageModal} />}
    </form>
  );
}

export default PatientForm;
