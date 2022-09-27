import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import styles from '../styles/ItemGame.scss';
import { Box } from '@mui/material';
const ItemGame = ({ img, name, link }) => {
  const navigate = useNavigate();
  const [color, setColor] = useState();
  // const [boxShadow, setBoxShadow] = useState();
  return (
    <Box
      onClick={() => {
        if (link) {
          navigate(`/game/${link}`);
        }
      }}
      class="item-game"
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
        padding: '12px',
        '&:hover .item-game__img-box': { borderColor: color },
        '&:hover img': {
          transform: 'scale(1.1)',
        },
      }}
      onMouseEnter={() => {
        const colorRand = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setColor(colorRand);
        // setBoxShadow('0px 0px 8px 0px ' + colorRand);
      }}>
      <Box className="item-game__img-box" sx={{ width: '163px', height: '163px', border: '1px solid #28aadc', borderRadius: '4px', transition: 'all 0.3s', overflow: 'hidden' }}>
        <img src={img} class="item-game__img" style={{ transition: 'all 0.3s' }} />
      </Box>
      <div onMouse className="item-game__name">
        {name}
      </div>
    </Box>
  );
};

export default ItemGame;
