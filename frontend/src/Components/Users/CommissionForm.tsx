import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import '../../css/CommissionForm.css';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { GetCreatorByID } from '../../API/UserAPI/GET.tsx';
import { Creator } from '../../Interfaces/UserInterface';
import { CreateCommissionForm, GetCommissionID } from '../../API/CommissionAPI/POST.tsx';
import { ICommissionID } from '../../Interfaces/CommissionForm.ts';

export default function CommissionForm() {
  //reciever is the creator you commission
  const [reciever, setReciever] = useState<Creator>()
  const [commissionID, setCommissionID] = useState<string|number>()
  const [sendCompleted, setSendCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  let { id } = useParams()
  const navigate = useNavigate()
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
    if (sendCompleted) {
      navigate(`../profile/${id}`)
    }
  };

  const savedAuth = sessionStorage.getItem('auth');
  // Check if there's any auth data saved and parse it
  const user: Creator = savedAuth ? JSON.parse(savedAuth) : null;
  // Now 'auth' contains your authentication state or null if there's nothing saved

  useEffect(() => {
    const getReciever = async () => {
      let reciever: Creator | undefined = await GetCreatorByID(id ?? "0")
      setReciever(reciever)
    }
    getReciever()
  }, [])

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    initialValues: {
      commissionFormID: 0,
      commissionID: commissionID ?? "0",
      receiverID: reciever?.creatorID,
      requestorID: user?.creatorID,
      description: "Dear humanity,\nI want to commission you an art about: \nThe requested size will be: \nDue date is: \nFor any further information, please contact me through my email. Thanks!",
      accept: null,
      progress: 0,

    },

    onSubmit: (values) => {
      const sumbitCommission = async () => {
        try {
          setLoading(true)
            let id: ICommissionID | undefined = await GetCommissionID()
            let commissionForm={
              ...values,
              commissionID:id?.commissionID
            }
          const response = CreateCommissionForm(commissionForm)
          console.log("Commission sent successfully" + response)
          setSendCompleted(true)
          handleOpenSnackbar()
          setLoading(false)
        } catch (err) {
          setSendCompleted(false)
          setLoading(false)
          console.log("Something is wrong: " + err)
        }
      }
      sumbitCommission()

    },

    validationSchema: Yup.object({
      description: Yup.string().required("Tell Them What To Do. What's The Deadline. The Schemema. Etc."),
    }),
  })

  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 100 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <div className='commission'>
      <Box
        //   height=auto
        width={700}
        my={4}
        display="flex"
        alignItems="center"

        //   justifyContent="center"
        gap={4}
        p={2}
        sx={{ border: '2px solid grey' }}
        style={{ background: ' whitesmoke', margin: 'auto', paddingLeft: '35px', paddingRight: '35px', marginBottom: '40px', transform: 'translateY(8%)' }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid className='formregister' container spacing={2}>
            <Grid item xs={12}>
              <div className='header'>
                <Typography variant="h5" component="h1" gutterBottom>
                  Art Commission Request
                </Typography></div>
            </Grid>

            <Grid item xs={12}>
              <TextField className='text'
                disabled
                id="userName"
                label="User Name"
                fullWidth
                InputLabelProps={{ style: { color: 'gray' } }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'gray !important', // Thay đổi màu của viền ngoài khi TextField bị vô hiệu hóa
                  },
                }}
                defaultValue={"UserName"}
                value={reciever?.userName}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField className='text'
                disabled
                id="phone"
                label="Phone Contact"
                defaultValue={"Phone Number"}
                value={reciever?.phone}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField className='text'
                disabled
                id="email"
                label="Email"
                defaultValue={"Email"}
                value={reciever?.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                fullWidth
                multiline // Thêm thuộc tính multiline
                rows={5} // Đặt số hàng mong muốn    
                value={formik.values.description} onChange={formik.handleChange}
              />
              <Grid item xs={12}>
                <div className='note'>*Suggestion: You can fill in the box describing the size of the art and the time you want to complete the work.</div>
              </Grid>
              {formik.errors.description && (<Typography variant="body2" color="red">{formik.errors.description}
              </Typography>)}
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type='submit' style={{marginBottom: '20px' }} fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={sendCompleted ? "success" : "error"} sx={{ width: '100%' }}>
          {sendCompleted ? "Your form has been submitted successfully!" : "Sending Form Failed!"}
        </Alert>
      </Snackbar>
    </div>
    </>
  )
}
