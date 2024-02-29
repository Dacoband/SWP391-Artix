import React,{useContext, useState} from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import CustomizedButton from '../../StyledMUI/CustomizedButton.tsx';
import { ThemeContext } from '../../Themes/ThemeProvider.tsx';
import CustomizedTextField from '../../StyledMUI/CustomizedTextField.tsx'
const UserInfoForm = () => {

    const {theme} = useContext(ThemeContext)

    const [userInfo, setUserInfo] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        paypalAccount: '',
        openToCommissions: false,
        bio: '',
      });
      const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        setUserInfo({
          ...userInfo,
          [name]: type === 'checkbox' ? checked : value,
        });
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        // Here, you'd typically handle the form submission, like sending data to a server.
        console.log('Form submitted with:', userInfo);
      };

  return (
    <div className='form'>
   <div className='userInfoForm' style={{backgroundColor:`rgba(${theme.rgbBackgroundColor},0.9)`}}>
     <form onSubmit={handleSubmit}>
      <CustomizedTextField
        name="userName"
        label="User Name"
        required
        value={userInfo.userName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <CustomizedTextField
        name="firstName"
        label="First Name"
        required
        value={userInfo.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <CustomizedTextField
        name="lastName"
        label="Last Name"
        required
        value={userInfo.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <CustomizedTextField
        name="address"
        label="Address"
        required
        value={userInfo.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <CustomizedTextField
        name="phoneNumber"
        label="Phone Number"
        value={userInfo.phoneNumber} 
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <CustomizedTextField
        name="paypalAccount"
        label="PayPal Account"
        value={userInfo.paypalAccount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Switch
            checked={userInfo.openToCommissions}
            onChange={handleChange}
            name="openToCommissions"
          />
        }
        label="Open to Commissions"
        margin="normal"
      />
      <CustomizedTextField
        name="bio"
        label="Bio"
        multiline
        rows={4}
        value={userInfo.bio}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <CustomizedButton type="submit" variant="contained">
        Submit
      </CustomizedButton>
    </form>
    </div>
    </div>
  );
};
export default UserInfoForm;
