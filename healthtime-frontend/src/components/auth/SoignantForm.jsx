import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import soignantSchema from "../../schemas/SoignantSchema";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ToastComponent, { showErrorToast, showSuccessToast } from '../ToastComponent';
import SuccessModal from "../SuccessModal";
import PulseLoader from 'react-spinners/PulseLoader';
import { getFormattedDate } from "../../utils/DateUtils"
function SoignantForm() {
  const back = import.meta.env.VITE_BACK_URL;
  const { register, handleSubmit, watch, formState: { errors }, setError, setValue, control } = useForm({
    resolver: zodResolver(soignantSchema),

    defaultValues: {
      specialites: [], // Assurez-vous que la valeur par défaut est un tableau vide
    },

  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [certificate, setCertificate] = useState(null);

  const messageModal = "Votre compte soignant a été créé avec succès.";

  useEffect(() => {
    // Fetch cities
    axios.get(`${back}/villes`).then(response => setCities(response.data));
    // Fetch specialties
    axios.get(`${back}/specialites`).then(response => setSpecialties(response.data));
  }, []);

  const registerSoignant = async (data) => {
    try {
      await axios.post(`${back}/auth/signup/soignant`, data);
      setShowModal(true);
      setTimeout(() => window.location = "/login", 3000);
    } catch (error) {
      showErrorToast("Erreur lors de l'inscription du soignant");
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    // Transformation des données pour le format souhaité
    const transformedData = {
      ...data,
      specialites: data.specialites.map(id => ({ id })), // Transformer specialites en [{ id: value }, ...]
      ville: { id: data.ville }, // Transformer ville en { id: value }
      certificat: data.certificat.split(",")[1],
      dateInscription: getFormattedDate()
    };

    // console.log(transformedData); // Afficher les données transformées


    setLoading(true);
    try {
      const emailExists = await axios.get(`${back}/auth/admin/check-email`, { params: { email: data.email } });
      if (emailExists.data) {
        setLoading(false);
        setError("email", { type: "manual", message: "Cet email existe déjà" });
      } else {
        registerSoignant(transformedData); // Utiliser les données transformées
      }
    } catch (error) {
      setLoading(false);
      console.error("Erreur lors de la vérification de l'email", error);
    }
  };


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Récupérer la chaîne complète au format base64
        const base64String = event.target.result; // Cela contient déjà le préfixe MIME
        // console.log(base64String);

        setValue("certificat", base64String); // Mettez à jour le champ du formulaire ici
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setValue("certificat", ""); // Réinitialiser la valeur si aucun fichier n'est sélectionné
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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgba(229, 231, 235, 0.2)", // Equivalent to bg-gray-100/20
      borderColor: state.isFocused
        ? (state.selectProps.menuIsOpen ? 'rgba(14, 165, 233, 0.2)' : 'rgb(209, 213, 219)')
        : (state.selectProps.hasError ? 'rgb(248, 113, 113)' : 'rgb(209, 213, 219)'), // Conditional border color
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        borderColor: "rgb(14, 165, 233)",
      },
      borderRadius: '0.375rem', // Equivalent to rounded-md
      fontSize: '0.75rem', // Equivalent to text-xs
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgb(107, 114, 128)', // Equivalent to text-gray-500
    }),
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-11/12  px-6 gap-2">
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
          <div className="flex gap-6 items-center w-full py-2">
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
        <div className="flex flex-col w-1/3 justify-center items-start gap-1">
          <label className="text-gray-900 font-semibold">Date de Naissance</label>
          <input type="date" {...register("dateNaissance")}
            className={`text-xs w-full bg-gray-100/20 focus:bg-sky-100/20 focus:ring-0 text-gray-500 rounded-md ${errors.dateNaissance ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-sky-300'}`} />
          {errors.dateNaissance && <p className="text-red-600">{errors.dateNaissance.message}</p>}
        </div>

        <div className="flex flex-col w-1/3 justify-center items-start gap-1">
          <label className="text-gray-900 font-semibold">Téléphone</label>
          <input {...register("telephone")} type="tel"
            className={`text-xs w-full bg-gray-100/20 focus:bg-sky-100/20 focus:ring-0 text-gray-500 rounded-md ${errors.telephone ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-sky-300'}`} />
          {errors.telephone && <p className="text-red-600">{errors.telephone.message}</p>}
        </div>
        <div className="flex flex-col w-1/3 gap-1">
          <label className="text-gray-900 font-semibold">Tarif</label>
          <div className="flex w-full justify-between items-center gap-3">
            <input type="number" {...register("tarif", { required: "Le tarif est requis", valueAsNumber: true })}
              className={`text-xs w-3/4 bg-gray-100/20 focus:bg-sky-100/20 focus:ring-0 text-gray-500 rounded-md ${errors.tarif ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-sky-300'}`}
            />
            <p className="w-1/4 text-xs">MAD</p>
          </div>
          {errors.tarif && <p className="text-red-600">{errors.tarif.message}</p>}
        </div>
      </div>

      <div className="flex items-start justify-center w-full gap-4">
        <div className="flex flex-col w-1/3 justify-center items-start gap-1">
          <label className="text-gray-900 font-semibold">Email</label>
          <input type="email" {...register("email")}
            className={`text-xs w-full bg-gray-100/20 focus:bg-sky-100/20 py-2.5 focus:ring-0 text-gray-500 rounded-md ${errors.email ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-sky-300'}`} />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col w-1/3 justify-center items-start gap-1">
          <label className="text-gray-900 font-semibold">Adresse</label>
          <input {...register("adresse")} className={`text-xs w-full py-2.5 bg-gray-100/20 focus:bg-sky-100/20 focus:ring-0 text-gray-500 rounded-md ${errors.adresse ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-sky-300'}`} />
          {errors.adresse && <p className="text-red-600">{errors.adresse.message}</p>}
        </div>

        <div className="flex flex-col w-1/3 gap-1">
          <label className="text-gray-900 font-semibold">Ville</label>
          <Controller
            name="ville"
            control={control} // Assurez-vous que control provient de useForm()
            rules={{ required: "La ville est requise" }} // Validation ici
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                options={cities.map(city => ({ value: city.id, label: city.nom }))}
                onChange={(selectedOption) => onChange(selectedOption.value)} // Envoie la valeur
                onBlur={onBlur} // Gère l'événement onBlur pour le champ
                placeholder="Sélectionner une ville"
                styles={customStyles}
                ref={ref} // Important pour le ref
              />
            )}
          />
          {errors.ville && <p className="text-red-600">{errors.ville.message}</p>}
        </div>
      </div>


      <div className="flex items-start justify-center w-full gap-4 text-xs tracking-wide">

        {/* Specialties Multi-Select */}
        <div className="flex flex-col w-full gap-1">
          <label className="text-gray-900 font-semibold">Spécialités</label>
          <Controller
            name="specialites"
            control={control}
            rules={{
              required: "Les spécialités sont requises",
              validate: (value) => value.length > 0 || "Au moins une spécialité est requise." // Zod validation
            }}
            render={({ field: { onChange, onBlur, ref } }) => (
              <Select
                options={specialties.map(specialty => ({ value: specialty.id, label: specialty.nom }))}
                onChange={selectedOptions => {
                  const selectedIds = selectedOptions.map(option => option.value); // Extraire les IDs
                  onChange(selectedIds); // Mettre à jour le champ avec le tableau d'IDs
                  console.log(selectedIds); // Afficher le tableau d'IDs dans la console
                }}
                onBlur={onBlur} // Assurez-vous que cela soit défini
                isMulti
                placeholder="Sélectionner des spécialités"
                styles={customStyles}
                ref={ref} // Important pour la référence
              />
            )}
          />

          {errors.specialites && <p className="text-red-600">{errors.specialites.message}</p>}
        </div>

        {/* Certificate Image Upload */}
        <div className="flex flex-col w-full gap-1">
          <label className="text-gray-900 font-semibold">Certificat de travail</label>
          <input
            // {...register("certificat", { required: "Le certificat est requis.", validate: value => value?.match(/^data:image\/[a-z]+;base64,/) || "Certificat invalide, téléchargez une image." })}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-xs w-full mt-2"
          />
          {errors.certificat && <p className="text-red-600">{errors.certificat.message}</p>}
        </div>

      </div>

      {/* password line */}
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
        className={`flex justify-center items-center gap-1 w-1/3 text-sm text-white mx-auto py-1 rounded ${loading ? 'bg-sky-300/50 cursor-not-allowed' : 'bg-sky-300'}`}>
        S'inscrire
        {loading && <PulseLoader size={8} color="#ffffff" />}
      </button>

      <ToastComponent />
      {showModal && <SuccessModal message={messageModal} />}
    </form>
  );
}

export default SoignantForm;
