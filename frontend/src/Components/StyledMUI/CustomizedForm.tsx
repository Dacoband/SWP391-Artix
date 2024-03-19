import React from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomizedButton from './CustomizedButton.tsx';

const useStyles = makeStyles((theme) => ({
  root: {
    // You can add some styles here
  },
  formControl: {
    
    minWidth: 120,
  },
  button: {
    
  },
  // Add more custom styles if needed
}));
const ReusableForm = ({ customStyles, onSubmit, formData }) => {
  const classes = useStyles(customStyles);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(event);
    }
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit} style={customStyles}>
      {formData.map((field, index) => (
        <TextField
          key={index}
          label={field.label}
          name={field.name}
          type={field.type}
          required={field.required}
          variant="outlined"
          className={classes.formControl}
          // Add more props if needed (value, onChange, etc.)
        />
      ))}
      <CustomizedButton
        type="submit"
        variant="contained"
      >
        Submit
      </CustomizedButton>
    </form>
  );
};
export default ReusableForm;