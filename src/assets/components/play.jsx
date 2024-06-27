import { useState, useEffect } from "react";
import { BackgroundAudio } from "./start";
import BackgroundPlayMusic from './../audios/play.mp3'
import Logo from '../images/valorantLogo.jpg'

export default function Play() {
    const [curScore,setCurscore] = useState(0);
    const [highScore,setHighScore] = useState(0);
    const [cardList,setcardList] = useState([]);
    let cardAmount = 3;
    let displayCardSet = new Set([]);
    while(displayCardSet.size < cardAmount ){
        displayCardSet.add(Math.floor(Math.random() * 24));
    }
     
    useEffect(() => {
        async function fetchData(){
            try {
                const rawData = await getValorantData();
                const processedData = processValorantData(rawData);
                const returnData = Array.from(displayCardSet).map((data,index) => 
                    <Card index={index} name={processedData[data].name} imageURL={processedData[data].image} ></Card>
                )
                setcardList(returnData);
            } catch (error) {
                console.error("Error fetching or processing data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-play">
            <div className="nav py-2 mb-40 flex">
                <img src={Logo} alt="valorantLogo" className="w-20 mx-4 bg-gray-200" />
                <p className="ml-auto mr-12 py-4 text-lg">Current score: {curScore}</p>
                <p className="ml-auto mr-12 py-4 text-lg">Highest score: {highScore}</p>
            </div>
            <div className="cards flex flex-wrap justify-center mb-20">
                {cardList}
            </div>
            <BackgroundAudio link={BackgroundPlayMusic} ></BackgroundAudio>
        </div>
    )
}

async function getValorantData() {
    try {
        const response = await fetch('https://valorant-api.com/v1/agents', { mode: "cors" });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Can't get info", error);
        throw error; 
    }
}

function processValorantData(data) {
    if (!data || !data.data) {
        console.error("Invalid data format or empty data");
        return [];
    }

    return data.data.filter(agent => agent.isPlayableCharacter).map(agent => ({
        name: agent.displayName,
        image: agent.fullPortrait
    }));
}

function Card({index,imageURL, name}){
    const [clicked,setClicked] = useState(false);
    function handleClicked(){
        setClicked(true);
    }
    return (
        <button 
            className="bg-gray-200 hover:bg-gray-400 hover:cursor-pointer bg-opacity-50 mr-8 max-w-60 mb-8" 
            key={index}
            onClick={handleClicked}>
                        <img className="mb-4" src={imageURL} alt="agentImage" />
                        <p className=" text-center text-l font-semibold">{name}</p>
                    </button>
    )
}