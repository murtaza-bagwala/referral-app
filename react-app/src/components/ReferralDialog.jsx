import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { inviteUser } from '../services/AuthService';

export default function ReferralDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage("")
  };

  const handleSubmit = async () => {
    setMessage("")
    const token = sessionStorage.getItem('token');
    let response = await inviteUser(email, token);
    if (response.status === "ok") {
        setMessage("Invite Sent")
    } else {
        setMessage(response.errors)
    }
  }

  return (
    <div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        >
        Invite User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Typography component="h1" variant="h5">
          {message}
        </Typography>  
        <DialogTitle>Invite</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Invite</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}