import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/locale/fr'; 
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { TextField, Button, MenuItem, Select, SelectChangeEvent, InputLabel, FormControl, Box, Typography } from '@mui/material';

interface Theme {
  id: string;
  name: string;
  salle: number;
  histoire: string;
  photo?: string;
}

interface SessionForm {
  themeId: string;
  date: Date;
  duration: number;
  price: number;
  minParticipants: number;
  availableSlots: string[];
  createdBy: number;
}

const CreateSession: React.FC = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [sessionForm, setSessionForm] = useState<SessionForm>({
    themeId: "0",
    date: new Date(),
    duration: 0,
    price: 0,
    minParticipants: 0,
    availableSlots: [moment().format('HH:mm')],
    createdBy: 1
  });

  useEffect(() => {
    fetch('http://localhost:5000/themes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setThemes(data))
      .catch(error => {
        console.error('Erreur lors de la récupération des thèmes:', error);
        Toastify({
          text: 'Erreur lors de la récupération des thèmes.',
          duration: 3000,
          backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        }).showToast();
      });
  }, []);

  const handleSessionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setSessionForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSlotChange = (index: number, value: string) => {
    const slots = [...sessionForm.availableSlots];
    slots[index] = value;
    setSessionForm(prevState => ({ ...prevState, availableSlots: slots }));
  };

  const handleAddSlot = () => {
    setSessionForm(prevState => ({
      ...prevState,
      availableSlots: [...prevState.availableSlots, moment().format('HH:mm')]
    }));
  };

  const handleRemoveSlot = (index: number) => {
    const slots = sessionForm.availableSlots.filter((_, i) => i !== index);
    setSessionForm(prevState => ({ ...prevState, availableSlots: slots }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSessionForm(prevState => ({ ...prevState, date }));
    }
  };

  const handleSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { themeId, duration, price, minParticipants, availableSlots } = sessionForm;
    if (!themeId  || duration === 0 || price === 0 || minParticipants === 0 || availableSlots.length === 0) {
      Toastify({
        text: 'Tous les champs sont requis.',
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      }).showToast();
      return;
    }

    fetch('http://localhost:5000/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sessionForm)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(newSession => {
        console.log('Session créée:', newSession);
        Toastify({
          text: 'Session créée avec succès!',
          duration: 3000,
          backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
        }).showToast();
       
        setSessionForm({
          themeId: "0",
          date: new Date(),
          duration: 0,
          price: 0,
          minParticipants: 0,
          availableSlots: [moment().format('HH:mm')],
          createdBy: 1 
        });
      })
      .catch(error => {
        console.error('Erreur lors de la création de la session:', error);
        Toastify({
          text: 'Erreur lors de la création de la session.',
          duration: 3000,
          backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        }).showToast();
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Créer une nouvelle session
      </Typography>

      <form onSubmit={handleSessionSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Thème</InputLabel>
          <Select
            name="themeId"
            value={sessionForm.themeId}
            onChange={handleSessionChange}
            required
          >
            <MenuItem value={0}>Choisir un thème</MenuItem>
            {themes.map(theme => (
              <MenuItem key={theme.id} value={theme.id}>{theme.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <DatePicker
            selected={sessionForm.date}
            onChange={(date: Date | null) => handleDateChange(date)}
            customInput={<TextField fullWidth label="Date" />}
            required
          />
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          type="number"
          name="duration"
          label="Durée (minutes)"
          value={sessionForm.duration}
          onChange={handleSessionChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          type="number"
          name="price"
          label="Prix (€)"
          value={sessionForm.price}
          onChange={handleSessionChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          type="number"
          name="minParticipants"
          label="Participants minimum"
          value={sessionForm.minParticipants}
          onChange={handleSessionChange}
          required
        />

        <Typography variant="h6" gutterBottom>
          Créneaux disponibles
        </Typography>
        {sessionForm.availableSlots.map((slot, index) => (
          <Box key={index} display="flex" alignItems="center" marginBottom={1}>
            <TextField
              fullWidth
              value={slot}
              onChange={(e) => handleSlotChange(index, e.target.value)}
              required
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemoveSlot(index)}
              sx={{ ml: 2 }}
            >
              X
            </Button>
          </Box>
        ))}
        <Button
          variant="contained"
          color="success"
          onClick={handleAddSlot}
          sx={{ mt: 2 }}
        >
          Ajouter un créneau
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
        >
          Sauvegarder
        </Button>
      </form>
    </Box>
  );
};

export default CreateSession;