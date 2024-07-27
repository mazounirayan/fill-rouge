import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography, SelectChangeEvent } from '@mui/material';

interface Session {
  id?: number;
  themeId: number | null;
  duration: number;
  price: number;
  minParticipants: number;
  availableSlots: string[];
  createdBy?: number;
}

interface Theme {
  id: number;
  name: string;
  salle: number;
  histoire: string;
  photo?: string;
}

interface SessionFormProps {
  session?: Session;
  onSave: (session: Session) => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ session, onSave }) => {
  const [formData, setFormData] = useState<Session>({
    themeId: session?.themeId || null,
    duration: session?.duration || 0,
    price: session?.price || 0,
    minParticipants: session?.minParticipants || 0,
    availableSlots: session?.availableSlots || [''],
  });

  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/themes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setThemes(data))
      .catch(error => console.error('Error fetching themes:', error));
  }, []);

  useEffect(() => {
    if (session) {
      setFormData({
        themeId: session.themeId,
        duration: session.duration,
        price: session.price,
        minParticipants: session.minParticipants,
        availableSlots: session.availableSlots,
      });
    }
  }, [session]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<number | null>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSlotChange = (index: number, value: string) => {
    const slots = [...formData.availableSlots];
    slots[index] = value;
    setFormData(prevState => ({ ...prevState, availableSlots: slots }));
  };

  const handleAddSlot = () => {
    setFormData(prevState => ({ ...prevState, availableSlots: [...prevState.availableSlots, ''] }));
  };

  const handleRemoveSlot = (index: number) => {
    const slots = formData.availableSlots.filter((_, i) => i !== index);
    setFormData(prevState => ({ ...prevState, availableSlots: slots }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, createdBy: session?.createdBy || 0 });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Session Form
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Thème</InputLabel>
          <Select
            name="themeId"
            value={formData.themeId}
            onChange={handleSelectChange}
            required
          >
            <MenuItem >Choisir un thème</MenuItem>
            {themes.map(theme => (
              <MenuItem key={theme.id} value={theme.id}>{theme.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          type="number"
          name="duration"
          label="Durée (minutes)"
          value={formData.duration}
          onChange={handleTextChange}
          required
          inputProps={{ min: 0 }}
        />

        <TextField
          fullWidth
          margin="normal"
          type="number"
          name="price"
          label="Prix (€)"
          value={formData.price}
          onChange={handleTextChange}
          required
          inputProps={{ min: 0 }}
        />

        <TextField
          fullWidth
          margin="normal"
          type="number"
          name="minParticipants"
          label="Participants minimum"
          value={formData.minParticipants}
          onChange={handleTextChange}
          required
          inputProps={{ min: 0 }}
        />

        <Typography variant="h6" gutterBottom>
          Créneaux disponibles
        </Typography>
        {formData.availableSlots.map((slot, index) => (
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

export default SessionForm;