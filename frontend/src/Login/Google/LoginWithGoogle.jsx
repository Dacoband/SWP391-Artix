import React, { } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Components/AuthenContext.tsx';
export default function LoginWithGoogle({ disableOutsideClick, handleClick }) {
  const accounturl = 'https://localhost:7233/api/Account/email/'
  const creatorurl = 'https://localhost:7233/api/Creator/'
  const roleurl = 'https://localhost:7233/api/Role/'
  const { storeUserData } = useAuth();
  //Call the custom hook to store user login information
  const navigate = useNavigate();
  const redirect = () => {
    if (disableOutsideClick !== true) {
      handleClick()
    }
    const url = "/characters"
    navigate(url)
    handleClick()
  }

  //This Method will able you to fetch Google Authentication Token and use Google API to fetch user gmail account info without needing a Backend
  const googleAPI = 'https://www.googleapis.com/oauth2/v3/userinfo' // URL to googleapis to authenticate user token
  const onClick = useGoogleLogin({
    onSuccess: async response => {
      console.log(response);
      const token = (response.access_token);
      //Using Axios to fetch API from Google
      //Async await to synchonize fetching data
      //TODO: Remove console.log when finish testing
      await axios
        .get(googleAPI, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => response.data)
        .then(user => {
          console.log(user);
          const accountResponse = axios.get(accounturl+user.email)
          const account = accountResponse.data;
          const creatorResponse = axios.get(creatorurl + account.accountID)
          const creator = creatorResponse.data;
          const userroleResponse = axios.get(roleurl + account.roleID);
          const userrole = userroleResponse.data;
          //Store the user role in sesison
          sessionStorage.setItem('userRole', userrole.roleName);
          storeUserData(creator); //Store user data from Google to session storage
          window.dispatchEvent(new Event('userLoggedIn'));
        })
        .then(redirect)
        .catch(error => console.log(error))
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
