import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const GameContainer = styled.div`
  text-align: center;
  position: relative;
  height: 300px;
  border: 1px solid #ccc;
  padding-top: 20px;
  width: 500px;
`;

const Timer = styled.div`
  display:flex;
  justify-content: space-between;
  font-size: 24px;
  color: white;
  background-color: #605EF9;
  padding: 10px;
  margin-bottom: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const BallDescription = styled.div`
 display:flex;
 flex-direction:column;
 justify-content: center;
 margin-top: 20px;
`;

const BallDescriptionLine = styled.div`
 display:flex;
 flex-direction:column;
 justify-content: center;
 margin-top: 30px;
`;

const GreenZone = styled.div`
  height: 100px;
  background-color: lightgreen;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  border: 2px solid black;
`;

const Ball = styled.div<{ y: number }>`
  width: 30px;
  height: 30px;
  background-color: blue;
  border-radius: 50%;
  position: absolute;
  top: ${({ y }) => y}px;
  left: calc(50% - 15px);
  transition: top 0.1s;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 20px;
  background-color: black;
  color: white;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const Game: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [ballY, setBallY] = useState(150); 
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setBallY(prev => Math.min(prev + 5, 270)); 
      }, 100);

      const timerId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerId);
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            localStorage.setItem('score', JSON.stringify(score));
            navigate('/congrats');
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        clearInterval(timerId);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isPlaying, score, navigate]);

  const handleJump = () => {
    if (isPlaying) {
      if (ballY >= 100 && ballY <= 170) setScore(score + 1); 
      setBallY(Math.max(ballY - 30, 0));
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(15);
    setBallY(150);
    setScore(0);
  };

  return (
    <GameContainer>
      <Timer>
        <div>Timer</div>
        <div>{timeLeft}s</div>
      </Timer>
      <BallDescription>
       <p>Keep the ball in the green <br/>for 8 seconds</p>
       <BallDescriptionLine/>
      </BallDescription>
      <GreenZone />
      <Ball y={ballY} />
      {!isPlaying && <Button onClick={startGame}>Tap to Begin</Button>}
      {isPlaying && <Button onClick={handleJump}>Tap</Button>}
    </GameContainer>
  );
};

export default Game;
