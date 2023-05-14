import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

function Modify({ item, onSubmit, onToggle }) {
  const [data, setData] = useState(item);
  const onModifyLocal = () => {
    onToggle(false);
    onSubmit(item.id, data);
  };

  const onChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setData({
          ...data,
          img: reader.result,
        });
      };
    } else {
      const { name, value } = e.target;
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>{item.id}</TableCell>
        <TableCell>
          <img id="preview-image" alt="이미지 미리보기" src={data.img} />
          <label htmlFor="image-select">프로필 이미지 선택</label>
          <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={onChange} />
        </TableCell>
        <TableCell>
          <TextField sx={{ m: 1 }} label="이름" variant="outlined" name="name" onChange={onChange} value={data.name} required />
        </TableCell>
        <TableCell>
          <TextField sx={{ m: 1 }} label="설명" variant="outlined" name="intro" onChange={onChange} value={data.intro} required />
        </TableCell>
        <TableCell>
          <button onClick={onModifyLocal}>수정</button>
          <button onClick={() => onToggle((prev) => !prev)}>취소</button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Modify;
