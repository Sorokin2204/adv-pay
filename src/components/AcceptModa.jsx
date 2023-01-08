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
import { useSelector } from 'react-redux';
import { currencyFormat } from '../utils/currencyFormat';
import TransitionDialog from './TransitionDialog';

export default function AcceptModal(props) {
  const { onClose, text, open, onNext, selectedPackage, typeGameId } = props;
  const {
    getPackageState: { data: packageList },
  } = useSelector((state) => state.package);
  const handleClose = () => {
    onClose();
  };
  const [activePackage, setActivePackage] = React.useState(null);
  React.useEffect(() => {
    if (packageList) {
      const defaultPackage = packageList?.find((item, index) => item?.code === selectedPackage && item?.typeGameId == typeGameId);
      setActivePackage(defaultPackage);
    }
  }, [selectedPackage, packageList]);

  const handleNext = () => {
    onClose();
    onNext();
  };

  return (
    <Dialog
      TransitionComponent={TransitionDialog}
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: '400px', // Set your width here
        },
      }}>
      <DialogContent sx={{ height: { xs: '100px', sm: '170px' } }}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '100%', transform: 'translateY(20px)' }}>
          <Typography variant="h5" sx={{ fontWeight: '600', fontSize: { mob: '24px', textAlign: 'center' } }}>
            {text}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
            <div class="game-card__middle" style={{ marginBottom: '5px', fontSize: '14px' }}>
              <img
                src={`/game-icon-${activePackage?.typeGameId}.png`}
                style={{
                  objectFit: 'contain',
                  display: 'block',
                  width: '22px',
                  height: '22px',
                }}
              />
              {activePackage?.name}
            </div>
            <Box sx={{ fontWeight: '600 !important', fontSize: '18px', marginLeft: '12px' }}>{currencyFormat(activePackage?.price)}</Box>
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ mt: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '8px', padding: '16px' }}>
        <Button color="error" onClick={handleClose} autoFocus variant="contained" style={{ textTransform: 'none' }}>
          Нет
        </Button>
        <Button color="success" onClick={handleNext} autoFocus variant="contained" sx={{ margin: '0 !important', textTransform: 'none' }}>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
}
