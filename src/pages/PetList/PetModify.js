import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

function PetModify({
  onSubmit, petInfo, onToggle, partyId,
}) {
  const [modifyPetInfo, setModifyPetInfo] = useState({
    dog_name: petInfo.dog_name,
    dog_breed: petInfo.dog_breed,
    dog_birth: petInfo.dog_birth,
    dog_gender: petInfo.dog_gender,
    neutralization: petInfo.neutralization ? 'true' : 'false',
    dog_weight: petInfo.dog_weight,
    dog_img: petInfo.dog_img,
    dog_isbn: petInfo.dog_isbn,
  });

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
        setModifyPetInfo({
          ...modifyPetInfo,
          dog_img: res.data.result[0],
        });
      });
  };

  const onChange = (e) => {
    if (e.target.files) {
      handleImageUpload(e);
    } else {
      const { value, name } = e.target;
      setModifyPetInfo({
        ...modifyPetInfo,
        [name]: value,
      });
    }
  };

  const onLocalSubmit = (e) => {
    e.preventDefault();
    onToggle('detail');
    setModifyPetInfo({
      ...modifyPetInfo,
      neutralization: modifyPetInfo.neutralization === 'true',
    });
    onSubmit(partyId, petInfo.dog_id, modifyPetInfo);
  };

  const onChangeCalendar = (date) => {
    const e = {
      target: {
        name: 'dog_birth',
        value: dayjs(date).format('YYYY-MM-DD'),
      },
    };
    onChange(e);
  };

  const modify = (
    <form onSubmit={onLocalSubmit}>
      <div className="pet-img-regist">
        <img
          id="preview-image"
          alt="이미지 미리보기"
          src={modifyPetInfo.dog_img}
        />
        <label htmlFor="image-select">프로필 이미지 선택</label>
        <input
          type="file"
          accept="image/*"
          id="image-select"
          style={{ display: 'none' }}
          onChange={onChange}
        />
      </div>
      <div className="pet-info-regist">
        <TextField
          sx={{ m: 1 }}
          label="이름"
          variant="outlined"
          size="small"
          name="dog_name"
          onChange={onChange}
          value={modifyPetInfo.dog_name}
          required
        />

        <TextField
          sx={{ m: 1 }}
          select
          label="견종"
          variant="outlined"
          name="dog_breed"
          onChange={onChange}
          value={modifyPetInfo.dog_breed}
          size="small"
          required
        >
          <MenuItem value="진돗개">진돗개</MenuItem>
          <MenuItem value="삽살개">삽살개</MenuItem>
          <MenuItem value="리트리버">리트리버</MenuItem>
          <MenuItem value="요크셔테리어">요크셔테리어</MenuItem>
          <MenuItem value="말티즈">말티즈</MenuItem>
          <MenuItem value="푸들">푸들</MenuItem>
          <MenuItem value="시바견">시바견</MenuItem>
          <MenuItem value="불독">불독</MenuItem>
          <MenuItem value="비글">비글</MenuItem>
          <MenuItem value="포메라니안">포메라니안</MenuItem>
          <MenuItem value="치와와">치와와</MenuItem>
          <MenuItem value="보더콜리">보더콜리</MenuItem>
        </TextField>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ m: 1 }}
            label="생일"
            value={dayjs(modifyPetInfo.dog_birth)}
            onChange={onChangeCalendar}
            name="dog_birth"
            format="YYYY/MM/DD"
          />
        </LocalizationProvider>

        <div className="select">
          <p>성별 선택</p>
          <input
            type="radio"
            name="dog_gender"
            id="male"
            value="male"
            onChange={onChange}
            checked={modifyPetInfo.dog_gender === 'male'}
          />
          <label htmlFor="male">남자</label>
          <input
            type="radio"
            name="dog_gender"
            id="female"
            value="female"
            onChange={onChange}
            checked={modifyPetInfo.dog_gender === 'female'}
          />
          <label htmlFor="female">여자</label>
        </div>

        <div className="select">
          <p>중성화 여부 선택</p>
          <input
            type="radio"
            name="neutralization"
            id="O"
            value="true"
            onChange={onChange}
            checked={modifyPetInfo.neutralization === 'true'}
          />
          <label htmlFor="O">O</label>
          <input
            type="radio"
            name="neutralization"
            id="X"
            value="false"
            onChange={onChange}
            checked={modifyPetInfo.neutralization === 'false'}
          />
          <label htmlFor="X">X</label>
        </div>
        <TextField
          sx={{ m: 1 }}
          label="무게"
          type="number"
          variant="outlined"
          size="small"
          name="dog_weight"
          onChange={onChange}
          value={modifyPetInfo.dog_weight}
          required
        />

        <TextField
          sx={{ m: 1 }}
          label="등록코드"
          type="number"
          variant="outlined"
          size="small"
          name="dog_isbn"
          onChange={onChange}
          value={modifyPetInfo.dog_isbn}
          required
        />
        <input className="pet-add-btn" type="submit" value="수정" />
        <input
          className="pet-add-btn pet-add-cancel-btn"
          type="button"
          value="취소"
          onClick={() => onToggle('detail')}
        />
      </div>
    </form>
  );
  return <>{modify}</>;
}

export default PetModify;
