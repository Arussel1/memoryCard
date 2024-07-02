import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from './../images/valorantLogo.jpg'
import BackgroundMusicStart from './../audios/start.mp3'
import soundMute from './../images/soundMute.svg'
import soundPlay from './../images/soundPlay.svg'

function BackgroundAudio({link}){
    function muteToggle(){
        setIsMuted((prevState) => !prevState);
    }
    const audioRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);
  
    useEffect(() => {
      audioRef.current.volume = 0.5;
      audioRef.current.muted = isMuted;
    }, [isMuted]);
  
    return (
      <button className="bg-red-500 mx-2 p-2.5 rounded-full hover:bg-red-800" onClick={muteToggle}>
        <img src={isMuted ? soundMute : soundPlay} alt="music" />
        <audio ref={audioRef} src={link} autoPlay loop />
      </button>
    );
  }

function Start(){
  
  const navigateTo = useNavigate();

  function handlePlayClick(){
    navigateTo("/play");
  }

    return (
        <div className="bg-start">
            <div className="nav py-2 mb-40">
                <img src={Logo} alt="valorantLogo" className="w-20 mx-4 bg-gray-200" />
                </div>
            <div className="mb-40 startText">
                <p className=" block mx-auto text-center text-white  text-2xl my-4 font-bold font-valorant ">Welcome to Valorant HQ. Deep within the fortified walls of Kingdom Corp&apos;s stronghold, an agent has been captured, their fate hanging in the balance. Valorant HQ mobilizes swiftly, navigating through shadows and security protocols, determined to bring their comrade home safely from the heart of enemy territory. Are you ready to rescue our hero ?</p>
                <button className="font-bold text-white bg-red-600 px-10 py-1.5 hover:bg-red-800 block mx-auto font-tungsten text-5xl"  onClick={handlePlayClick}>PLAY</button>
            </div>
            <BackgroundAudio link={BackgroundMusicStart}></BackgroundAudio>
        </div>
    )
  
}

BackgroundAudio.propTypes = {
  link: PropTypes.string,
};

export {Start, BackgroundAudio}
