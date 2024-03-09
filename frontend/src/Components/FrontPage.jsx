import React from 'react'
import LoginForm from './Forms/LoginForm';
import {useHandleClick} from '../CustomHooks/HandleClick';
import Background from './Themes/Background.jsx'

export default function FrontPage() {
  const [handleClick] =  useHandleClick();
  return (
    // <Container sx={{ marginTop: "10%"}}>
    //   <Grid container spacing={4}>
    //     <Grid item xs={12} sm={4}>
    //       <StyledLink to="/admin">
    //         <Card className={classes.card}>
    //           <CardContent>
    //             <Typography variant="h5" component="h2">
    //               Admin
    //             </Typography>
    //             <Typography color="textSecondary">
    //               Click here to access admin panel
    //             </Typography>
    //           </CardContent>
    //         </Card>
    //       </StyledLink>
    //     </Grid>
    //     <Grid item xs={12} sm={4}>
    //       <StyledLink to="/mod">
    //         <Card className={classes.card}>
    //           <CardContent>
    //             <Typography variant="h5" component="h2">
    //               Moderator
    //             </Typography>
    //             <Typography color="textSecondary">
    //               Click here to access moderator panel
    //             </Typography>
    //           </CardContent>
    //         </Card>
    //       </StyledLink>
    //     </Grid>
    //     <Grid item xs={12} sm={4}>
    //       <StyledLink to="/characters">
    //         <Card className={classes.card}>
    //           <CardContent>
    //             <Typography variant="h5" component="h2">
    //               Characters
    //             </Typography>
    //             <Typography color="textSecondary">
    //               Click here to view characters
    //             </Typography>
    //           </CardContent>
    //         </Card>
    //       </StyledLink>
    //     </Grid>
    //     <Grid item xs={12} sm={4} sx={{margin:'auto',padding:'0px'}}>
    //         <Card className={classes.card}>
    //         {auth==null ? //Check if User have login
    //         <Button onClick={handleClick}  sx={{width:'100%'}}>
    //           <CardContent>
    //             <Typography variant="h5" component="h2">
    //              Login
    //             </Typography>
    //           </CardContent>
    //           </Button>
    //          : // OR
    //          <Typography variant="h5" component="h2">
    //          Welcome Back, {auth.name}
    //          </Typography>
    //          }
    //         </Card>
    //     </Grid>
    //   </Grid>
    //      <div style={{visibility: isOpen ? "visible" : "hidden" ,opacity: isOpen ? "100%" : "0%",transition: 'all 0.5s ease-in-out' }}>
    //      <LoginForm  handleClick={handleClick}/> 
    //      </div>
    // </Container>
    <Background>
    <LoginForm disableOutsideClick={true} alternative={true} backdrop={""}/>
    </Background>
  )
}
