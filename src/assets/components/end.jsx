import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { BackgroundAudio } from "./start";
import DefeatedMusic from './../audios/defeat.mp3';
import VictoryMusic from './../audios/victory.mp3';
import Logo from '../images/valorantLogo.jpg';

export default function End({ defeated }){
    const navigateTo = useNavigate();
    
    function handlePlayClick(){
      navigateTo("/play");
    }

      const musicLink = defeated ? DefeatedMusic : VictoryMusic;
      const displayText = defeated ? "Unfortunate Battle, better luck next time." : "Congratulation for overcoming this overwhelming challenge"
      return (
          <div className="bg-end">
              <div className="nav py-2 mb-40">
                  <img src={Logo} alt="valorantLogo" className="w-20 mx-4 bg-gray-200" />
                  </div>
              <div className="mb-40 startText py-10">
                  <p className=" block mx-auto text-center text-white  text-2xl my-4 font-bold font-valorant mb-20">{displayText}</p>
                  <button className="font-bold text-white bg-red-600 px-10 py-1.5 hover:bg-red-800 block mx-auto font-tungsten text-5xl"  onClick={handlePlayClick}>PLAY AGAIN</button>
              </div>
              <BackgroundAudio link={musicLink}></BackgroundAudio>
          </div>
      )
    
  }

End.propTypes = {
    defeated: PropTypes.bool,
};