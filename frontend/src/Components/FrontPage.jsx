import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Container, Card, CardContent, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LoginForm from './Forms/LoginForm';
import {useHandleClick} from '../CustomHooks/HandleClick';
import  AuthContext  from './AuthenContext.tsx';
const useStyles = makeStyles({
  card: {
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      borderColor: 'blue', // Change border color on hover
    },
  },
});

const StyledLink = ({ to, children }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      {children}
    </Link>
  );
};

export default function FrontPage() {
  const classes = useStyles();
  const [isOpen,handleClick] =  useHandleClick();
  //Get the User from AuthContext
  const {auth} = useContext(AuthContext)
  return (
    <Container sx={{ marginTop: "10%"}}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <StyledLink to="/admin">
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Admin
                </Typography>
                <Typography color="textSecondary">
                  Click here to access admin panel
                </Typography>
              </CardContent>
            </Card>
          </StyledLink>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledLink to="/mod">
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Moderator
                </Typography>
                <Typography color="textSecondary">
                  Click here to access moderator panel
                </Typography>
              </CardContent>
            </Card>
          </StyledLink>
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledLink to="/characters">
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Characters
                </Typography>
                <Typography color="textSecondary">
                  Click here to view characters
                </Typography>
              </CardContent>
            </Card>
          </StyledLink>
        </Grid>
        <Grid item xs={12} sm={4} sx={{margin:'auto',padding:'0px'}}>
            <Card className={classes.card}>
            {auth==null ? //Check if User have login
            <Button onClick={handleClick}  sx={{width:'100%'}}>
              <CardContent>
                <Typography variant="h5" component="h2">
                 Login
                </Typography>
              </CardContent>
              </Button>
             : // OR
             <Typography variant="h5" component="h2">
             Welcome Back, {auth.name}
             </Typography>
             }
            </Card>
        </Grid>
      </Grid>
         <div style={{visibility: isOpen ? "visible" : "hidden" ,opacity: isOpen ? "100%" : "0%",transition: 'all 0.5s ease-in-out' }}>
         <LoginForm  handleClick={handleClick}/> 
         </div>
    </Container>
  )
}
