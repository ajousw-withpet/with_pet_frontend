import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import dogimgdefault from '../../assets/dogProfileImage.png';

import './Diaries.css';

function UserDiaryListAdd({
  open, setOpen, setFilteredDiaries,
}) {
  // const [diaries, setDiaries] = useState([]);
  const dateNow = new Date();
  const today = dateNow.toISOString().substr(0, 10);
  // const colorList = ['red', 'yellow', 'green', 'blue', 'orange', 'violet', 'gray'];
  const colorList = ['#64C8F3', '#F36464', '#57DF86', '#DFDA57', '#CAA969', 'violet', 'gray'];

  const [diaryInfo, setDiaryInfo] = useState({
    categoryId: '',
    contentBody: '',
    createdAt: dayjs(today),
    dogId: '',
    dogImgToday: '',
    title: '',
  });
  const [categories, setCategories] = useState([]);
  const [dogs, setDogs] = useState([]);

  const onChangetemp = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDiaryInfo({
          ...diaryInfo,
          dogImgToday: reader.result,
        });
      };
    } else {
      const { value, name } = e.target;
      setDiaryInfo({
        ...diaryInfo,
        [name]: value,
      });
      // console.log(name, value);
    }
  };
  // console.log(dayjs(new Date()).format('YYYY-MM'));

  const onSubmitAdd = (e) => {
    e.preventDefault();
    // console.log(diaryInfo);
    axios.post('https://withpet.site/api/v1/userdiaries', diaryInfo, { withCredentials: true })
      .then(() => {
        // // setFilteredDiaries(filteredDiaries.concat(res.data.result)); // 바로 반영되도록
        // // console.log(res.data.result);
        // console.log(res.data.result);
        // const { result } = res.data;
        // // 이제 달력 보여줄거 업데이트 하자
        // console.log(dogs);
        // const temp = {
        //   start: dayjs(new Date(result.createdAt)).format('YYYY-MM-DD'),
        //   end: dayjs(new Date(result.createdAt)).format('YYYY-MM-DD'),
        //   color: colorList[(result.dogId % colorList.length) - 1],
        //   title: result.dogName,
        // };
        // setFilteredDiaries(filteredDiaries.concat(temp));
        // console.log(temp);
      })
      .catch(() => {
        // console.error(err);
      });

    axios.get(`https://withpet.site/api/v1/userdiaries/month?categoryId=&dogId=&month=${dayjs(new Date()).format('YYYY-MM')}&petsitterCheck=`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
        const { result } = res.data;
        // 이제 달력 보여줄거 업데이트 하자
        // console.log(dogs);
        const temp = result.map((item) => ({
          start: dayjs(new Date(item.createdAt)).format('YYYY-MM-DD'),
          end: dayjs(new Date(item.createdAt)).format('YYYY-MM-DD'),
          color: colorList[(item.dogId % colorList.length) - 1],
          title: item.dogName,
        }));
        setFilteredDiaries(temp);
        // console.log(temp);
      })
      .catch(() => {
      });
    setDiaryInfo({
      categoryId: '',
      contentBody: '',
      createdAt: '',
      dogId: '',
      dogImgToday: '',
      title: '',
    });
    setOpen(false);
  };

  const onChangeCalendar = (date) => {
    // console.log(date);
    // console.log(dayjs(date).format('YYYY-MM-DD'));
    const e = {
      target: {
        name: 'createdAt',
        value: dayjs(date).format('YYYY-MM-DD'),
      },
    };
    onChangetemp(e);
  };

  useEffect(() => {
    axios
      .get('https://withpet.site/api/v1/calendar', {
        withCredentials: true,
      })
      .then((res) => {
        setDogs(res.data.result.dogSimpleInfoResponses);
        setCategories(res.data.result.categoryResponses);
      })
      .catch(() => {
        // console.log(err);
      });
  }, []);

  const addDiary = (
    <form onSubmit={onSubmitAdd}>
      <div className="select-diary-type">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker sx={{ m: 1 }} label="날짜" onChange={onChangeCalendar} name="createdAt" format="YYYY/MM/DD" />
        </LocalizationProvider>
      </div>
      <div>
        <TextField sx={{ m: 1 }} select label="카테고리 선택" variant="outlined" name="categoryId" style={{ width: '200px' }} onChange={onChangetemp} value={diaryInfo.categoryId} size="small" required>
          { categories.map((item) => <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>)}
        </TextField>
        <TextField sx={{ m: 1 }} select label="반려견 선택" variant="outlined" name="dogId" style={{ width: '200px' }} onChange={onChangetemp} value={diaryInfo.dogId} size="small" required>
          { dogs.map((item) => <MenuItem key={item.dogId} value={item.dogId}>{item.name}</MenuItem>)}
        </TextField>
      </div>

      <div className="today-img-regist">
        <img style={{ width: '400px', height: '400px' }} alt="이미지 미리보기" src={!diaryInfo.dogImgToday ? dogimgdefault : diaryInfo.dogImgToday} />
        <label htmlFor="image-select">오늘의 사진 선택</label>
        <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={onChangetemp} />
      </div>
      <div>
        <TextField sx={{ m: 1 }} label="제목" style={{ width: '500px' }} variant="outlined" size="small" name="title" onChange={onChangetemp} />
      </div>
      <div>
        <TextField sx={{ m: 1 }} label="내용" multiline style={{ width: '500px' }} variant="outlined" size="small" name="contentBody" onChange={onChangetemp} />
      </div>
      <input className="diary-add-btn" type="submit" value="submit" style={{ width: '500px' }} />
    </form>
  );

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)} style={{ margin: '40px' }}>
        <Box
          sx={{
            width: 800,
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'top',
            alignItems: 'center',
            bgcolor: 'background.paper',
            boxShadow: 24,
            margin: 'auto',
            overflow: 'scroll',
            p: 2,
          }}
        >
          <div className="diary_container">
            {addDiary}
          </div>
          <Button type="button" onClick={() => setOpen(false)}>
            닫기
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default UserDiaryListAdd;