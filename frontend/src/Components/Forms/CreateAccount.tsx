import React, { useContext } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './FormCSS/CreateAccount.css'
import LoginWithGoogle from '../../Login/Google/LoginWithGoogle.jsx';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios"
import Background from '../Themes/Background.jsx';
import { ThemeContext } from '../Themes/ThemeProvider.tsx';


function LoginAsGuest() {
  return (
    <>
      <Grid item xs={12} sx={{ textAlign: 'center', paddingBottom: '5%' }}>
        <Divider sx={{ "&::before, &::after": { backgroundColor: "lightgray" } }} variant='middle'>
          <Typography variant='h6'>Alternative</Typography>
        </Divider>
        <Link className='guestBtn' style={{ fontStyle: "italic", color: "grey" }} to={`/`}>Already Have An Account? Login Here!</Link>
      </Grid>
    </>
  )
}

export default function CreateAccount() {
  const {theme} = useContext(ThemeContext)

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      lastName: "",
      fistName: "",
      userName: "",
      phone: "",
      address: "",
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      
    },

    validationSchema: Yup.object({
      userName: Yup.string().required("Must be 6 characters or more.").min(6, "Must be 6 characters or more"),
      email: Yup.string().required("We need something to authorize you").min(10, "Must be 10 characters or more"),
      password: Yup.string().required("Password! Or we gonna steal your account.").min(5, "Must be 5 characters or more"),
    }),



  })
  return (
    <Background>
      <div className='createaccount'>
        <div className='signupForm' style={{marginTop:'2%'}}>
          <Box
            height={'auto'}
            width={'80%'}
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{backgroundColor:theme.backgroundColor, margin:'auto'}}
          >
            <form onSubmit={formik.handleSubmit}>
              <Grid className='formregister' container spacing={2} component="form" noValidate>
                <Grid item xs={12}>
                  <div className='header'>
                    <Typography variant="h5" component="h1" gutterBottom>
                      Register Account
                    </Typography></div>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="fistName"
                    label="Fist Name"
                    name="fistName"
                    autoComplete="email"
                    fullWidth
                    value={formik.values.fistName} onChange={formik.handleChange}
                  />
                  {formik.errors.fistName && (<Typography variant="body2" color="red">{formik.errors.fistName}
                  </Typography>)}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="email"
                    fullWidth
                    value={formik.values.lastName} onChange={formik.handleChange}
                  />
                  {formik.errors.lastName && (<Typography variant="body2" color="red">{formik.errors.lastName}
                  </Typography>)}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="userName"
                    label="User Name"
                    name="userName"
                    autoComplete="email"
                    fullWidth
                    value={formik.values.userName} onChange={formik.handleChange}
                  />
                  {formik.errors.userName && (<Typography variant="body2" color="red">{formik.errors.userName}
                  </Typography>)}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="phone"
                    label="Your Phone"
                    name="phone"
                    autoComplete="email"
                    fullWidth
                    value={formik.values.phone} onChange={formik.handleChange}
                  />
                  {formik.errors.phone && (<Typography variant="body2" color="red">{formik.errors.phone}
                  </Typography>)}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    fullWidth
                    value={formik.values.email} onChange={formik.handleChange}
                  />
                  {formik.errors.email && (<Typography variant="body2" color="red">{formik.errors.email}
                  </Typography>)}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="email"
                    fullWidth
                    value={formik.values.address} onChange={formik.handleChange}
                  />
                  {formik.errors.address && (<Typography variant="body2" color="red">{formik.errors.address}
                  </Typography>)}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="passwword"
                    label="Password"
                    name="password"
                    autoComplete="email"
                    fullWidth
                    value={formik.values.password} onChange={formik.handleChange}
                  />
                  {formik.errors.password && (<Typography variant="body2" color="red">{formik.errors.password}
                  </Typography>)}
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" type='submit' style={{ marginBottom: '20px' }} fullWidth>
                    REGISTER
                  </Button>
                </Grid>
              </Grid>
              <LoginAsGuest />
            </form>
          </Box>
        </div>
      </div>
    </Background>
  )
}
