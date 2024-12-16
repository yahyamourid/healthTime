import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from 'axios';

const AppointmentComponent = ({ open, onClose, soignantId }) => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const back = import.meta.env.VITE_BACK_URL
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    // const [soignantId, setSoignantId] = useState(1);
    const [etat, setEtat] = useState('New');
    const [dialogOpen, setDialogOpen] = useState(false); // For Dialog state
    const [visitType, setVisitType] = useState(''); // For storing the visit type (check-up or regular)


    useEffect(() => {
        if (open) {
            axios
                .get(`${back}/rendezvous/i/${soignantId}`)
                .then((response) => {
                    setData(response.data);
                    setSelectedDay(Object.keys(response.data)[0]); // Default to the first day
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [open]);

    const renderTimeSlots = (hours) => {
        if (!hours) return null;

        return Object.entries(hours).map(([hour, slots]) => {
            const duration = 60 / slots.length; // Calculate the duration of each slot

            const timeSlots = slots.map((slot, index) => {
                const minutes = index * duration; // Calculate the minutes for each slot
                const formattedTime = `${hour}:${minutes.toString().padStart(2, '0')}`;
                const isSelected = selectedTime === formattedTime; // Check if this time is selected

                return (
                    <button
                        key={`${hour}-${index}`}
                        onClick={() => setSelectedTime(formattedTime)} // Update selected time
                        className={`p-2 rounded-md text-sm font-medium shadow-md transition-transform transform ${slot === 1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : isSelected
                                ? 'bg-blue-500 text-white scale-105 shadow-lg'
                                : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105'
                            }`}
                        disabled={slot === 1}
                    >
                        {formattedTime}
                    </button>
                );
            });

            return (
                <div key={hour} className="mb-4">
                    <h4 className="text-md font-semibold text-gray-700 mb-2">{`${hour}:00`}</h4>
                    <div className="flex flex-wrap gap-2 justify-center">{timeSlots}</div>
                </div>
            );
        });
    };

    const handleReserve = () => {
        if (!selectedTime) {
            alert("Veuillez sélectionner une heure pour le rendez-vous.");
            return;
        }

        setDialogOpen(true); // Open the dialog for visit type selection
    };

    const handleDialogClose = () => {
        setDialogOpen(false); // Close the dialog
    };

    const handleVisitTypeSelection = (type) => {
        setVisitType(type); // Set the selected visit type
    
        const formattedDateTime = convertToISOFormat(selectedDay, selectedTime);
    
        const requestData = {
            dateRendez: formattedDateTime,
            etat: 'en-cours',
            isCheckUp: type === 'check-up', 
            soignant: { id: soignantId },
            patient: {id: storedUserData.id}
        };
    
        // Send the request to the server
        axios
            .post(`${back}/rendezvous`, requestData)
            .then((response) => {
                console.log("Appointment Created", response.data);
                setDialogOpen(false); // Close the dialog after successful reservation
                alert("Votre rendez-vous a été confirmé !");
                console.log(formattedDateTime);
                
    
                // Re-fetch the available time slots to update the UI after reservation
                axios
                    .get(`${back}/rendezvous/i/${soignantId}`)
                    .then((response) => {
                        setData(response.data); // Update the data with new availability
                        setSelectedDay(Object.keys(response.data)[0]); // Reset to the first day
                        setSelectedTime(null); // Reset the selected time
                    })
                    .catch((err) => {
                        setError(err.message);
                    });
            })
            .catch((err) => {
                console.error("Error creating appointment", err);
                alert("Erreur lors de la réservation. Veuillez réessayer.");
            });
    };
    

    const convertToISOFormat = (day, time) => {
        const monthMap = {
            "janvier": "01", "février": "02", "mars": "03", "avril": "04",
            "mai": "05", "juin": "06", "juillet": "07", "août": "08", "septembre": "09",
            "octobre": "10", "novembre": "11", "décembre": "12"
        };

        const parts = day.split(" ");
        const dayOfMonth = parts[1].padStart(2, '0');
        const monthName = parts[2];
        const monthNumber = monthMap[monthName];

        const currentYear = new Date().getFullYear();
        const formattedDate = `${currentYear}-${monthNumber}-${dayOfMonth}`;

        const [hour, minutes] = time.split(":");
        const formattedTime = `${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}`;

        const formattedDateTime = `${formattedDate}T${formattedTime}`;

        return formattedDateTime;
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl w-[90%] max-w-5xl h-[80vh] p-8 flex gap-x-6">
                    {loading && (
                        <div className="flex justify-center items-center w-full h-full">
                            <CircularProgress />
                        </div>
                    )}
                    {error && (
                        <div className="text-red-500 text-center">
                            <p>Error: {error}</p>
                        </div>
                    )}
                    {data && (
                        <div className="flex w-full gap-x-3">
                            <div className="w-1/3 border-r border-gray-300 overflow-y-auto pr-4">
                                <div className="sticky top-0 bg-white z-10">
                                    <h3 className="text-lg font-bold text-sky-700 mb-4">Choisissez un jour</h3>
                                </div>
                                <ul className="space-y-2">
                                    {Object.keys(data).map((day) => (
                                        <li key={day}>
                                            <button
                                                className={`w-full text-left p-3 rounded-md transition-colors ${selectedDay === day
                                                    ? 'bg-sky-100 text-sky-900 font-semibold'
                                                    : 'hover:bg-gray-100 hover:shadow-md'
                                                    }`}
                                                onClick={() => {
                                                    setSelectedDay(day);
                                                    setSelectedTime(null);
                                                }}
                                            >
                                                {day}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="w-2/3 flex flex-col bg-gray-50 rounded-lg shadow-inner">
                                <div className="sticky top-0 bg-gray-50 z-10 flex justify-center items-center p-4">
                                    <h3 className="text-xl font-bold text-sky-700">{selectedDay}</h3>
                                </div>
                                <div className="overflow-y-auto p-4">
                                    <div className="grid grid-cols-3 gap-6">
                                        {renderTimeSlots(data[selectedDay])}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleReserve}
                        className="absolute bottom-4 right-4 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition"
                        disabled={!selectedTime}
                    >
                        Réserver
                    </button>
                </div>
            </Modal>


            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                    <DialogTitle className="text-center text-xl font-bold text-sky-700">
                        Choisir le type de visite
                    </DialogTitle>
                    <DialogContent className="flex justify-center mt-4">
                        <div className="flex flex-col space-y-4 w-full">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleVisitTypeSelection('check-up')}
                                className="w-full py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 rounded-md transition-all"
                            >
                                Contrôle
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleVisitTypeSelection('regular')}
                                className="w-full py-3 text-lg font-semibold text-white bg-violet-600 hover:bg-violet-600 focus:bg-green-800 rounded-md transition-all"
                            >
                                Consultation 
                            </Button>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>

        </>
    );
};

export default AppointmentComponent;
