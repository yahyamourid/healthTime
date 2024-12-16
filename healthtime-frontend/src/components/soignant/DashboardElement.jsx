import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { FaUserDoctor, FaListCheck, FaChartColumn } from "react-icons/fa6";
import { FaRegCalendarTimes } from "react-icons/fa";
import { FaHandHoldingMedical, FaUsers } from "react-icons/fa";
const DashboardElement = () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const back = import.meta.env.VITE_BACK_URL;
    const [dashboardData, setDashboardData] = useState(null);

    // Récupération des données depuis le backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${back}/soignants/dashboard/${storedUserData.id}`
                );
                setDashboardData(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    });

    if (!dashboardData) {
        return <div>Chargement...</div>;
    }

    // Options pour le graphe des types de rendez-vous
    const rendezVousChartOptions = {
        chart: {
            type: "donut",
        },
        labels: ["En Cours", "Fait", "Annulé"],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    const rendezVousChartSeries = [
        dashboardData.rendezVousEnCours,
        dashboardData.rendezVousFait,
        dashboardData.rendezVousAnnule,
    ];

    // Options pour le graphe des proportions des sexes
    const sexeChartOptions = {
        chart: {
            type: "pie",
        },
        labels: ["Hommes", "Femmes"],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    const sexeChartSeries = [dashboardData.hommes, dashboardData.femmes];

    return (
        <div className="flex flex-col w-full gap-5 py-6 px-10 items-start justify-center mt-5 h-full">
            <p className="flex items-center gap-1 text-xl font-semibold text-zinc-700 mb-8">
                Bienvenue Dr.<span className="text-sky-500 font-extrabold">{storedUserData.prenom + " " + storedUserData.nom}</span> !!
            </p>
            <div className="flex w-full gap-5">
                <div className="relative flex flex-col w-1/2 bg-white p-2 rounded">
                    <p className="absolute top-2 left-2 text-gray-500 text-sm">Rendez-vous</p>
                    <span className="flex items-center justify-center gap-2 py-4">
                        <p className="text-3xl font-bold text-violet-500">{dashboardData.nombreRendezVous}</p>
                        <span className="p-4 text-violet-500 bg-violet-100 rounded-md">
                            <FaRegCalendarTimes size={36} />
                        </span>
                    </span>
                </div>
                <div className="relative flex flex-col w-1/2 bg-white p-2 rounded">
                    <p className="absolute top-2 left-2 text-gray-500 text-sm">Patient</p>
                    <span className="flex items-center justify-center gap-2 py-4">
                        <p className="text-3xl font-bold text-green-500">{dashboardData.nombrePatients}</p>
                        <span className="p-4 text-green-500 bg-green-100 rounded-md">
                            <FaUsers size={36} />
                        </span>
                    </span>
                </div>
                <div className="relative flex flex-col w-1/2 bg-white p-2 rounded">
                    <p className="absolute top-2 left-2 text-gray-500 text-sm">Consultations</p>
                    <span className="flex items-center justify-center gap-2 py-4">
                        <p className="text-3xl font-bold text-yellow-500">{dashboardData.nombreConsultations}</p>
                        <span className="p-4 text-yellow-500 bg-yellow-100 rounded-md">
                            <FaUserDoctor size={36} />
                        </span>
                    </span>
                </div>
            </div>


            {/* Graphiques ApexCharts */}
            <div className="flex gap-5 w-full">
                {/* Graphe Donut pour les types de rendez-vous */}
                <div className="w-1/2 p-4 bg-white rounded-md">
                    <p className="text-gray-500 text-sm w-full">
                        Etats de Rendez-vous
                    </p>
                    <Chart
                        options={rendezVousChartOptions}
                        series={rendezVousChartSeries}
                        type="donut"
                        width="100%"
                    />
                </div>

                {/* Graphe Pie pour la proportion des sexes */}
                <div className="w-1/2 p-4 bg-white rounded-md">
                    <p className="text-gray-500 text-sm w-full">
                        Proportion des Patients (Hommes/Femmes)
                    </p>
                    <Chart
                        options={sexeChartOptions}
                        series={sexeChartSeries}
                        type="pie"
                        width="100%"
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardElement;
