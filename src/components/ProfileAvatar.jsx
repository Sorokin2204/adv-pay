import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Box } from '@mui/material';
import { Downloading, Photo, PhotoCamera } from '@mui/icons-material';
import { getUser, uploadAvatar } from '../redux/slices/user.slice';
const ProfileAvatar = () => {
  const {
    getUserState: { loading, data, error },
    uploadAvatarState: { data: dataUpload, loading: loadingUpload },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const hiddenFileInput = React.useRef(null);
  const onClickUpload = () => {
    hiddenFileInput.current.click();
  };
  const onImageChange = (e) => {
    const [file] = e.target.files;
    const formData = new FormData();
    formData.append('image', file);
    dispatch(uploadAvatar(formData));
  };
  useEffect(() => {
    if (dataUpload) {
      //   dispatch(getUser());
    }
  }, [dataUpload]);

  return (
    <>
      <Box onClick={onClickUpload} sx={{ position: 'relative', width: '100px', height: '100px', borderRadius: '50%', border: `2px solid  ${(data?.avatar || dataUpload) && !loadingUpload ? 'transparent' : 'rgba(255, 255, 255,0.3)'}`, marginBottom: '20px' }}>
        {loadingUpload ? (
          <Downloading sx={{ fontSize: '40px', color: '#666', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', position: 'absolute' }} />
        ) : (data?.avatar || dataUpload) && !loadingUpload ? (
          <img style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} src={`${process.env.REACT_APP_SERVER_DOMAIN}/images/${dataUpload ? dataUpload : data?.avatar}`} />
        ) : (
          <PhotoCamera sx={{ fontSize: '40px', color: '#666', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', position: 'absolute' }} />
        )}
      </Box>
      <input type="file" onChange={onImageChange} style={{ display: 'none' }} ref={hiddenFileInput} />
    </>
  );
};

export default ProfileAvatar;
