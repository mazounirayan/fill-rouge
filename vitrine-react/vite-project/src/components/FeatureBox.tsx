// FeatureBox.tsx
import '../App.css';

function FeatureBox(props: any) {
  return (
    <div className='a-box'>
      <div className='a-b-img'>
        <img src={props.image} alt=''/>
      </div>
      <div className='a-b-text'>
        <h2>{props.title}</h2>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default FeatureBox;
