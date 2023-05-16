import React from 'react';
// import styled from 'styled-components';
import { Container, Content, ProfitButton } from '../../styles/SidebarStyle/SidebarStyle';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: yellow;
//   width: 100%;
// `;

// const Content = styled.p`
//   width: 256px;
//   height: 50px;
//   text-align: center;
//   line-height: 50px;
//   background-color: #FAFAFA;
//   color: #999999;
// `;

// const Button = styled.button`
//   width: 256px;
//   height: 50px;
//   background-color: #CAA969;
//   border: none;
//   border-radius: 10px;
//   color: white;
// `;

function Profit() {
  return (
    <Container>
      <Content>총 매출: 100.000</Content>
      <ProfitButton>수익관리</ProfitButton>
    </Container>
  );
}

export default Profit;
