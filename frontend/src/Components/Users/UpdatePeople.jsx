import {React, useState, useEffect, useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import CustomizedTextField from '../StyledMUI/CustomizedTextField.tsx'
import CustomizedButton from '../StyledMUI/CustomizedButton.tsx'



export default function UpdatePeople() {
    const [open, setOpen] = useState(false);
    const [loading,SetLoading] = useState(true);
    const {theme} = useContext(ThemeContext);
    const handleClickOpen = (event) => {
      event.preventDefault();
      setOpen(true);
    };
    const handleClose = (event) => {
      event.preventDefault();
      setOpen(false);
    };
    //Use Navigation to redirect them back to the profile page
    const navigate = useNavigate();
    const redirect = () => {
        navigate(`/characters/${id}`);
    }
    //Get The PUT API and update
    const [name,Setname] = useState();
    const [age,Setage] = useState();
    const [job,Setjob] = useState();
    const [image,Setimage] = useState();
    const [person,SetPerson] = useState([]);
    const {id} = useParams();
    //const URL = "https://localhost:7049/api/people/" + id; //- Local .NET API
    const URL = "https://peopleapi1141.azurewebsites.net/api/people/" + id;
    useEffect (() =>{
    axios
    .get(URL)
    .then(response => response.data)
    .then(data => {SetPerson(data);SetLoading(false)})
    .catch(error => console.log(error))
    });

    const axiosConfig = {
        headers: {
          'Content-Type': 'application/json', // Make sure the content type matches what the server expects
        },
      };
      
    const handleSubmit = (event) =>{
        axios.put(URL,{
            id: person.id,
            name: name!=null ? name : person.name,
            age: age!=null ? age : person.age,
            job: job!=null ? job : person.job,
            image: image!=null ? image : person.image
        },axiosConfig)
        .then(response => {console.log("Complete PUT method!",response.data);SetLoading(true)})
        .then(redirect)
        .catch(error => console.log("Error at: "+error))
        event.preventDefault();
        handleClose(event);
    }
    
    //To get a constant update of an variable, use function event => SetState(event.target.value)
    return (
        <>
        {loading ? <LoadingScreen/> : ''}
        <div className='page'>
            <Container sx={{backgroundColor:theme.backgroundColor,color:theme.color}} className='container' component="main" maxWidth="xs">
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
                        <img alt='character' style={{objectFit:"fill"}} src = {person.image != null ? person.image : 'image'} ></img>
                    </Avatar>
                    <Typography component="h1" variant="h5" color='inherit'>
                        Update The Character
                    </Typography>
                    <Box component="form" noValidate onSubmit={event => handleClickOpen(event)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <CustomizedTextField
                                    onChange={event => {Setname(event.target.value)}}
                                    value={name ==null ? person.name : name}
                                    defaultValue = {'name'}
                                    name="fullName"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomizedTextField
                                    onChange={event => {Setage(event.target.value)}}
                                    value={age ==null ? person.age : age}
                                    defaultValue = {1}
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    name="age"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomizedTextField
                                    onChange={event => {Setjob(event.target.value)}}
                                    value={job ==null ? person.job : job}
                                    defaultValue = {"job"}
                                    required
                                    fullWidth
                                    id="job"
                                    label="Job"
                                    name="job"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomizedTextField
                                    onChange={event => {Setimage(event.target.value)}}
                                    value={image ==null ? person.image : image}
                                    defaultValue = {'image'}
                                    required
                                    fullWidth
                                    name="imageurl"
                                    label="Image URL"
                                    type="imageurl"
                                    id="imageurl"
                                />
                            </Grid>
                        </Grid>
                        <CustomizedButton
                            label="Update"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2 }}
                        >
                        </CustomizedButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

        <Dialog
        open={open}
        onClose={handleClose}
        sx={{background:theme.backgroundColor}}
        >
        <DialogTitle>
          {"Character Update?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You Sure You Want To Update the Character?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomizedButton onClick={handleClose} label="Cancel"></CustomizedButton>
          <CustomizedButton onClick={event => handleSubmit(event)} label="Agree" autoFocus></CustomizedButton>
        </DialogActions>
      </Dialog>
        </div>
        </>
    );
}