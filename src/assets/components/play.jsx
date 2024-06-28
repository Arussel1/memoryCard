import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from "react";
import { BackgroundAudio } from "./start";
import BackgroundPlayMusic from './../audios/play.mp3';
import Logo from '../images/valorantLogo.jpg';

export default function Play({ highScore, setHighScore }) {
    const [curScore, setCurScore] = useState(0);
    const [cardList, setCardList] = useState([]);
    const [clickedCards, setClickedCards] = useState({});
    const [stage, setStage] = useState(0);
    const stages = [3, 5, 7, 9, 11];
    const stageUpdated = useRef(false);
    const navigateTo = useNavigate();
    const maxScore = 35;
    
    const handleDefeatedPlayClick = useCallback(() => {
        console.log("Defeated");
        navigateTo("/endDefeated");
    }, [navigateTo]);

    const handleVictoryPlayClick = useCallback(() => {
        navigateTo("/endVictory");
    }, [navigateTo]);

    useEffect(() => {
        if (curScore === maxScore) {
            handleVictoryPlayClick();
        }
    }, [curScore, handleVictoryPlayClick]);

    useEffect(() => {
        async function fetchData() {
            try {
                const rawData = await getValorantData();
                const processedData = processValorantData(rawData);
                initializeCards(processedData);
                stageUpdated.current = false; // Flag variable to avoid useEffect twice
            } catch (error) {
                console.error("Error fetching or processing data:", error);
            }
        }

        fetchData();
    }, [stage]); 

    function initializeCards(processedData) {
        const displayCardSet = new Set();
        while (displayCardSet.size < stages[stage]) {
            displayCardSet.add(Math.floor(Math.random() * 24));
        }
        const initialCards = Array.from(displayCardSet).map((data, index) => ({
            index,
            name: processedData[data].name,
            imageURL: processedData[data].image,
            clicked: clickedCards[index] || false,
        }));
        setCardList(initialCards);
    }

    function handleCardClick(index) {
        if (!clickedCards[index]) {
            setCurScore(prevScore => {
                const newScore = prevScore + 1;
                if (newScore > highScore) {
                    setHighScore(newScore); 
                }
                return newScore;
            });
            setClickedCards(prevClicked => ({
                ...prevClicked,
                [index]: true,
            }));
        } else {
            handleDefeatedPlayClick();
        }
    }

    function shuffleCards() {
        const shuffledCards = cardList.slice().sort(() => Math.random() - 0.5);
        setCardList(shuffledCards);
    }

    // Next stage progress if all cards are clicked
    useEffect(() => {
        const clickedCount = Object.keys(clickedCards).length;
        if (clickedCount === stages[stage] && !stageUpdated.current) {
            stageUpdated.current = true;
            if (stage < stages.length - 1) {
                setStage(prevStage => prevStage + 1);
                setClickedCards({});
            }
        }
    }, [clickedCards, stage, stages]);

    function Card({ index, imageURL, name, handleCardClick, clicked }) {
        function handleClicked() {
            handleCardClick(index);
        }

        return (
            <button
                className="bg-gray-200 hover:bg-gray-400 hover:cursor-pointer bg-opacity-50 mr-8 max-w-60 mb-8"
                onClick={handleClicked}
            >
                <img className="mb-4" src={imageURL} alt="agentImage" />
                <p className="text-center text-l font-semibold">{name}</p>
            </button>
        );
    }

    // Shuffle cards when curScore changes
    useEffect(() => {
        shuffleCards();
    }, [curScore]);

    return (
        <div className="bg-play">
            <div className="nav py-2 mb-40 flex">
                <img src={Logo} alt="valorantLogo" className="w-20 mx-4 bg-gray-200" />
                <p className="ml-auto mr-12 py-4 text-lg">Current score: {curScore}</p>
                <p className="ml-auto mr-12 py-4 text-lg">Highest score: {highScore}</p>
            </div>
            <div className="cards flex flex-wrap justify-center mb-20">
                {cardList.map(card => (
                    <Card
                        key={card.index}
                        index={card.index}
                        name={card.name}
                        imageURL={card.imageURL}
                        handleCardClick={handleCardClick}
                        clicked={card.clicked}
                    />
                ))}
            </div>
            <BackgroundAudio link={BackgroundPlayMusic} />
        </div>
    );
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