import '../css/offer.css'; // Assurez-vous de lier votre fichier CSS

function Offer() {
  return (
    <div className='offer'>

        <h1 className='h1'>Nos offres</h1>
        <div className='details'>
          <div className='room'>
            <h2>Asile</h2>
            <p>60 minutes de jeu</p>
            <p>2 à 6 joueurs</p>
            <p>80€</p>
          </div>
          <div className='room'>
            <h2>Crypte</h2>
            <p>60 minutes de jeu</p>
            <p>2 à 4 joueurs</p>
            <p>60€</p>
          </div>
          <div className='room'>
            <h2>Laboratoire</h2>
            <p>60 minutes de jeu</p>
            <p>2 joueurs</p>
            <p>40€</p>
          </div>
      
      </div>
    </div>
  );
}

export default Offer;
