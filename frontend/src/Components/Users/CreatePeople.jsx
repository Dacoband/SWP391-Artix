import {React, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios'; // import axios
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function CreatePeople() {
  const [name,Setname] = useState();
  const [age,Setage] = useState();
  const [job,Setjob] = useState();
  const [image,Setimage] = useState();
  const [open,SetOpen] = useState(false);
  const URL = "https://peopleapi1141.azurewebsites.net/api/people";
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/`);
  }
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json', // Make sure the content type matches what the server expects
      },
    };
    const handleSubmit = (event) => {
      try{
      axios.post(URL,{
        id:0,
        name: name!=null ? name : "name",
        age: age!=null ? age : "age",
        job: job!=null ? job : "job",
        image: image!=null ? image : "image"
      },axiosConfig)
      .then(response => {console.log("Completed!"+response.data)})
      .then(redirect)
      
    }catch(error){
      console.log(error)
    }
      SetOpen(false)
      event.preventDefault();
    }

    const handleClickOpen = (event) => {
      event.preventDefault();
      SetOpen(true)
    };
    const handleClose = () => {
      SetOpen(false)
    };
  return (
    <div className='page'>
    <Container className='container' component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AccountCircleIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Create New Character
            </Typography>
            <Box component="form" noValidate onSubmit={event => handleClickOpen(event)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            
                            onChange={event => Setname(event.target.value)}
                            placeholder='Full Namne'
                            name="fullName"
                            required
                            fullWidth
                            id="fullName"
                            label="Full Name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={event => Setage(event.target.value)}
                            placeholder='Character Age'
                            required
                            fullWidth
                            id="age"
                            label="Age"
                            name="age"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={event => Setjob(event.target.value)}
                            placeholder='Character Job'
                            required
                            fullWidth
                            id="job"
                            label="Job"
                            name="job"
                            
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={event => Setimage(event.target.value)}
                            placeholder='URL To Character Image'
                            required
                            fullWidth
                            name="imageurl"
                            label="Image URL"
                            type="imageurl"
                            id="imageurl"
                            
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>

    <p>{name}</p>
    <p>{age}</p>
    <p>{job}</p>
    <p>{image}</p>

    <Dialog
open={open}
onClose={handleClose}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">
  {"Create New Character?"}
</DialogTitle>
<DialogContent>
  <DialogContentText id="alert-dialog-description">
    Are You Sure You Want To Add the Character?
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button onClick={handleClose}>Cancel</Button>
  <Button onClick={event => handleSubmit(event)} autoFocus>
    Agree
  </Button>
</DialogActions>
</Dialog>
</div>
  )
}
