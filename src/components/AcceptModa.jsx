import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Box, DialogActions, DialogContent, DialogContentText, Input, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function AcceptModal(props) {
  const { onClose, text, open, onNext } = props;

  const handleClose = () => {
    onClose();
  };
  const handleNext = () => {
    onClose();
    onNext();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: '400px', // Set your width here
        },
      }}>
      <DialogContent sx={{ height: { xs: '100px', sm: '170px' } }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', transform: 'translateY(20px)' }}>
          <Typography variant="h5" sx={{ fontWeight: '600', fontSize: { mob: '24px', textAlign: 'center' } }}>
            {text}
          </Typography>
        </div>
      </DialogContent>
      <DialogActions sx={{ mt: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '8px', padding: '16px' }}>
        <Button color="error" onClick={handleClose} autoFocus variant="contained">
          Нет
        </Button>
        <Button color="success" onClick={handleNext} autoFocus variant="contained" sx={{ margin: '0 !important' }}>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
}
