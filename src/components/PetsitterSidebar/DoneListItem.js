import React, { useState } from 'react';
// import styled from 'styled-components';
import social from '../../assets/social.png';
import heart from '../../assets/heart.png';
import {
  ItemContainer, Dealt, Progress, Button, ProfileImg, IconImg, InfoContainer, EvalContainer, ProfileContainer, BarContainer,
} from '../../styles/sidebar/SidebarStyle';

function DoneListItem({ item, setPrintBody }) {
  // console.log(item);
  const [showDiv, setShowDiv] = useState(false);
  const showButton = (
    <>
      <button>일지</button>
      <button>상세</button>
    </>
  );

  const onClick = () => {
    setPrintBody(['eval', item.reservationId]);
  };
  return (
    <>
      <ItemContainer onMouseEnter={() => setShowDiv(true)} onMouseLeave={() => setShowDiv(false)}>
        <div>
          <ProfileContainer>
            <ProfileImg src={item.dogImg} alt="img" />
            <InfoContainer>
              <p className="info">
                {item.dogName} | {item.cost}
              </p>
              <p className="period">{item.checkIn} ~ {item.checkOut}</p>
            </InfoContainer>
          </ProfileContainer>
          <BarContainer>
            <EvalContainer>
              <IconImg src={social} alt="social" />
              <Button onClick={onClick}>평가하기</Button>
            </EvalContainer>
            <EvalContainer>
              <IconImg className="heart" src={heart} alt="heart" />
              <Progress className="heart">
                <Dealt className="heart" dealt={item.affectionTemperature} />
              </Progress>
              <p className="heart">{item.affectionTemperature}%</p>
            </EvalContainer>
            <EvalContainer>
              <IconImg className="social" src={social} alt="social" />
              <Progress className="social">
                <Dealt className="social" dealt={item.socializationTemperature} />
              </Progress>
              <p className="social">{item.socializationTemperature}%</p>
            </EvalContainer>
            <EvalContainer>
              <IconImg className="social" src={social} alt="social" />
              <Progress className="social">
                <Dealt className="social" dealt={item.socializationDegree} />
              </Progress>
              <p className="social">{item.socializationDegree}%</p>
            </EvalContainer>
          </BarContainer>
        </div>
        <div>
          {showDiv && showButton}
        </div>
      </ItemContainer>
    </>
  );
}

export default DoneListItem;
