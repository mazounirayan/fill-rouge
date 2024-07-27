import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Modal,
  IconButton,
  Alert
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filterRole, setFilterRole] = useState<string>('');
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData('http://localhost:5000/employees', setEmployees);
  }, []);

  const fetchData = async (url: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleFilter = () => {
    let url = 'http://localhost:5000/employees';
    if (filterRole) {
      url += `?role=${encodeURIComponent(filterRole)}`;
    }
    fetchData(url, setEmployees);
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/employees/${id}`, {
        method: 'DELETE',
      });
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'employé:', error);
      setError('Erreur lors de la suppression de l\'employé.');
    }
  };

  const handleUpdate = (employee: Employee) => {
    setEditEmployee(employee);
    setOpenModal(true);
  };

  const handleSaveUpdate = async () => {
    if (editEmployee) {
      try {
        const response = await fetch(`http://localhost:5000/employees/${editEmployee.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editEmployee),
        });
        const updatedEmployee = await response.json();
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee))
        );
        setEditEmployee(null);
        setOpenModal(false);
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'employé:', error);
        setError('Erreur lors de la mise à jour de l\'employé.');
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Comptes Employés
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <FormControl sx={{ mr: 2, minWidth: 120 }}>
          <InputLabel>Rôle</InputLabel>
          <Select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            label="Rôle"
          >
            <MenuItem value="">Choisir un rôle</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleFilter} variant="contained" color="primary">
          Filtrer
        </Button>
      </Box>
      <List>
        {employees.map((employee) => (
          <ListItem key={employee.id} sx={{ mb: 2, p: 2, border: '1px solid', borderRadius: 1 }}>
            <ListItemText
              primary={employee.name}
              secondary={
                <>
                  <Typography variant="body2">Email: {employee.email}</Typography>
                  <Typography variant="body2">Rôle: {employee.role}</Typography>
                </>
              }
            />
            <Box>
              <Button onClick={() => handleDeleteEmployee(employee.id)} variant="contained" color="error" sx={{ mr: 1 }}>
                Supprimer
              </Button>
              <Button onClick={() => handleUpdate(employee)} variant="contained" color="warning">
                Modifier
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ p: 3, maxWidth: 500, mx: 'auto', bgcolor: 'background.paper', borderRadius: 2, mt: 5 }}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Modifier l'Employé
          </Typography>
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Nom"
              value={editEmployee?.name || ''}
              onChange={(e) => setEditEmployee({ ...editEmployee!, name: e.target.value })}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={editEmployee?.email || ''}
              onChange={(e) => setEditEmployee({ ...editEmployee!, email: e.target.value })}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Rôle</InputLabel>
              <Select
                value={editEmployee?.role || ''}
                onChange={(e) => setEditEmployee({ ...editEmployee!, role: e.target.value })}
                label="Rôle"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Mot de passe"
              type="password"
              value={editEmployee?.password || ''}
              onChange={(e) => setEditEmployee({ ...editEmployee!, password: e.target.value })}
            />
          </Box>
          <Button onClick={handleSaveUpdate} variant="contained" color="primary" sx={{ mr: 1 }}>
            Sauvegarder
          </Button>
          <Button onClick={() => setOpenModal(false)} variant="outlined" color="secondary">
            Annuler
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default EmployeeList;
