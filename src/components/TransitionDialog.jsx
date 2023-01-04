import React from 'react';
import { Slide } from '@mui/material';

const TransitionDialog = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />;
});
export default TransitionDialog;
