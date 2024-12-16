import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { FaRegSmileWink } from "react-icons/fa";
import { FaUserDoctor, FaListCheck, FaChartColumn } from "react-icons/fa6";
import { FaRegCalendarTimes } from "react-icons/fa";


const DashboardElement = () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const back = import.meta.env.VITE_BACK_URL;

    const [rendezVous, setRendezVous] = useState([]);
    const [chartOptions, setChartOptions] = useState({});
    const [chartSeries, setChartSeries] = useState([]);
    const [stats, setStats] = useState({
        totalRendezVous: 0,
        totalSoignants: 0,
        nextRendezVous: null,
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${back}/rendezvous/patient/${storedUserData.id}`);
            const data = response.data;
            console.log(data);
            setRendezVous(data);

            // Calcul des statistiques
            const totalRendezVous = data.length;
            const soignants = new Set(data.map((rv) => `${rv.nomSoignant} ${rv.prenomSoignant}`));
            const nextRendezVous = data
                .filter((rv) =>
                    new Date(rv.dateRendez) > new Date() && rv.etat === "en-cours"
                )
                .sort((a, b) => new Date(a.dateRendez) - new Date(b.dateRendez))[0];


            setStats({
                totalRendezVous,
                totalSoignants: soignants.size,
                nextRendezVous: nextRendezVous || null,
            });

            // Calcul des données pour le graphique
            const etatCounts = data.reduce(
                (acc, curr) => {
                    acc[curr.etat] = (acc[curr.etat] || 0) + 1;
                    return acc;
                },
                { "en-cours": 0, fait: 0, annule: 0 }
            );

            // Mise à jour des données du graphique
            setChartSeries([etatCounts["en-cours"], etatCounts.fait, etatCounts.annule]);
            setChartOptions({
                chart: {
                    type: "pie",
                },
                labels: ["En cours", "Fait", "Annulé"],
                colors: ["#FFCE56", "#36A2EB", "#FF6384"],
                legend: {
                    position: "bottom",
                },
            });
        } catch (error) {
            console.error("Erreur lors du chargement des rendez-vous :", error);
        }
    };
    const formatDayAndMonth = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col w-full gap-2 py-6 px-10 items-start justify-center mt-5 h-full">
            <p className="flex items-center gap-1 text-xl font-semibold text-zinc-700 mb-8">
                Bienvenue <span className="text-sky-500 font-extrabold">{storedUserData.prenom + " " + storedUserData.nom}</span> !!
            </p>
            <div className="flex gap-5 w-full">
                <div className="flex flex-col w-1/2 gap-5">
                    <div className="flex gap-5">
                        <div className="relative flex flex-col w-1/2 bg-white p-8 rounded">
                            <p className="absolute top-2 left-2 text-gray-500 text-sm">Rendez-vous</p>
                            <span className="flex items-center justify-center gap-2 py-4">
                                <p className="text-3xl font-bold text-violet-500">{stats.totalRendezVous}</p>
                                <span className="p-4 text-violet-500 bg-violet-100 rounded-md">
                                    <FaRegCalendarTimes size={36} />
                                </span>
                            </span>
                        </div>
                        <div className="relative flex flex-col w-1/2 bg-white p-8 rounded">
                            <p className="absolute top-2 left-2 text-gray-500 text-sm">Soignants</p>
                            <span className="flex items-center justify-center gap-2 py-4">
                                <p className="text-3xl font-bold text-green-500">{stats.totalSoignants}</p>
                                <span className="p-4 text-green-500 bg-green-100 rounded-md">
                                    <FaUserDoctor size={36} />
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col w-full bg-white p-4 rounded">
                        <p className="text-gray-500 text-sm">Prochain Rendez-vous</p>
                        {stats.nextRendezVous ? (

                            <div className="flex gap-5 tracking-wide my-2 p-3 text-sm justify-center items-center">
                                <div className="text-center bg-sky-100 px-4 py-5 rounded-full">
                                    <p className="text-orange-500 font-bold text-2xl">
                                        {new Date(stats.nextRendezVous.dateRendez).getDate()}
                                    </p>
                                    <p className="text-gray-700 text-sm">
                                        {formatDayAndMonth(stats.nextRendezVous.dateRendez).split(" ")[1]}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p><span className="text-gray-500 font-semibold">Date</span> : {stats.nextRendezVous.dateRendez}</p>
                                    <p><span className="text-gray-500 font-semibold">Soignants</span> : {stats.nextRendezVous.nomSoignant} {stats.nextRendezVous.prenomSoignant}</p>
                                    <p><span className="text-gray-500 font-semibold">Telephone</span> : {stats.nextRendezVous.telephone}</p>
                                    <p><span className="text-gray-500 font-semibold">Adresse</span> : {stats.nextRendezVous.adresse}</p>
                                </div>
                            </div>
                        ) : (
                            <p>Aucun rendez-vous à venir</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-1/2 bg-white p-2 rounded items-center justify-center">
                    <p className="text-gray-500 text-sm w-full">Répartition des États</p>
                    <ReactApexChart
                        options={chartOptions}
                        series={chartSeries}
                        type="donut"
                        width="400"
                    />
                </div>
            </div>
            {/* <div className="stats">
                <div>
                    <h3>Total des Rendez-vous</h3>
                    <p>{stats.totalRendezVous}</p>
                </div>
                <div>
                    <h3>Nombre de Soignants</h3>
                    <p>{stats.totalSoignants}</p>
                </div>
                <div>
                    <h3>Prochain Rendez-vous</h3>
                    {stats.nextRendezVous ? (
                        <p>
                            {stats.nextRendezVous.dateRendez} avec{" "}
                            {stats.nextRendezVous.nomSoignant} {stats.nextRendezVous.prenomSoignant}
                        </p>
                    ) : (
                        <p>Aucun rendez-vous à venir</p>
                    )}
                </div>
            </div>
            <div className="chart">
                <h3>Répartition des États</h3>
                <ReactApexChart 
                    options={chartOptions} 
                    series={chartSeries} 
                    type="donut" 
                    width="400" 
                />
            </div> */}
        </div>
    );
};

export default DashboardElement;
