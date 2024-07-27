import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'toastify-js/src/toastify.css';
import Toastify from 'toastify-js';
import '../css/BookingForm.css';

interface Slot {
  time: string;
  maxParticipants: number;
  remainingPlaces: number;
}

interface Session {
  id: string;
  date: string;
  duration: string;
  price: number;
  minParticipants: string;
  availableSlots: Slot[];
  createdBy: number;
  theme: string;
}

interface Reservation {
  id: string;
  email: string;
  sessionId: string;
  slot: string;
  participants: number;
  status: string;
}

const BookingForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionsResponse, reservationsResponse] = await Promise.all([
          fetch('http://localhost:5000/sessions'),
          fetch('http://localhost:5000/reservations')
        ]);

        if (sessionsResponse.ok && reservationsResponse.ok) {
          const sessionsData: Session[] = await sessionsResponse.json();
          const reservationsData: Reservation[] = await reservationsResponse.json();

          setSessions(sessionsData);
          setReservations(reservationsData);
        } else {
          Toastify({
            text: 'Une erreur est survenue lors de la récupération des données.',
            duration: 3000,
            backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
          }).showToast();
        }
      } catch (error) {
        console.error('Erreur:', error);
        Toastify({
          text: 'Une erreur est survenue lors de la récupération des données.',
          duration: 3000,
          backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        }).showToast();
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRoom && selectedDate) {
      const session = sessions.find(session =>
        session.theme === selectedRoom &&
        moment(session.date).isSame(moment(selectedDate), 'day')
      );
      if (session) {
        const updatedSlots = session.availableSlots.map(slot => {
          const slotReservations = reservations.filter(reservation =>
            reservation.sessionId === session.id &&
            moment(reservation.slot).format('HH:mm') === slot.time
          );
          const reservedPlaces = slotReservations.reduce((sum, reservation) => sum + reservation.participants, 0);
          const remainingPlaces = Math.max(0, slot.maxParticipants - reservedPlaces);
          return { ...slot, remainingPlaces };
        });
        setAvailableSlots(updatedSlots.filter(slot => slot.remainingPlaces > 0));
      } else {
        setAvailableSlots([]);
      }
    }
  }, [selectedRoom, selectedDate, sessions, reservations]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDate || !selectedTimeSlot) {
      Toastify({
        text: 'Veuillez sélectionner une date et un créneau horaire.',
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      }).showToast();
      return;
    }

    const session = sessions.find(session =>
      session.theme === selectedRoom &&
      moment(session.date).isSame(moment(selectedDate), 'day')
    );
    if (!session) {
      Toastify({
        text: 'Session non trouvée.',
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      }).showToast();
      return;
    }

    const selectedSlot = session.availableSlots.find(slot => slot.time === selectedTimeSlot);
    if (!selectedSlot) {
      Toastify({
        text: 'Créneau horaire non trouvé.',
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      }).showToast();
      return;
    }

    if (numberOfPeople < parseInt(session.minParticipants, 10)) {
      Toastify({
        text: `Le nombre minimum de participants pour cette session est de ${session.minParticipants}.`,
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      }).showToast();
      return;
    }

    if (numberOfPeople > selectedSlot.remainingPlaces) {
      Toastify({
        text: `Il ne reste que ${selectedSlot.remainingPlaces} place(s) pour ce créneau.`,
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      }).showToast();
      return;
    }

    const combinedDateTime = moment(selectedDate)
      .set({
        hour: parseInt(selectedTimeSlot.split(':')[0], 10),
        minute: parseInt(selectedTimeSlot.split(':')[1], 10),
      })
      .toISOString();

    try {
      const reservationResponse = await fetch('http://localhost:5000/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          numberOfPeople,
          selectedRoom,
          slot: combinedDateTime,
        }),
      });

      if (reservationResponse.ok) {
        const newReservation: Reservation = await reservationResponse.json();
        setReservations(prevReservations => [...prevReservations, newReservation]);

        // Mise à jour des créneaux disponibles
        const updatedSlots = availableSlots.map(slot => {
          if (slot.time === selectedTimeSlot) {
            return {
              ...slot,
              remainingPlaces: slot.remainingPlaces - numberOfPeople,
            };
          }
          return slot;
        });

        setAvailableSlots(updatedSlots);

        setFirstName('');
        setLastName('');
        setEmail('');
        setNumberOfPeople(1);
        setSelectedDate(null);
        setSelectedRoom('');
        setSelectedTimeSlot('');

        Toastify({
          text: 'Réservation effectuée avec succès!',
          duration: 3000,
          backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
        }).showToast();
      } else {
        Toastify({
          text: 'Une erreur est survenue lors de l\'envoi de la réservation.',
          duration: 3000,
          backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        }).showToast();
      }
    } catch (error) {
      console.error('Erreur:', error);
      Toastify({
        text: 'Une erreur est survenue lors de l\'envoi de la réservation.',
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      }).showToast();
    }
  };

  return (
    <div id="Booking">
      <h1>Réservez Votre Évasion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Nombre de personnes"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(parseInt(e.target.value, 10))}
          min="1"
          required
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Date de réservation"
          className="custom-datepicker"
          required
        />
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          required
        >
          <option value="" disabled>
            Choisissez une salle
          </option>
          {sessions.map(session => (
            <option key={session.id} value={session.theme}>
              {session.theme}
            </option>
          ))}
        </select>
        {selectedRoom && selectedDate && (
          <div className="available-times">
            <h3>Créneaux disponibles :</h3>
            <ul>
              {availableSlots.length > 0 ? (
                availableSlots.map((slot, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                    style={{
                      cursor: 'pointer',
                      color: selectedTimeSlot === slot.time ? 'red' : 'black',
                    }}
                  >
                    Créneau {slot.time} - reste {slot.remainingPlaces} place{slot.remainingPlaces > 1 ? 's' : ''}
                  </li>
                ))
              ) : (
                <li>Aucun créneau disponible pour cette date.</li>
              )}
            </ul>
          </div>
        )}
        <input type="submit" value="Réserver" />
      </form>
    </div>
  );
};

export default BookingForm;
