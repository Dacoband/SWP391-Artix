import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './FormCSS/CreateAccount.css'
import LoginWithGoogle from '../../Login/Google/LoginWithGoogle.jsx';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios"
import Background from '../Themes/Background.jsx';
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import { Account, Creator } from '../../Interfaces/UserInterface.ts';
import { PostCreator, PostUserAccount } from '../../API/UserAPI/POST.tsx';
import { GetAccountByEmail } from '../../API/UserAPI/GET.tsx';
import CustomizedSwitch from '../StyledMUI/CustomizedSwitch.jsx'
import { FormControlLabel } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoadingScreen from '../Users/LoadingScreen.jsx';

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
const switchCustomText = (
  <Typography color='error' sx={{ display: "flex" }}>
    Happy Working <FavoriteIcon color='error' />
  </Typography>
)
export default function CreateAccount() {
  const [isLoading, setIsLoading] = useState(false)
  const [commission, setCommission] = useState(false)
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setCommission(type === 'checkbox' ? checked : value);
  };

  const [open, setOpen] = useState(false);
  // Call this function when the form is submitted successfully
  const handleOpenSnackbar = () => {
    setOpen(true);
  };
  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    // Ignore close events from clicking away
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    navigate('/')
  };
  // Account Creation Started Here!
  const { theme } = useContext(ThemeContext)
  const [accountID, setAccountID] = useState("")
  const navigate = useNavigate()
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      profilePicture: "",
      backgroundPicture: "",
      paypalAccountID: 1,
      allowCommission: false,
      biography: "",
      role: 2,
      lastName: "",
      firstName: "",
      userName: "",
      phone: "",
      address: "",
      email: "",
      password: "",

    },

    onSubmit: (values) => {
      let account: Account = {
        accountID: "0", // Auto increasement id
        roleID: "2", //Default role as creator (AT)
        email: values.email,
        password: values.password,
      }
      let creator: Creator = {
        creatorID: "0",
        accountID: accountID,
        paypalAccountID: 1,
        userName: values.userName,
        profilePicture: values.profilePicture,
        backgroundPicture: values.backgroundPicture,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        phone: values.phone,
        lastLogDate: undefined,
        biography: values.biography,
        allowCommission: commission,
        followCount: 0,
        email: values.email
      }
      console.log(account)
      console.log(creator)
      const PostAccount = async () => {
        try {
          setIsLoading(true)
          await PostUserAccount(account)
          console.log(`Post Account successfully: `)
          const userAccount = await GetAccountByEmail(values.email)
          let creatorWithAccountID = { ...creator, accountID: userAccount ? userAccount.accountID : "1" }
          await PostCreator(creatorWithAccountID)
          console.log(`Post Creator successfully: `)
          setIsLoading(false)
          handleOpenSnackbar()
        } catch (err) {
          console.log(err)
        }
      }
      PostAccount()
    },

    validationSchema: Yup.object({
      userName: Yup.string().required("Must be 6 characters or more.").min(6, "Must be 6 characters or more"),
      email: Yup.string().required("We need something to authorize you").min(10, "Must be 10 characters or more"),
      password: Yup.string().required("Password! Or we gonna steal your account.").min(5, "Must be 5 characters or more"),
      biography: Yup.string().required("Tell the community something about yourself")
    }),



  })
  return (
    <Background>
       {isLoading ? <LoadingScreen />  : ""}
      <div className='createaccount'>
        <div className='signupForm' style={{ marginTop: '2%' }}>
         
           
            <Box
              height={'auto'}
              width={'80%'}
              my={4}
              display="flex"
              alignItems="center"
              gap={4}
              p={2}
              sx={{ backgroundColor: theme.backgroundColor, margin: 'auto' }}
            >
              <form onSubmit={formik.handleSubmit}>
                <Grid className='formregister' container spacing={2}>
                  <Grid item xs={12}>
                    <div className='header'>
                      <Typography variant="h5" component="h1" gutterBottom>
                        Register Account
                      </Typography></div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
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

                      id="passwword"
                      label="Password"
                      name="password"
                      autoComplete="password"
                      fullWidth
                      value={formik.values.password} onChange={formik.handleChange}
                    />
                    {formik.errors.password && (<Typography variant="body2" color="red">{formik.errors.password}
                    </Typography>)}
                  </Grid>

                  <Grid item xs={6}>
                    <TextField

                      id="firstName"
                      label="First Name (Optional)"
                      name="firstName"
                      autoComplete="email"
                      fullWidth
                      value={formik.values.firstName} onChange={formik.handleChange}
                    />
                    {formik.errors.firstName && (<Typography variant="body2" color="red">{formik.errors.firstName}
                    </Typography>)}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="lastName"
                      label="Last Name (Optional)"
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
                      id="userName"
                      label="User Name"
                      name="userName"
                      autoComplete="userName"
                      fullWidth
                      value={formik.values.userName} onChange={formik.handleChange}
                    />
                    {formik.errors.userName && (<Typography variant="body2" color="red">{formik.errors.userName}
                    </Typography>)}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <CustomizedSwitch
                          checked={commission}
                          onChange={handleChange}
                          name="openToCommissions"
                        />
                      }
                      label={commission ? switchCustomText : "Open to Commissions?"}
                      style={{ color: theme.color }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="phone"
                      label="Your Phone (Optional)"
                      name="phone"
                      autoComplete="phone"
                      fullWidth
                      value={formik.values.phone} onChange={formik.handleChange}
                    />
                    {formik.errors.phone && (<Typography variant="body2" color="red">{formik.errors.phone}
                    </Typography>)}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="address"
                      label="Address (Optional)"
                      name="address"
                      autoComplete="address"
                      fullWidth
                      value={formik.values.address} onChange={formik.handleChange}
                    />
                    {formik.errors.address && (<Typography variant="body2" color="red">{formik.errors.address}
                    </Typography>)}
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="biography"
                      label="Biography"
                      name="biography"
                      autoComplete="biography"
                      fullWidth
                      multiline
                      rows={3}
                      value={formik.values.biography} onChange={formik.handleChange}
                    />
                    {formik.errors.biography && (<Typography variant="body2" color="red">{formik.errors.biography}
                    </Typography>)}
                  </Grid>
                  <Grid item xs={12}>
                    <Button disabled={open} variant="contained" type='submit' style={{ marginBottom: '20px' }} fullWidth>
                      REGISTER
                    </Button>
                  </Grid>
                </Grid>
                <LoginAsGuest />
              </form>
            </Box>
         
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Your form has been submitted successfully!
        </Alert>
      </Snackbar>

    </Background>
  )
}
