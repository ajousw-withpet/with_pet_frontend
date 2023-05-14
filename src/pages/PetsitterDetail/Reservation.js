import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Options from './Options';
import CheckCalendar from './CheckCalendar';
import AvailableCalendar from './AvailableCalendar';

const Container = styled.div`
  background-color: orange;
  width: 375px;
`;

function Reservation({ data, sizeFee }) {
  const [info, setInfo] = useState({
    startDate: '',
    endDate: '',
    checkinTime: '',
    checkoutTime: '',
    dogId: '',
    options: {},
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };
  // console.log(data.dogs);
  return (
    <>
      <Container>
        <div> { /* 예약 정보 입력 */ }
          <CheckCalendar blockdays={data.unavailable} />
          <form>
            <div>
              <h2>체크인 / 체크아웃 시간</h2>
              <TextField sx={{ m: 1 }} select label="체크인 시간" variant="outlined" name="checkinTime" style={{ width: '138px', height: '40px' }} onChange={onChange} value={info.checkinTime} required>
                <MenuItem value="0">오전 12:00</MenuItem>
                <MenuItem value="1">오전 01:00</MenuItem>
                <MenuItem value="2">오전 02:00</MenuItem>
                <MenuItem value="3">오전 03:00</MenuItem>
                <MenuItem value="4">오전 04:00</MenuItem>
                <MenuItem value="5">오전 05:00</MenuItem>
                <MenuItem value="6">오전 06:00</MenuItem>
                <MenuItem value="7">오전 07:00</MenuItem>
                <MenuItem value="8">오전 08:00</MenuItem>
                <MenuItem value="9">오전 09:00</MenuItem>
                <MenuItem value="10">오전 10:00</MenuItem>
                <MenuItem value="11">오전 11:00</MenuItem>

                <MenuItem value="12">오후 12:00</MenuItem>
                <MenuItem value="13">오후 01:00</MenuItem>
                <MenuItem value="14">오후 02:00</MenuItem>
                <MenuItem value="15">오후 03:00</MenuItem>
                <MenuItem value="16">오후 04:00</MenuItem>
                <MenuItem value="17">오후 05:00</MenuItem>
                <MenuItem value="18">오후 06:00</MenuItem>
                <MenuItem value="19">오후 07:00</MenuItem>
                <MenuItem value="20">오후 08:00</MenuItem>
                <MenuItem value="21">오후 09:00</MenuItem>
                <MenuItem value="22">오후 10:00</MenuItem>
                <MenuItem value="23">오후 11:00</MenuItem>
              </TextField>
              <TextField sx={{ m: 1 }} select label="체크아웃 시간" variant="outlined" name="checkoutTime" style={{ width: '138px', height: '40px' }} onChange={onChange} value={info.checkoutTime} required>
                <MenuItem value="0">오전 12:00</MenuItem>
                <MenuItem value="1">오전 01:00</MenuItem>
                <MenuItem value="2">오전 02:00</MenuItem>
                <MenuItem value="3">오전 03:00</MenuItem>
                <MenuItem value="4">오전 04:00</MenuItem>
                <MenuItem value="5">오전 05:00</MenuItem>
                <MenuItem value="6">오전 06:00</MenuItem>
                <MenuItem value="7">오전 07:00</MenuItem>
                <MenuItem value="8">오전 08:00</MenuItem>
                <MenuItem value="9">오전 09:00</MenuItem>
                <MenuItem value="10">오전 10:00</MenuItem>
                <MenuItem value="11">오전 11:00</MenuItem>

                <MenuItem value="12">오후 12:00</MenuItem>
                <MenuItem value="13">오후 01:00</MenuItem>
                <MenuItem value="14">오후 02:00</MenuItem>
                <MenuItem value="15">오후 03:00</MenuItem>
                <MenuItem value="16">오후 04:00</MenuItem>
                <MenuItem value="17">오후 05:00</MenuItem>
                <MenuItem value="18">오후 06:00</MenuItem>
                <MenuItem value="19">오후 07:00</MenuItem>
                <MenuItem value="20">오후 08:00</MenuItem>
                <MenuItem value="21">오후 09:00</MenuItem>
                <MenuItem value="22">오후 10:00</MenuItem>
                <MenuItem value="23">오후 11:00</MenuItem>
              </TextField>
              <h2>반려동물 선택</h2>
              <TextField sx={{ m: 1 }} select label="반려견 선택" variant="outlined" name="dogId" onChange={onChange} value={info.dogId} required SelectProps={{ multiple: true, value: [] }} style={{ width: '285px' }}>
                {data.dogs && data.dogs.map((dog) => { return <MenuItem key={dog.id} value={dog.id}>{dog.name}</MenuItem>; })}
              </TextField>
              <Options />
            </div>
            <input type="submit" value="예약 하기" />
          </form>
        </div>
        <div>
          <p>이용 요금(데이케어)</p>
          { sizeFee && sizeFee.map((item) => (
            <div key={item.petSitterServiceId}>
              <img src={item.img} alt={item.img} />
              <p>{item.name} / {item.content} / {item.price}원</p>
            </div>
          ))}
        </div>
        <AvailableCalendar />
      </Container>
    </>
  );
}

export default Reservation;
