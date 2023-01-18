import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { acceptInvite } from "../services/AuthService";
import Typography from "@material-ui/core/Typography";
import qs from "qs";
import useStyles from "../styles/styles";

const AcceptInvite = () => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invitationToken = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    }).invitation_token;
    const data = await acceptInvite({
      password,
      password_confirmation: passwordConfirmation,
      invitation_token: invitationToken,
    });

    if (data.status === 200) {
      setError("Invite accepted please signup");
    } else {
      setError(data.errors);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Accept Invite
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AcceptInvite;
