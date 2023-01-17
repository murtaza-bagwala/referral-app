import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { registerUser } from '../services/AuthService';
import Typography from '@material-ui/core/Typography';
import useStyles from "../styles/styles"


export default function Signup({ setToken }) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      let { token, data } = await registerUser({
          email,
          password,
          password_confirmation: passwordConfirmation,
          name,
          phone_no: phoneNumber,
        });

        if (token) {
          sessionStorage.setItem("currentUserName", data.data.name)
          setToken(token);
        } else {
          setError(data.error);
        }
    };

    return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
        <Typography component="h1" variant="h5">
          {error}
        </Typography>  
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="name"
                label="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Password Confirmation"
              type="password"
              id="confirm-password"
              autoComplete="confirm-password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone-no"
              label="Phone Number"
              name="phone-no"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>)
}