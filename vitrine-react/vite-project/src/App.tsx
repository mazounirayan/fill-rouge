// src/App.tsx
import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Feature from './components/Salles';
import Offer from './components/Offer';
import Contact from './components/Contact';
import Footer from './components/Footer';
import About from './components/About';
import BookingForm from './components/Reservation';
import './App.css';




const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Feature />
      <Offer />
      <About />
      <BookingForm />
      <Contact />
      <Footer />
   
    </div>
  );
};

export default App;
