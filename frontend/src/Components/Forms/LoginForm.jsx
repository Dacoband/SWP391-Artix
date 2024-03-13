import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './FormCSS/LoginForm.css'
import LoginWithGoogle from '../../Login/Google/LoginWithGoogle';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
export default function LoginForm({ disableOutsideClick,handleClick, backdrop, alternative }) {
  const onClick = (event) => {
    // Check if the target of the click is the element that the event was bound to
    if (event.target === event.currentTarget && disableOutsideClick!==true) {
      // If true, then the click was on the backdrop, not on a child.
      // Execute the desired action for an outside click here.
      handleClick()
    }
  };
  function LoginAsGuest() {
    return (
    <>
      <Grid item xs={12}>
        <Divider sx={{ "&::before, &::after": { backgroundColor: "lightgray" } }} variant='middle'>
          <Typography variant='h6'>Alternative</Typography>
        </Divider>
        <Link className='guestBtn' style={{ fontStyle: "italic", color: "grey" }} to={`/characters`}>Continue As Guest</Link>
      </Grid>
    </>
    )
  }
  return (
    // backdrop name as defined "backdrop" to generate the black background cover the screen
    <div onClick={onClick} className={backdrop}>
      <div onClick={onClick} className='card'>
        <div className='loginForm'>
          <Grid container spacing={2} component="form" noValidate>
            <Grid item xs={12}>
              <Typography variant="h5" component="h1" gutterBottom>
                Please Login To Continue
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link to={`/createaccount`}>
              <Button variant="outlined" fullWidth>
                Register Account
              </Button></Link>
            </Grid>
            <Grid item xs={12}>
              <LoginWithGoogle disableOutsideClick={disableOutsideClick} handleClick={handleClick} />
            </Grid>
            {alternative ? <LoginAsGuest/>:""}

          </Grid>

        </div>
      </div>
    </div>
  );
}