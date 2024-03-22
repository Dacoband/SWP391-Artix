import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Components/AuthenContext.tsx';
export default function LoginWithGoogle({ disableOutsideClick, handleClick }) {
  const accounturl = 'https://localhost:7233/api/Account'
  const creatorurl = 'https://localhost:7233/api/Creator/'
  const roleurl = 'https://localhost:7233/api/Role/'

  const { storeUserData } = useAuth();
  //Call the custom hook to store user login information
  const navigate = useNavigate();

  //This Method will able you to fetch Google Authentication Token and use Google API to fetch user gmail account info without needing a Backend
  const googleAPI = 'https://www.googleapis.com/oauth2/v3/userinfo' // URL to googleapis to authenticate user token
  const onClick = useGoogleLogin({
    onSuccess: async response => {
      console.log(response);
      const token = (response.access_token);
      //Using Axios to fetch API from Google
      //Async await to synchonize fetching data
      //TODO: Remove console.log when finish testing
     const ggAccount = await axios.get(googleAPI, { headers: { Authorization: `Bearer ${token}` } }).then(response => response.data)
     const listOfAccounts = await axios.get(accounturl).then(response => response.data)
     const foundAccount = listOfAccounts.find((account) => account.email === ggAccount.email);
      if (foundAccount) {
         //Get the user roles
      const userroleResponse = await axios.get(roleurl+foundAccount.roleID);
      const userrole = userroleResponse.data;
      //Store the user role in sesison
      sessionStorage.setItem('userRole', userrole.roleName);
       // Once the user is verified, get additional user data.
      const creatorResponse = await axios.get(creatorurl + foundAccount.accountID);
      const creatorData = creatorResponse.data;
      const creatorWithoutTheImages = {
        ...creatorData,
        profilePicture:'',
        backgroundPicture:''
      }
      storeUserData(creatorWithoutTheImages);
        window.dispatchEvent(new Event('userLoggedIn'));
        if (userrole.roleName === "AD") {
          navigate('/admin');
        } else {
          navigate('/characters');
        }
      }

    },
    onError: error => { console.log(error) }
  }, [])
  return (
    <>
      <Button
        onClick={() => onClick()}
        variant="contained"
        startIcon={<GoogleIcon />}
        fullWidth
        sx={{ backgroundColor: '#DB4437', color: 'white' }}
      >
        Login with Google
      </Button>
    </>
  )
}
