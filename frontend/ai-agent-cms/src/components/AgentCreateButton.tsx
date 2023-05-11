import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import AgentForm from './AgentForm';

type Props = {
  buttonText: string;
  dialogTitle: string;
};

const DialogButton: React.FC<Props> = ({ buttonText, dialogTitle }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClick}>
        {buttonText}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <AgentForm onClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogButton;
