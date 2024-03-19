import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './FormCSS/LoginForm.css'
import LoginWithGoogle from '../../Login/Google/LoginWithGoogle';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { CheckLogin } from '../../Login/Norm/NormalLogin.tsx'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useAuth } from '../../Components/AuthenContext.tsx';
import {useNavigate} from 'react-router-dom'

export default function LoginForm({ disableOutsideClick, handleClick, backdrop, alternative }) {

  const { storeUserData } = useAuth();
  const navigate = useNavigate()
  const formik = useFormik(
    {
      validateOnBlur: true,
      validateOnChange: false,
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().email('Are you sure this is a REAL email address?').required("Hey! Where's the email, pal?"),
        password: Yup.string().required("What's the password?"),
      }),
      onSubmit: async (values) => {
        try{
        await CheckLogin(values,storeUserData)
        const sessionRole = sessionStorage.getItem('userRole');
        // await to ensure the CheckLogin finish its task before running the navigate action
        if(sessionRole ===  "AD"){
          navigate('/admin');
        }
        else{
        navigate('/characters');
        }
        window.dispatchEvent(new Event('userLoggedIn'));
        handleClick()
      }
      catch(err){
        console.log(err);
      }
    },
    })

  const onClick = (event) => {
    // Check if the target of the click is the element that the event was bound to
    if (event.target === event.currentTarget && disableOutsideClick !== true) {
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
          <Grid container spacing={2} component="form" onSubmit={formik.handleSubmit}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h1" gutterBottom>
                Please Login To Continue
              </Typography>
            </Grid>
              <Grid item xs={12}>
                <TextField
                  className='emailField'
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='passwordField'
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant="contained" fullWidth>
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
            {alternative ? <LoginAsGuest /> : ""}
          </Grid>

        </div>
      </div>
    </div>
  );
}