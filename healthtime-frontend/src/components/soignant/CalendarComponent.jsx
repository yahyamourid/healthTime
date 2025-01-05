import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import { addMinutes } from 'date-fns';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'fr': fr };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: fr }),
  getDay,
  locales,
});

const messages = {
  allDay: "Journée entière",
  previous: "Précédent",
  next: "Suivant",
  today: "Aujourd'hui",
  month: "Mois",
  day: "Jour",
  agenda: "Agenda",
  date: "Date",
  time: "Heure",
  event: "Événement",
  noEventsInRange: "Aucun rendez-vous dans cette période",
  showMore: total => `+ ${total} autres`,
  week: "Semaine",
  work_week: "Semaine de travail",
  tomorrow: "Demain",
  yesterday: "Hier",
  // Jours de la semaine
  sunday: "Dimanche",
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  // Mois
  january: "Janvier",
  february: "Février",
  march: "Mars",
  april: "Avril",
  may: "Mai",
  june: "Juin",
  july: "Juillet",
  august: "Août",
  september: "Septembre",
  october: "Octobre",
  november: "Novembre",
  december: "Décembre"
};

const EventModal = ({ isOpen, onClose, event, fetchRendezVous }) => {
  if (!isOpen || !event) return null;
  const back = import.meta.env.VITE_BACK_URL
  const soignantId = JSON.parse(localStorage.getItem('userData')).id

  const handleMarkFait = async () => {
    try {
      await axios.put(`${back}/rendezvous/${event.rdvDetails.id}/mark-as-done`, {});
      await axios.post(`${back}/dossiers-medicaux/create/${soignantId}/${event.rdvDetails.patientId}`)
      fetchRendezVous()
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Détails du rendez-vous</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex w-full gap-3">
            <div className="bg-gray-50 p-3 rounded w-1/2">
              <p className="font-semibold text-blue-600">État</p>
              <p className="text-gray-700">{event.rdvDetails.etat}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded w-1/2">
              <p className="font-semibold text-blue-600">Type</p>
              <p className="text-gray-700">{event.rdvDetails.isCheckUp == true ? 'Controle' : 'Consultation'}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="font-semibold text-blue-600">Patient</p>
            <p className="text-gray-700">{event.rdvDetails.patientNom} {event.rdvDetails.patientPrenom}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="font-semibold text-blue-600">Coordonnées</p>
            <p className="text-gray-700">Tél: {event.rdvDetails.patientTel}</p>
            <p className="text-gray-700">Email: {event.rdvDetails.patientEmail}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="font-semibold text-blue-600">Date et heure</p>
            <p className="text-gray-700">
              {format(new Date(event.rdvDetails.dateRendez), "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}
            </p>
          </div>
        </div>

        {event.rdvDetails.etat !== "fait" &&
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleMarkFait}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Marquer fait
            </button>
          </div>}
      </div>
    </div>
  );
};

const CalendarComponent = () => {
  const back = import.meta.env.VITE_BACK_URL
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const soignant = JSON.parse(localStorage.getItem('userData'));

  const fetchRendezVous = async () => {
    try {
      const response = await axios.get(`${back}/rendezvous/soignant/${soignant.id}`);
      const formattedEvents = response.data.map(rdv => ({
        title: `${rdv.etat} - ${rdv.patientNom} ${rdv.patientPrenom}`,
        start: new Date(rdv.dateRendez),
        end: addMinutes(new Date(rdv.dateRendez), 15),
        rdvDetails: rdv
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous:", error);
    }
  };
  useEffect(() => {


    fetchRendezVous();
  }, [soignant.id]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const formats = {
    monthHeaderFormat: (date, culture, localizer) =>
      localizer.format(date, "MMMM yyyy", culture),
    dayHeaderFormat: (date, culture, localizer) =>
      localizer.format(date, "EEEE d MMMM yyyy", culture),
    dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
      `${localizer.format(start, "d MMMM", culture)} – ${localizer.format(
        end,
        "d MMMM yyyy",
        culture
      )}`,
  };

  return (
    <div className="bg-white rounded-lg w-11/12 h-5/6 p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        messages={messages}
        formats={formats}
        selectable={false}
        onSelectEvent={handleSelectEvent}
        defaultView="month"
        culture="fr"
        eventPropGetter={(event) => ({
          className: 'cursor-pointer',
          style: {
            backgroundColor: '#3174ad',
            borderRadius: '4px',
            border: 'none',
            color: 'white',
            padding: '2px 6px',
            fontSize: '14px',
            fontWeight: '500'
          }
        })}
        dayPropGetter={(date) => ({
          style: {
            backgroundColor: 'white',
            borderRadius: '0px',
            border: '1px solid #e5e7eb',
          }
        })}
      />

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
        fetchRendezVous={fetchRendezVous}
      />
    </div>
  );
};

export default CalendarComponent;