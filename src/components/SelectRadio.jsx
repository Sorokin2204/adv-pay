import { KeyboardArrowDown } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
const SelectRadio = ({ children, active, list, selectedItem }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {active ? (
        <Box sx={{ position: 'relative', width: '200px' }}>
          <OutsideClickHandler
            onOutsideClick={() => {
              setShow(false);
            }}>
            <Box
              onClick={() => {
                setShow(!show);
              }}
              sx={{ height: '40px', width: '200px', border: '1px solid #e2ba7e', borderRadius: '2px', padding: '10px', position: 'relative', boxSizing: 'border-box', display: 'flex', justifyContent: 'start', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              {list?.find((item) => item.serverId == selectedItem)?.name} <KeyboardArrowDown sx={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', color: '#e2ba7e', transition: 'all 0.3s', ...(show && { transform: 'rotate(180deg) translateY(10px)' }) }} />
            </Box>
          </OutsideClickHandler>
          <Box
            sx={{
              maxHeight: '240px',
              overflow: 'auto',
              '::-webkit-scrollbar': {
                width: '0px',
              },
              position: 'absolute',
              top: 'calc(100% + 1px)',
              left: '-1px',
              transition: 'all 0.3s',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.7)',
              border: '1px solid #e2ba7e',
              borderTop: '0',
              zIndex: '100',
              '& .custom-radio label span': { color: '#fff', borderLeftColor: 'transparent !important', borderRightColor: 'transparent !important', borderRadius: '0', borderColor: 'transparent !important', width: '100%', justifyContent: 'start', textAlign: 'left' },
              '& .custom-radio label span::before': { display: 'none' },
              '& .custom-radio label': { margin: 0, width: '100%', padding: 0 },
              '& .custom-radio label span:hover': { color: '#e2ba7e', borderColor: '#e2ba7e !important', borderLeftColor: 'transparent !important', borderRightColor: 'transparent !important' },
              '& .custom-radio label:first-child span': { borderTopColor: 'transparent !important' },
              '& .custom-radio label:last-child span': { borderBottomColor: 'transparent !important' },

              ...(!show && { opacity: 0, visibility: 'hidden' }),
            }}>
            {children}
          </Box>
        </Box>
      ) : (
        children
      )}
    </>
  );
};

export default SelectRadio;
