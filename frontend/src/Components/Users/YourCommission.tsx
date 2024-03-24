
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import '../../css/YourCommission.css';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { commission } from '../../share/Commission.js'
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
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Creator } from '../../Interfaces/UserInterface.ts';
import { ICommissionForm, IExtraCommissionForm } from '../../Interfaces/CommissionForm.ts';
import { GetCommissionRecieverById } from '../../API/CommissionAPI/GET.tsx';
import { PutCommissionFormById } from '../../API/CommissionAPI/PUT.tsx';
export default function YourCommission() {
  const { theme } = useContext(ThemeContext)
  // Tạo một đối tượng trạng thái để lưu trạng thái của từng mục trong danh sách
  const [commissionList, setCommissionList] = useState<IExtraCommissionForm[]>([]);
  const [refreshForm, setreFreshForm] = useState(false)
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const savedAuth = sessionStorage.getItem('auth');
  const savedUser: Creator = savedAuth ? JSON.parse(savedAuth) : null;
  if (savedUser === null) {
    navigate(`/`)
  }
  useEffect(() => {
    const getCommissionForm = async () => {
      setLoading(true)
      const commissionForm: IExtraCommissionForm[] | undefined = await GetCommissionRecieverById(savedUser.creatorID)
      setCommissionList(commissionForm ?? [])
      setLoading(false)
    }
    getCommissionForm()
  }, [refreshForm, open])

  // nhấn Accept để tiếp tục
  const handleAccept = async (commission: IExtraCommissionForm) => {
    console.log(commission)
    setreFreshForm(currentValue => !currentValue);
    const updateCommissionForm: ICommissionForm = {
      commissionFormID: commission.commissionFormID,
      commissionID: commission.commissionID,
      receiverID: commission.receiverID,
      requestorID: commission.requestorID,
      description: commission.description,
      accept: true,
      progress: 1,
    }
    const response = PutCommissionFormById(updateCommissionForm, commission.commissionFormID)
    console.log(response)
  };
  const handleCancel = (commission: IExtraCommissionForm) => {
    console.log(commission)
    setreFreshForm(currentValue => !currentValue);
    const updateCommissionForm: ICommissionForm = {
      commissionFormID: commission.commissionFormID,
      commissionID: commission.commissionID,
      receiverID: commission.receiverID,
      requestorID: commission.requestorID,
      description: commission.description,
      accept: false,
      progress: 0,
    }
    const response = PutCommissionFormById(updateCommissionForm, commission.commissionFormID)
    console.log(response)
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



  const [currentSelect, setCurrentSelect] = useState<ICommissionForm>();
  const handleClickOpen = (commission: ICommissionForm) => {
    setOpen(true);
    console.log("cool cat");
    setCurrentSelect(commission)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='yourCommission'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box className='box'
        sx={{
          color: theme.color,
          backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
          transition: theme.transition,
          width: '85%',
          margin: 'auto',
          borderRadius: '5px',
          marginBottom: '15px',
          minHeight: '800px'
        }}>
        <h1>Your Commissions:</h1>
        <div className='listcommission' style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '40px' }}>


          <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}
            style={{
              borderTop: '1px solid black', borderLeft: '1px solid black', borderRight: '1px solid black',
              borderRadius: '10px',
              padding: 0,
              marginBottom: '50px',
              marginTop: '30px'
            }}>
            {commissionList.map((commision: IExtraCommissionForm) => (
              <div>
                <ListItem alignItems="flex-start" key={commision.commissionID} >
                  <div className='onecommission'>
                    <div className='content'>

                      <ListItemText>
                        <div className='header' style={{ display: 'flex', marginBottom: '5px' }}>
                          {commision.accept === null && (
                            <Avatar style={{ background: theme.color }}><NotificationsActiveIcon /></Avatar>)}
                          {commision.accept === true && (
                            <Avatar style={{ background: '#10AF27' }}><CheckIcon /></Avatar>)}

                          {commision.accept === false && (
                            <Avatar style={{ background: 'red' }}><ClearIcon /></Avatar>

                          )}
                          {/* tên người đặt hàng */}

                          <h3 style={{ margin: 'auto 15px ' }}>
                            You Got A Commission From: {commision.requestorUserName}
                          </h3>
                        </div>
                        <div className='contentcommission'>
                          <div>
                            <div>
                              <Typography variant='h6'>Phone: {commision.requestorPhone}</Typography>
                              <Typography variant='h6'>Email: {commision.requestorEmail}</Typography>
                              <Typography variant='body1' style={{ fontWeight: 'bold' }}> Description: </Typography>
                              <span> {commision.description}</span>
                            </div>
                          </div>
                        </div>


                      </ListItemText></div>
                    <div className='button'>
                      {commision.accept === null && (
                        <>
                          <Button variant="contained" style={{ marginRight: '20px' }} onClick={() => handleAccept(commision)}>Accept</Button>
                          <Button variant="contained" style={{ marginRight: '20px' }} color='error' onClick={() => handleCancel(commision)}>Cancel</Button>
                        </>
                      )}
                      {commision.accept === true && (
                        <Button variant="contained" onClick={() => handleClickOpen(commision)} >Track the progress</Button>
                      )}
                      {commision.accept === false && (
                        <Button style={{ paddingRight: '40px', paddingLeft: '40px' }} variant="contained" disabled  >DENIED</Button>
                      )}
                    </div>
                  </div>
                </ListItem>
                <Divider component="li" style={{ backgroundColor: 'black' }} /> </div>
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
            Track the progress
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

            <CommissionStepper currentCommission={currentSelect} />

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

function CommissionStepper({ currentCommission }) {
  const steps = ['Confirm Commission', 'Drawing', 'Submit Confirmation', 'Commission Completed!'];
  let commission: ICommissionForm = currentCommission;
  const [activeStep, setActiveStep] = useState(commission.progress)
  const [loading, setLoading] = useState(false)
  const handleNext = async () => {
    try {
      setLoading(true)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      let updateStep: ICommissionForm = {
        ...commission,
        progress: commission.progress + 1
      }
      const response = await PutCommissionFormById(updateStep, commission.commissionFormID)
      console.log("Forward 1 step" + response)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  };

  const handleBack = async () => {
    try {
      setLoading(true)
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      let updateStep: ICommissionForm = {
        ...commission,
        progress: commission.progress - 1
      }
      const response = await PutCommissionFormById(updateStep, commission.commissionFormID)
      console.log("Backward 1 Step" + response)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  };

  const handleCancel = async () => {
    try {
      setLoading(true)
      let updateStep: ICommissionForm = {
        ...commission,
        progress: 0,
        accept: null
      }
      const response = await PutCommissionFormById(updateStep, commission.commissionFormID)
      console.log("Backward 1 Step" + response)
      setActiveStep(0)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <Box sx={{ width: '100%', scale: "100%", height: "auto" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
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
            All steps completed - you're finished
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {activeStep !== 1 ?
              <Button
                color="inherit"
                disabled={activeStep === 1 || loading}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              :
              <Button
                color="error"
                disabled={loading}
                onClick={handleCancel}
                sx={{ mr: 1 }}
              >
                Cancel Commission
              </Button>
            }
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}
              disabled={activeStep === 4 || loading}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}