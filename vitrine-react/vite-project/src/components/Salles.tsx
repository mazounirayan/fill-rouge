// Feature.tsx
import FeatureBox from './FeatureBox';
import Image1 from '../images/Asile.jpeg';
import Image2 from '../images/Crypte.png';
import Image3 from '../images/Laboratoire.png';
import '../App.css';

function Feature() {
  return (
    <div id='features'>
      <h1>Nos Escape Game</h1>
      <div className='a-container'>
        <FeatureBox image={Image1} title='Asile' text='Vous êtes enfermé dans un asile psychiatrique abandonné. Vous avez une heure pour vous échapper avant que le personnel ne revienne.'/>
        <FeatureBox image={Image2} title='Crypte' text="Vous êtes piégé dans une crypte suite à une expedition qui a mal tourné. Vous avez une heure pour vous échapper avant que vous ne soyez prisonnier pour l'éternité."/>
        <FeatureBox image={Image3} title='Laboratoire' text="Vous êtes enfermé dans le laboratoire d'un savent fou. Vous avez une heure pour vous échapper avant qu'il ne revienne."/>
      </div>
    </div>
  );
}

export default Feature;
