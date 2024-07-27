import React, { useState } from 'react';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import '../css/contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const contact = {
      name,
      email,
      message,
    };

    try {
      const response = await fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        // Réinitialiser le formulaire ou afficher un message de succès
        setName('');
        setEmail('');
        setMessage('');
        Toastify({
          text: 'Message envoyé avec succès!',
          duration: 3000,
          backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
        }).showToast();
      } else {
        // Gérer les erreurs de réponse du serveur
        Toastify({
          text: 'Une erreur est survenue lors de l\'envoi du message.',
          duration: 3000,
          backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        }).showToast();
      }
    } catch (error) {
      // Gérer les erreurs de requête réseau
      console.error('Erreur:', error);
      Toastify({
        text: 'Une erreur est survenue lors de l\'envoi du message.',
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      }).showToast();
    }
  };

  return (
    <div className="contact">
      <h1>CONTACTEZ NOUS</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Nom Prenom'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type='email'
          placeholder='E-Mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder='Ecrivez ici...'
          name='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <input type='submit' value='Envoyer' />
      </form>
    </div>
  );
}

export default Contact;
