import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import styled from 'styled-components';
import CurrentListItem from './CurrentListItem';
import { ListContainer, Title, Items } from '../../styles/sidebar/SidebarStyle';

// const Title = styled.p`
//   display: flex;
// `;

// const Item = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const ListContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
//   width: 100%;
//   border-radius: 5px;
//   box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
// `;

function CurrentList() {
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    axios.get('https://4a595605-a86b-482c-96a1-0196009f4a0e.mock.pstmn.io/api/v1/reservation/1')
      .then((res) => {
        setCurrentList(res.data);
        console.log(res.data);
      })
      .catch(() => {
      });
  }, []);

  return (
    <ListContainer>
      <Title>현재 이용자 목록</Title>
      <Items>
        {currentList.map((currentItem) => {
          return <CurrentListItem key={currentItem.id} item={currentItem} />;
        })}
      </Items>
    </ListContainer>
  );
}

export default CurrentList;
