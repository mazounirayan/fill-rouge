import React, { useState } from 'react';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Alert,
  Typography
} from '@mui/material';

const EmployeeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newEmployee = {
      name,
      email,
      role,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        if (password.length >= 8) {
          Toastify({
            text: 'Employé créé avec succès !',
            duration: 3000,
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
          }).showToast();
          setName('');
          setEmail('');
          setPassword('');
          setError(null);
        } else {
          setError('Le mot de passe doit contenir au moins 8 caractères.');
          Toastify({
            text: 'Le mot de passe doit contenir au moins 8 caractères.',
            duration: 3000,
            backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
          }).showToast();
        }
      } else {
        throw new Error('Erreur lors de la création de l\'employé.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la communication avec le serveur.');
      Toastify({
        text: 'Erreur lors de la communication avec le serveur.',
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      }).showToast();
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Formulaire de création d'employé
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>

        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel>Rôle</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Rôle"
              required
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="staff">Staff</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box mb={2}>
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>

        <Button type="submit" variant="contained" color="error">
          Créer
        </Button>
      </form>
    </Box>
  );
};

export default EmployeeForm;
