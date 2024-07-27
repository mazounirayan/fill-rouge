import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  SelectChangeEvent
} from '@mui/material';

interface Reservation {
  id?: string;
  email: string;
  selectedRoom: string;
  slot: string;
  numberOfPeople?: number;
}

interface ReservationFormProps {
  reservation?: Reservation;
  onSave: (reservation: Reservation) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ reservation, onSave }) => {
  const [formData, setFormData] = useState<Reservation>({
    email: reservation?.email || '',
    selectedRoom: reservation?.selectedRoom || '',
    slot: reservation?.slot || '',
    numberOfPeople: reservation?.numberOfPeople || 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Réservation</Typography>

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      />

      <FormControl fullWidth required>
        <InputLabel id="selectedRoom-label">Salle</InputLabel>
        <Select
          labelId="selectedRoom-label"
          id="selectedRoom"
          name="selectedRoom"
          value={formData.selectedRoom}
          onChange={handleChange}
        >
          <MenuItem value="">Sélectionner une salle</MenuItem>
          <MenuItem value="Salle 1">Salle 1</MenuItem>
          <MenuItem value="Salle 2">Salle 2</MenuItem>
          <MenuItem value="Salle 3">Salle 3</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Créneau"
        name="slot"
        type="text"
        value={formData.slot}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Nombre de participants"
        name="numberOfPeople"
        type="number"
        value={formData.numberOfPeople || ''}
        onChange={handleChange}
        fullWidth
        required
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Sauvegarder
      </Button>
    </Box>
  );
};

export default ReservationForm;
export type { Reservation };