import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const CongratsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 0 20px 20px;
  width: 500px;
`;

const BorderCongrats = styled.div`
 border: 2px solid #ccc;
 border-radius: 10px;
 padding: 20px;
 margin-bottom: 20px;

`;

const Header = styled.div`
  width: 100%;
  background-color: #605EF9;
  color: white;
  padding: 10px;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Score = styled.div`
  font-size: 48px;
  font-weight: bold;
`;

const ScoreSeconds = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Message = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid black;
  margin-bottom: 20px;
  padding: 5px;
  font-size: 18px;
  width: 80%;
  text-align: left;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  width: 80%;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const Congrats: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const score = JSON.parse(localStorage.getItem('score') || '0');
  const { width, height } = useWindowSize();

  const handleContinue = () => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    leaderboard.push({ name, score });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    navigate('/leaderboard');
  };

  return (
    <CongratsContainer>
      <Confetti width={width} height={height} numberOfPieces={200} />
      <Header>Times Up!</Header>
      <img src="/img/confetti.png" alt="Confetti" style={{ width: '100px', height: '100px' }} />
     <BorderCongrats>
       <Score>{score}</Score>
       <ScoreSeconds>seconds</ScoreSeconds>
       <Message>Congrats! You got a high score</Message>
     </BorderCongrats>
     
      <Input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button 
       disabled={!name}
      onClick={handleContinue}
      >Continue to Leaderboard</Button>
    </CongratsContainer>
  );
};

export default Congrats;
