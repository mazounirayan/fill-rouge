import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import {  Box, Typography, Button, MenuItem, Select, InputLabel, FormControl, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export interface Session {
  id?: number;
  theme: string;
  duration: number;
  date: string;
  price: number;
  minParticipants: number;
  availableSlots: { time: string; maxParticipants: number; remainingPlaces: number }[];
  createdBy: number;
}

interface Theme {
  id: number;
  name: string;
  salle: number;
  histoire: string;
  photo?: string;
}

const SessionList: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filterTheme, setFilterTheme] = useState<string>('');
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [editSession, setEditSession] = useState<Session | null>(null);
  const [newSlot, setNewSlot] = useState<string>('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddSlotDialog, setOpenAddSlotDialog] = useState(false);

  useEffect(() => {
    fetchData('http://localhost:5000/sessions', setSessions);
  }, []);

  useEffect(() => {
    fetchData('http://localhost:5000/themes', setThemes);
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
    let url = 'http://localhost:5000/sessions';
    const params = [];

    if (filterTheme) {
      params.push(`theme=${encodeURIComponent(filterTheme)}`);
    }
    if (filterDate) {
      params.push(`date=${format(filterDate, 'yyyy-MM-dd')}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    fetchData(url, setSessions);
  };

  const handleDeleteSession = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/sessions/${id}`, {
        method: 'DELETE',
      });
      setSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la séance:', error);
    }
  };

  const handleDeleteSlot = async (sessionId: number, slotIndex: number) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      const updatedSlots = session.availableSlots.filter((_, index) => index !== slotIndex);
      const updatedSession = { ...session, availableSlots: updatedSlots };

      try {
        const response = await fetch(`http://localhost:5000/sessions/${sessionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedSession),
        });
        const data = await response.json();
        setSessions((prevSessions) => prevSessions.map((session) => (session.id === data.id ? data : session)));
      } catch (error) {
        console.error('Erreur lors de la suppression du créneau:', error);
      }
    }
  };

  const handleUpdate = (session: Session) => {
    setEditSession(session);
    setOpenEditDialog(true);
  };

  const handleSaveUpdate = async () => {
    if (editSession) {
      try {
        const response = await fetch(`http://localhost:5000/sessions/${editSession.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editSession),
        });
        const updatedSession = await response.json();
        setSessions((prevSessions) => prevSessions.map((session) => (session.id === updatedSession.id ? updatedSession : session)));
        setEditSession(null);
        setOpenEditDialog(false);
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la séance:', error);
      }
    }
  };

  const handleAddSlot = (id: number) => {
    const session = sessions.find((s) => s.id === id);
    if (session) {
      setEditSession(session);
      setOpenAddSlotDialog(true);
    }
  };

  const handleSaveSlot = async () => {
    if (editSession) {
      const updatedSlots = [...editSession.availableSlots, { time: newSlot, maxParticipants: 10, remainingPlaces: 10 }];
      const updatedSession = { ...editSession, availableSlots: updatedSlots };

      try {
        const response = await fetch(`http://localhost:5000/sessions/${editSession.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedSession),
        });
        const data = await response.json();
        setSessions((prevSessions) => prevSessions.map((session) => (session.id === data.id ? data : session)));
        setEditSession(null);
        setNewSlot('');
        setOpenAddSlotDialog(false);
      } catch (error) {
        console.error('Erreur lors de l\'ajout du créneau:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sessions d'Escape Game
      </Typography>
      <Box mb={2} display="flex" alignItems="center" gap={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Thème</InputLabel>
          <Select
            value={filterTheme}
            onChange={(e) => setFilterTheme(e.target.value)}
            label="Thème"
          >
            <MenuItem value="">Choisir un thème</MenuItem>
            {themes.map((theme) => (
              <MenuItem key={theme.id} value={theme.id}>{theme.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <DatePicker
          selected={filterDate}
          onChange={(date) => setFilterDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Sélectionner une date"
          className="react-datepicker-wrapper"
          customInput={
            <TextField
              variant="outlined"
              fullWidth
              label="Date"
              InputLabelProps={{ shrink: true }}
            />
          }
        />
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filtrer
        </Button>
      </Box>

      <Box>
        {sessions.map((session) => (
          <Box key={session.id} mb={2} p={2} border={1} borderRadius={1} borderColor="grey.300">
            <Typography variant="h6">{session.theme}</Typography>
            <Typography>Date: {format(new Date(session.date), 'dd/MM/yyyy')}</Typography>
            <Typography>Durée: {session.duration} minutes</Typography>
            <Typography>Prix: {session.price} €</Typography>
            <Typography>Participants minimum: {session.minParticipants}</Typography>
            <Typography>Créneaux disponibles:
              {session.availableSlots.map((slot, index) => (
                <Box key={index} display="inline-flex" alignItems="center" ml={2}>
                  {slot.time} ({slot.remainingPlaces}/{slot.maxParticipants})
                  <IconButton color="error" onClick={() => handleDeleteSlot(session.id!, index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Typography>
            <Box mt={1}>
              <Button variant="contained" color="error" onClick={() => handleDeleteSession(session.id!)} startIcon={<DeleteIcon />}>
                Supprimer
              </Button>
              <Button variant="contained" color="warning" onClick={() => handleUpdate(session)} startIcon={<EditIcon />}>
                Modifier
              </Button>
              <Button variant="contained" color="success" onClick={() => handleAddSlot(session.id!)} startIcon={<AddCircleIcon />}>
                Ajouter Créneau
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Modifier la Séance</DialogTitle>
        <DialogContent>
          {editSession && (
            <>
              <TextField
                fullWidth
                label="Thème"
                value={editSession.theme}
                onChange={(e) => setEditSession({ ...editSession, theme: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Durée"
                type="number"
                value={editSession.duration}
                onChange={(e) => setEditSession({ ...editSession, duration: parseInt(e.target.value) })}
                margin="normal"
              />
              <DatePicker
                selected={new Date(editSession.date)}
                onChange={(date: Date | null) => setEditSession({ ...editSession, date: date ? date.toISOString() : '' })}
                dateFormat="dd/MM/yyyy"
                customInput={
                  <TextField
                    fullWidth
                    label="Date"
                    InputLabelProps={{ shrink: true }}
                  />
                }
              />
              <TextField
                fullWidth
                label="Prix"
                type="number"
                value={editSession.price}
                onChange={(e) => setEditSession({ ...editSession, price: parseFloat(e.target.value) })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Participants minimum"
                type="number"
                value={editSession.minParticipants}
                onChange={(e) => setEditSession({ ...editSession, minParticipants: parseInt(e.target.value) })}
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveUpdate} color="primary">Enregistrer</Button>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">Annuler</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddSlotDialog} onClose={() => setOpenAddSlotDialog(false)}>
        <DialogTitle>Ajouter un Créneau</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Créneau"
            value={newSlot}
            onChange={(e) => setNewSlot(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveSlot} color="primary">Enregistrer</Button>
          <Button onClick={() => setOpenAddSlotDialog(false)} color="secondary">Annuler</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SessionList;
