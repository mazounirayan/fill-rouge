import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Sidbar from './components/Sidebar/Sidbar';
import Topbar from './components/NavBar/Navbar';
import SessionList from './pages/session/sessionList';
import CreateSession from './pages/session/Creation';
import EmployeeForm from './pages/Dashboard/Employee';
import { AuthProvider } from './pages/Authentication/AuthContext';
import ProtectedRoute from './pages/Authentication/ProtectedRoute';
import SignIn from './pages/Authentication/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateTheme from './pages/session/theme';
import EmployeeList from './pages/Employee/EmployeeList';
import { ColorModeContext, useMode } from './components/theme/theme';
import './App.css';
import ReservationManager from './pages/Reservation/ReservationList';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSidebar, setIsSidebar] = useState<boolean>(true);
  const { pathname } = useLocation();
  const [theme, colorMode] = useMode();
  const isLoginPage = location.pathname === '/signin';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          {loading ? (
            <Loader />
          ) : (
            <Box display="flex" height="100vh">
               {!isLoginPage && <Sidbar isSidebar={isSidebar} />}
              
              <Box flexGrow={1} display="flex" flexDirection="column">
              {!isLoginPage &&   <Topbar setIsSidebar={setIsSidebar} />}
                <Box flexGrow={1} p={2} bgcolor="background.default">
                  <Routes>
                    <Route
                      index
                      element={
                        <ProtectedRoute
                          element={
                            <>
                              <PageTitle title="Dashboard" />
                              <Dashboard />
                            </>
                          }
                        />
                      }
                    />
                    <Route
                      path="/signin"
                      element={
                        <>
                          <PageTitle title="Sign In" />
                          <SignIn />
                        </>
                      }
                    />
                    <Route
                      path="/sessions"
                      element={
                        <ProtectedRoute
                          element={
                            <>
                              <PageTitle title="Sessions d'Escape Game" />
                              <SessionList />
                            </>
                          }
                        />
                      }
                    />
                    <Route
                      path="/Reservation"
                      element={
                        <ProtectedRoute
                          element={
                            <>
                              <PageTitle title="Reservation d'Escape Game" />
                              <ReservationManager />
                            </>
                          }
                        />
                      }
                    />
                    <Route
                      path="/create-session"
                      element={
                        <ProtectedRoute
                          element={
                            <>
                              <PageTitle title="Créer une nouvelle session" />
                              <CreateSession />
                            </>
                          }
                        />
                      }
                    />
                    <Route
                      path="/employeeForm"
                      element={
                        <ProtectedRoute
                          element={
                            <>
                              <PageTitle title="Profile" />
                              <EmployeeForm />
                            </>
                          }
                        />
                      }
                    />
                    <Route
                      path="/employees"
                      element={
                        <ProtectedRoute
                          element={
                            <>
                              <PageTitle title="Comptes employé" />
                              <EmployeeList />
                            </>
                          }
                        />
                      }
                    />
                    <Route
                      path="/themeCreation"
                      element={
                        <ProtectedRoute
                          element={
                            <>
                              <PageTitle title="Theme creation" />
                              <CreateTheme />
                            </>
                          }
                        />
                      }
                    />
                    <Route path="*" element={<Navigate to="/signin" replace />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          )}
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
