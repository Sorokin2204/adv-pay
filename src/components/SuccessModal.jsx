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
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Box, DialogActions, DialogContent, DialogContentText, Input, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TransitionDialog from './TransitionDialog';

export default function SuccessModal(props) {
  const { onClose, selectedValue, open, fullWidth, text = 'Донат успешно отправлен в игру' } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      TransitionComponent={TransitionDialog}
      fullWidth={fullWidth}
      maxWidth="sm"
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: '600px',
        },
      }}>
      <DialogContent sx={{ height: { xs: '100px', sm: '170px' } }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', transform: 'translateY(20px)' }}>
          <Typography variant="h5" sx={{ fontWeight: '600', fontSize: { xs: '16px', mob: '24px' } }}>
            {text}
          </Typography>
          <CheckIcon sx={{ ml: '8px', mb: '4px', fontSize: { xs: '30px', sm: '40px' }, color: 'success.main' }} />
        </div>
      </DialogContent>
      <DialogActions sx={{ mt: '16px' }}>
        <Button onClick={handleClose} autoFocus variant="text">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}
