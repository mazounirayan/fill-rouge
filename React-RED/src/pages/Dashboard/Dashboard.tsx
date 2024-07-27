import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';
import TheatersIcon from '@mui/icons-material/Theaters';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import GroupIcon from '@mui/icons-material/Group';
const Dashboard: React.FC = () => {
  const tiles = [
    { title: 'Employés', path: '/employeeForm', color: '#4CAF50', icon: <PersonIcon /> },
    { title: 'Sessions', path: '/sessions', color: '#2196F3', icon: <EventIcon /> },
    { title: 'Create Session', path: '/create-session', color: '#FF9800', icon: <AddIcon /> },
    { title: 'Theme Creation', path: '/themeCreation', color: '#9C27B0', icon: <TheatersIcon /> },
    { title: 'Reservation Manager', path: '/Reservation', color: '#E91E63', icon: <BookOnlineIcon /> },
    { title: 'Employee List', path: '/employees', color: '#00BCD4', icon: <GroupIcon /> },
  
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tiles.map((tile, index) => (
        <Link key={index} to={tile.path} style={{ textDecoration: 'none' }}>
          <Card 
            sx={{ 
              height: '50%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              backgroundColor: tile.color,
              color: 'white',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
              }
            }}
          >
            <Box sx={{ fontSize: '48px', mb: 2 }}>
              {tile.icon}
            </Box>
            <CardContent>
              <Typography variant="h6" component="div" align="center">
                {tile.title}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Dashboard;