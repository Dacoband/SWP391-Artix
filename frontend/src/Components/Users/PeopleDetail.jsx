import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import  axios  from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {ThemeContext} from '../Themes/ThemeProvider.tsx'

export default function PeopleDetail() {
    const [person,SetPerson] = useState([]);
    const [open,SetOpen] = useState(false);
    const [loading,SetLoading] = useState(true);
    const {theme,switchImage} = useContext(ThemeContext);
    let {id} = useParams();
    //const URL = "https://localhost:7049/api/people/" + id; //- Local .NET API
    const URL = "https://peopleapi1141.azurewebsites.net/api/people/" + id; // Cloud .NET API
    const navigate = useNavigate();

    const redirect = () =>{
      navigate("/characters");
    }
    useEffect(()=>{
        axios
        .get(URL)
        .then(response => response.data)
        .then(data => {SetPerson(data);SetLoading(false)})
        .catch(error => console.log('Something is wrong: ' + error))
    },)

    const handleClick = (event) => {
      SetOpen(true)
      event.preventDefault();
    }
    const handleClose = (event) => {
      SetOpen(false)
      event.preventDefault();
    }

    const handleSubmit = (event) => {
      try{
        axios.delete(URL)
        .then(response => {console.log("Delete Complete!",response.data)})
        .then(redirect);
        
      }catch(error){
        console.log(error)
      }
    }
function Characters(){
        return(
          <Card className='card' sx={{ maxWidth: '70%',backgroundColor:theme.backgroundColor,color:theme.color,transition:theme.transition}}>
          <CardMedia
            sx={{ height: 300 }}
            image={person.image != null ? person.image : 'image'}
            title={person.name != null ? person.name : "name"}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {person.name != null ? person.name : "name"}
            </Typography>
            <Typography variant="body2" color="inherit">
              {person.age != null ? person.age : "age"}
            </Typography>
            <Typography variant="body2" color="inherit">
              {person.job != null ? person.job : "job"}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={switchImage()} size="small"><Link to={`/characters`}>Return Home</Link></Button>
            <Button onClick={switchImage()} size="small"><Link to={`edit`}>Update Detail</Link></Button>
            <Button onClick={handleClick} sx={{color:"red"}} size="small">Delete</Button>
          </CardActions>
        </Card>
        )
       }
function DefaultCards() {
        return (
          <Card className='card' sx={{ maxWidth: '70%' }}>
            <CardMedia
              sx={{ height: 300 }}
              image="https://gamepress.gg/lostword/sites/lostword/files/2022-02/321.png"
              title="name"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                name
              </Typography>
              <Typography variant="body2" color="text.secondary">
                age
              </Typography>
              <Typography variant="body2" color="text.secondary">
                job
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"><Link>Share</Link></Button>
              <Button size="small"><Link>Detail</Link></Button>
            </CardActions>
          </Card>
        )
      }
  return (
    <div className='page' style={{}}>
      {loading ? <LoadingScreen/> : ''}
      {loading ? <DefaultCards/> : <Characters/>}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Character Deletion?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want To DELETE the Character?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button sx={{color:"red"}} onClick={event => handleSubmit(event)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
