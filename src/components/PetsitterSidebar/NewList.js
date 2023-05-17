import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NewListItem from './CurrentListItem';
import { Title, Items } from '../../styles/sidebar/SidebarStyle';
// const Title = styled.p`
//   display: flex;
// `;

// const Item = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
`;

function NewList() {
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
    <Container className="list">
      <Title>신규 요청 목록</Title>
      <Items>
        {currentList.map((currentItem) => {
          return <NewListItem key={currentItem.id} item={currentItem} />;
        })}
      </Items>
    </Container>
  );
}

export default NewList;
