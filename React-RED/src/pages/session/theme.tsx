import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const CreateTheme: React.FC = () => {
  const [themeForm, setThemeForm] = useState({
    name: '',
    salle: '',
    histoire: '',
    photo: ''
  });

  const [, setThemes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/themes')
      .then(response => response.json())
      .then(data => setThemes(data))
      .catch(error => console.error('Erreur lors du chargement des thèmes:', error));
  }, []);

  const handleThemeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:5000/themes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(themeForm)
    })
      .then(response => response.json())
      .then(newTheme => {
        console.log('Thème créé:', newTheme);
      })
      .catch(error => console.error('Erreur lors de la création du thème:', error));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setThemeForm(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Créer un Thème
      </Typography>

      <form onSubmit={handleThemeSubmit}>
        <Box mb={2}>
          <TextField
            label="Nom du thème"
            name="name"
            value={themeForm.name}
            onChange={handleThemeChange}
            fullWidth
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Salle"
            name="salle"
            value={themeForm.salle}
            onChange={handleThemeChange}
            fullWidth
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Histoire"
            name="histoire"
            value={themeForm.histoire}
            onChange={handleThemeChange}
            fullWidth
            multiline
            rows={4}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Photo"
            name="photo"
            value={themeForm.photo}
            onChange={handleThemeChange}
            fullWidth
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Créer Thème
        </Button>
      </form>
    </Box>
  );
};

export default CreateTheme;
