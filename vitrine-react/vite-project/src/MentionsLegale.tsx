import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const MentionsLegales: React.FC = () => {
  return (
    <div>
      <h1>Mentions Légales</h1>

      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site <strong>Escape Room Adventure</strong> est édité par :
        </p>
        <p>
          <strong>Escape Ventures</strong><br />
          123 Rue de l'Évasion<br />
          75001 Paris, France<br />
          +33 1 23 45 67 89<br />
          contact@escapeventures.fr
        </p>
      </section>

      <section>
        <h2>Hébergeur</h2>
        <p>
          Le site est hébergé par :
        </p>
        <p>
          <strong>Hosting Solutions</strong><br />
          456 Avenue du Serveur<br />
          75002 Paris, France<br />
          +33 1 98 76 54 32<br />
          www.hostingsolutions.fr
        </p>
      </section>

      <section>
        <h2>Directeur de la publication</h2>
        <p>Jean Dupont</p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur le site (textes, images, vidéos, logos, etc.)
          sont protégés par les lois en vigueur sur la propriété intellectuelle et sont la propriété exclusive de 
          <strong>Escape Ventures</strong> ou de ses partenaires. Toute reproduction, distribution, modification, 
          adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite 
          sans l'accord écrit de <strong>Escape Ventures</strong>.
        </p>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>
          Les informations recueillies sur le site <strong>Escape Room Adventure</strong> font l'objet d'un traitement 
          destiné à <strong>Escape Ventures</strong> pour la gestion de ses clients et prospects. En conformité avec 
          la loi "Informatique et Libertés" du 6 janvier 1978 modifiée, vous bénéficiez d'un droit d'accès, de rectification, 
          de suppression et d'opposition aux informations qui vous concernent, que vous pouvez exercer en vous adressant à 
          <strong>contact@escapeventures.fr</strong>.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Le site <strong>Escape Room Adventure</strong> peut-être amené à vous demander l’acceptation des cookies pour 
          des besoins de statistiques et d'affichage. Un cookie est une information déposée sur votre disque dur par le serveur 
          du site que vous visitez. Il contient plusieurs données qui sont stockées sur votre ordinateur dans un fichier texte 
          auquel un serveur accède pour lire et enregistrer des informations.
        </p>
      </section>

      <section>
        <h2>Responsabilité</h2>
        <p>
          <strong>Escape Ventures</strong> s’efforce de fournir sur le site <strong>Escape Room Adventure</strong> des informations aussi précises que possible. 
          Toutefois, <strong>Escape Ventures</strong> ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, 
          qu’elles soient de son fait ou du fait des tiers partenaires.
        </p>
      </section>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bienvenue sur Escape Room Adventure</h1>
      <Link to="/terms">
        <p>Mentions Légales</p>
      </Link>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/terms" component={MentionsLegales} />
        {/* Ajoutez d'autres routes ici */}
      </Switch>
    </Router>
  );
};

export default App;
