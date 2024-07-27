import '../css/About.css';
import locaux from '../images/Locaux.jpg';

function About() {
  return (
    <div id="about"className="company-presentation">
      
      <main className="main">
        <section className="intro">
          <h1 className='h1'>A propos de nous</h1>
          <img className="img" src={locaux} alt="" />
          <h3 className='h1'>Présentation de l'Entreprise</h3>
          <p>
          Évasion Mystique est bien plus qu'un simple lieu de divertissement. Fondée par une équipe de passionnés d'aventure et de mystère,
          l'entreprise est née d'une idée simple : offrir des expériences immersives qui transportent les participants dans des mondes fantastiques et palpitants.
          Depuis son ouverture, Évasion Mystique s'est rapidement imposée comme une référence incontournable dans le domaine des escape games,
          grâce à des scénarios soigneusement conçus et une attention méticuleuse aux détails.</p>

          <h3 className='h1'>Histoire de l'Entreprise</h3>
          <p>
          Tout a commencé avec un groupe d'amis d'enfance, tous fascinés par les histoires de mystère et les jeux de rôles grandeur nature.
          Après avoir voyagé aux quatre coins du monde et exploré de nombreux escape games, ils ont décidé de créer leur propre entreprise,
          alliant leurs compétences variées en scénarisation, en design et en ingénierie.

          En 2020, après deux ans de planification et de développement, Évasion Mystique a ouvert ses portes dans un ancien bâtiment industriel rénové,
          offrant un cadre unique et une atmosphère authentique à ses visiteurs.
          L'entreprise a rapidement gagné en popularité grâce à ses scénarios originaux et à son approche immersive.
          </p>

        </section>
      </main>
    </div>
  );
};

export default About

