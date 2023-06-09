import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';

function UserDiaryModify({ onSubmit, diaryInfo, onToggle }) {
  const [modifyDiaryInfo, setModifyDiaryInfo] = useState({
    createdAt: diaryInfo.createdAt,
    categoryId: diaryInfo.categoryId,
    title: diaryInfo.title,
    contentBody: diaryInfo.contentBody,
    dogImgToday: diaryInfo.dogImgToday,
    dogId: diaryInfo.dogId,
  });
  const [categories, setCategories] = useState([]);
  const [dogs, setDogs] = useState([]);

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
      });
  }, []);

  const handleImageUpload = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('file', img);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios.post('https://withpet.site/api/v1/file/upload', formData, config)
      .then((res) => {
        setModifyDiaryInfo({
          ...modifyDiaryInfo,
          dogImgToday: res.data.result[0],
        });
      });
  };
  const onChange = (e) => {
    if (e.target.files) {
      handleImageUpload(e);
    } else {
      const { value, name } = e.target;
      setModifyDiaryInfo({
        ...modifyDiaryInfo,
        [name]: value,
      });
    }
  };
  const onLocalSubmit = (e) => {
    e.preventDefault();
    onToggle('detail');
    setModifyDiaryInfo({
      ...modifyDiaryInfo,
    });
    const updatedSubmitInfo = {
      categoryId: Number(modifyDiaryInfo.categoryId),
      contentBody: modifyDiaryInfo.contentBody,
      createdAt: modifyDiaryInfo.createdAt,
      dogId: Number(modifyDiaryInfo.dogId),
      title: modifyDiaryInfo.title,
      dogImgToday: modifyDiaryInfo.dogImgToday,
    };
    onSubmit(diaryInfo.userDiaryId, updatedSubmitInfo);
  };
  const onChangeCalendar = (date) => {
    const e = {
      target: {
        name: 'createdAt',
        value: dayjs(date).format('YYYY-MM-DD'),
      },
    };
    onChange(e);
  };
  const modify = (
    <form onSubmit={onLocalSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{ m: 1 }} label="날짜" value={dayjs(modifyDiaryInfo.createdAt)} onChange={onChangeCalendar} name="createdAt" format="YYYY/MM/DD" slotProps={{ textField: { size: 'small', length: 'small' } }} />
              </LocalizationProvider>
            </div>
            <div>
              <TextField sx={{ m: 1 }} select label="반려견 선택" variant="outlined" name="dogId" style={{ width: '132px' }} onChange={onChange} value={modifyDiaryInfo.dogId} size="small" required>
                { dogs.map((item) => <MenuItem key={item.dogId} value={item.dogId}>{item.name}</MenuItem>)}
              </TextField>
              <TextField sx={{ m: 1 }} select label="카테고리 선택" variant="outlined" name="categoryId" style={{ width: '132px' }} onChange={onChange} value={modifyDiaryInfo.categoryId} size="small" required>
                { categories.map((item) => <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>)}
              </TextField>
            </div>

            <div>
              <TextField sx={{ m: 1 }} label="제목" value={modifyDiaryInfo.title} style={{ width: '282px' }} variant="outlined" size="small" name="title" onChange={onChange} />
            </div>
          </div>
          <div style={{ marginLeft: '50px' }}>
            <div className="today-img-regist" style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="image-select">
                <img style={{ width: '150px', height: '150px', border: '1px solid gray' }} alt="이미지 미리보기" src={modifyDiaryInfo.dogImgToday} />
              </label>
              <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={onChange} />
            </div>
          </div>
        </div>
        <div>
          <div>
            <TextField sx={{ m: 1 }} label="내용" value={modifyDiaryInfo.contentBody} multiline rows={6} style={{ width: '500px' }} variant="outlined" size="small" name="contentBody" onChange={onChange} />
          </div>
        </div>
        <input className="diary-add-btn" type="submit" value="저장" style={{ width: '510px' }} />
      </div>
    </form>
  );
  return <>{modify}</>;
}
export default UserDiaryModify;
