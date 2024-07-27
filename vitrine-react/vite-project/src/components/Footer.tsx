
import '../css/footer.css'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


function Footer() {
return (
    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
        <div className="sb_footer-links_div">
            <h4>Entreprise</h4>
            <p>contact.evasionmystique @email.com</p>
            <p>242 rue du Faubourg Saint-Antoine, 75012 Paris</p>
            <p>06 06 06 06 06</p>
          </div>
          <div className="sb_footer-links_div">
            <h4>Nous trouver</h4>
            <a href="https://www.google.com/maps/dir//242+Rue+du+Faubourg+Saint-Antoine,+75012+Paris/@48.8491372,2.3073339,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x47e6720d9c7af387:0x5891d8d62e8535c7!2m2!1d2.3897343!2d48.8491666?hl=fr&entry=ttu" target='blank'><p>Google Maps</p></a>
            <p>Métro : 1, 2, 6, 9 </p>
            <p>RER : A</p>
            <p>Bus : 57, N11</p>
          </div>
       
          <div className="socialmedia">

         <div className='textsocialmedia'>  Coming soon on:</div> 
        
            <a href="https://www.facebook.com/" target='blank'><FaFacebook/></a>
            <a href="https://www.twitter.com/" target='blank'><FaTwitter/></a>
            <a href="https://www.instagram.com/" target='blank'><FaInstagram/></a>
          </div>
        </div>
      </div>

      <hr></hr>
      <div className='sb__footer-below-links'>
        <a href='/terms'><div><p>Terms & Condition</p></div></a>
      </div>
    </div>


)
};







export default Footer;
