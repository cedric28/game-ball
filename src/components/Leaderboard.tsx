import React from 'react';
import styled from 'styled-components';

const LeaderboardContainer = styled.div`
  text-align: center;
`;

const List = styled.ol`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: solid 1px #ccc;

`;

const RankCircle = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e0e0e0;
  color: #333;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const PlayerName = styled.span`
  font-size: 18px;
  font-weight: bold;
  text-transform: capitalize;
`;

const Score = styled.span`
  font-size: 0.6em;
  color: #666;
`;

const PlayerNameScore =styled.div`
 display:flex;
 flex-direction: column;
 align-items: flex-start;
`;

const Leaderboard: React.FC = () => {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]')
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
    .slice(0, 10);

  return (
    <LeaderboardContainer>
      <h1>Leaderboard</h1>
      <List>
        {leaderboard.map((entry: { name: string; score: number }, index: number) => (
          <ListItem key={index}>
            <RankCircle>#{index + 1}</RankCircle>
            <PlayerNameScore>
              <PlayerName>{entry.name}</PlayerName>
              <Score>{entry.score} Total Seconds</Score>
            </PlayerNameScore>
          </ListItem>
        ))}
      </List>
    </LeaderboardContainer>
  );
};

export default Leaderboard;