
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import '../../css/YourCommission.css';
import React, { useContext, useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {commission} from '../../share/Commission.js'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function YourCommission() {
    const { theme } = useContext(ThemeContext)
   // Tạo một đối tượng trạng thái để lưu trạng thái của từng mục trong danh sách
   const [acceptedItems, setAcceptedItems] = useState({});

   // Hàm xử lý khi nút "Accept" được nhấn cho một mục cụ thể
   const handleAccept = (commissionID) => {
       setAcceptedItems((prevState) => ({
           ...prevState,
           [commissionID]: true, // Đặt trạng thái của mục với commissionID tương ứng thành true
       }));
   };

  //  MUI Dialog
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));


    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
 // MUI Step
 const steps = ['Accept requests', 'Work in progress', 'Submit demo','Complete'];
 const [activeStep, setActiveStep] = React.useState(0);
 const [skipped, setSkipped] = React.useState(new Set());

 const isStepOptional = (step) => {
   return step === 1;
 };

 const isStepSkipped = (step) => {
   return skipped.has(step);
 };

 const handleNext = () => {
   let newSkipped = skipped;
   if (isStepSkipped(activeStep)) {
     newSkipped = new Set(newSkipped.values());
     newSkipped.delete(activeStep);
   }

   setActiveStep((prevActiveStep) => prevActiveStep + 1);
   setSkipped(newSkipped);
 };

 const handleBack = () => {
   setActiveStep((prevActiveStep) => prevActiveStep - 1);
 };

 const handleSkip = () => {
   if (!isStepOptional(activeStep)) {
     // You probably want to guard against something like this,
     // it should never occur unless someone's actively trying to break something.
     throw new Error("You can't skip a step that isn't optional.");
   }

   setActiveStep((prevActiveStep) => prevActiveStep + 1);
   setSkipped((prevSkipped) => {
     const newSkipped = new Set(prevSkipped.values());
     newSkipped.add(activeStep);
     return newSkipped;
   });
 };

 const handleReset = () => {
   setActiveStep(0);
 }; 

    
  return (
    <div className='yourCommission'>
         <Box className='box'
        sx={{
          color: theme.color,
          backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
          transition: theme.transition,
          width: '85%',
          margin: 'auto',
          borderRadius: '5px',
          marginBottom: '15px',
          
        }}>
            <h2>Your Commissions:</h2>
            <div className='listcommission'style={{width:'100%',display:'flex', justifyContent:'center'}}>


            <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }} 
            style={{borderTop:'1px solid black',borderLeft:'1px solid black',borderRight:'1px solid black',
            borderRadius:'10px',
            padding:0,
             marginBottom:'50px',
             marginTop: '30px'}}>
               {commission.map((commision)=>(
                <div>
                <ListItem alignItems="flex-start" key={commision.commissionID} >
                  <div className='onecommission'>
            <div className='content'>
            
            <ListItemText>
              <div className='header'style={{display:'flex', marginBottom:'5px'}}>
              <Avatar style={{background:theme.color}}><NotificationsActiveIcon/></Avatar>  
              {/* tên người đặt hàng */}

                 <h3 style={{margin:'auto 15px '}}>
                   You are requesting an order from: {commision.userNamerequestor}
                </h3>
                </div>
                <div className='contentcommission'>
               <div style={{fontWeight:'bold'}}>+ Phone number: {commision.phone}</div> 

                <div>
                <div> <div style={{fontWeight:'bold'}}> + Description: </div> 
                <span> {commision.description}</span>
                </div>
                </div>
                </div>


            </ListItemText></div>
            <div className='button'>
                            {!acceptedItems[commision.commissionID] && (
                             <>
                            {/* Truyền commissionID của mục hiện tại vào hàm handleAccept */}
                         <Button variant="contained" style={{ marginRight: '20px' }} onClick={() => handleAccept(commision.commissionID)}>Accept</Button>
                        <Button variant="contained" style={{ marginRight: '20px' }} color='error'>Cancel</Button>
                       </>
                      )}
                   {acceptedItems[commision.commissionID] && (
                  <Button variant="contained" onClick={handleClickOpen} >Track the process</Button>
               )}
              </div>
        </div>
      </ListItem>
        <Divider component="li" style={{backgroundColor:'black'}}/> </div>
      ))}
     
    </List></div>

    {/* Viết Dialog */}
    
  
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth='md'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Track the process
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <Box sx={{ width: '85%',margin:'auto' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
         
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box> */}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    

        </Box>
    </div>
  )
}
