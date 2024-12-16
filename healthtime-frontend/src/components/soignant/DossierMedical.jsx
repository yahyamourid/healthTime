import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { IoMdArrowDropup } from "react-icons/io";
import Consultations from "./Consultations";
import Allergies from "./Allergies";
import Antecedents from "./Antecedents";
const DossierMedical = ({ dossier, back }) => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const baseUrl = import.meta.env.VITE_BACK_URL;
  const [dossierMedical, setDossierMedical] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showConsultations, setShowConsultations] = useState(true);
  const [showAllergies, setShowAllergies] = useState(true);
  const [showAntecedents, setShowAntecedents] = useState(true);

  const fetchDossierMedical = async () => {
    try {
      const response = await axios.get(`${baseUrl}/dossiers-medicaux/${dossier.id}`);

      setDossierMedical(response.data);

      setLoading(false);
    } catch (err) {
      setError("Une erreur est survenue lors de la récupération des données.");
      console.log(err);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDossierMedical();
  }, [dossier, baseUrl]);

  if (loading) {
    return <div className="text-center">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto ">
      <button
        onClick={() => back()}
        className=" text-sky-500 px-4 py-2 rounded-full mb-4 hover:text-sky-600/80 duration-200"
      >
        <FaArrowCircleLeft size={24} />
      </button>

      <p className="text-2xl font-bold mb-4 text-center">
        Dossier Médical :
        {storedUserData.role === "SOIGNANT" ?
          dossier.nomPatient + " " + dossier.prenomPatient
          :
          dossier.nomSoignant + " " + dossier.prenomSoignant}
      </p>
      <p className="text-gray-600 mb-6 text-center">
        Date de création : {new Date(dossierMedical.dateCreation).toLocaleDateString()}
      </p>

      <Consultations dossier={dossierMedical} fetchdata={fetchDossierMedical} />

      {/* <Allergies allergies={dossierMedical.allergies} />

      <Antecedents dossierMedical={dossierMedical} /> */}

    </div>
  );
};

export default DossierMedical;
