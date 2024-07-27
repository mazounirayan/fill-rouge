import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Box,
  Button,
  Typography,
  Modal,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

interface Reservation {
  id?: number;
  email: string;
  sessionId: number;
  slot: string;
  participants: number;
  status: string;
}

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [editReservation, setEditReservation] = useState<Reservation | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:5000/reservations');
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
    }
  };

  const handleDeleteReservation = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/reservations/${id}`, {
        method: 'DELETE',
      });
      setReservations(prevReservations =>
        prevReservations.filter(reservation => reservation.id !== id)
      );
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation:', error);
    }
  };

  const handleUpdateStatus = async () => {
    if (editReservation) {
      try {
        const updatedReservation = { ...editReservation, status: newStatus };
        const response = await fetch(`http://localhost:5000/reservations/${editReservation.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedReservation),
        });
        const data = await response.json();
        setReservations(prevReservations =>
          prevReservations.map(reservation =>
            reservation.id === data.id ? data : reservation
          )
        );
        setEditReservation(null);
        setNewStatus('');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
      }
    }
  };

  const handleUpdate = (reservation: Reservation) => {
    setEditReservation(reservation);
    setNewStatus(reservation.status);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Liste des Réservations
      </Typography>
      <List>
        {reservations.map((reservation) => (
          <ListItem key={reservation.id} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
            <ListItemText
              primary={`Réservation de ${reservation.email}`}
              secondary={
                <>
                  <Typography variant="body2">Date et Heure: {format(new Date(reservation.slot), 'dd/MM/yyyy à HH:mm')}</Typography>
                  <Typography variant="body2">Nombre de participants: {reservation.participants}</Typography>
                  <Typography variant="body2">
                    Statut: <span style={{ color: reservation.status === 'confirmed' ? 'green' : reservation.status === 'pending' ? 'orange' : 'red' }}>{reservation.status}</span>
                  </Typography>
                </>
              }
            />
            <Box>
              <Button variant="contained" color="error" onClick={() => handleDeleteReservation(reservation.id!)} sx={{ mr: 1 }}>
                Supprimer
              </Button>
              <Button variant="contained" color="warning" onClick={() => handleUpdate(reservation)}>
                Modifier
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

      <Modal
        open={!!editReservation}
        onClose={() => setEditReservation(null)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper sx={{ p: 3, width: 400 }}>
          <Typography variant="h6" gutterBottom>
            Modifier la Réservation
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="status-label">Statut</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Statut"
            >
              <MenuItem value="confirmed">Confirmé</MenuItem>
              <MenuItem value="pending">En attente</MenuItem>
              <MenuItem value="cancelled">Annulé</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleUpdateStatus}>
              Enregistrer
            </Button>
            <Button variant="outlined" color="inherit" onClick={() => setEditReservation(null)}>
              Annuler
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default ReservationList;
