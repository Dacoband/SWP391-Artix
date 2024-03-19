import React, { Children } from 'react';
import BackupIcon from '@mui/icons-material/Backup';
import CustomizedButton from './CustomizedButton.tsx'
// This StyledButton will be used to override the default label styling


const CustomizedImageButton = ({ name, onChange, fullWidth,}) => {
  return (
    <>
      <div className='uploadButton'
        style={{
          width: "100%", margin: "auto",
          marginBottom: '2%',
        }}

      >
        <input
          accept='.png,.jpeg,.jpg,.tif,.gif'
          style={{ display: 'none' }}
          id={name}
          name={name}
          type="file"
          onChange={onChange}
        />
        <label htmlFor={name}>
          <CustomizedButton
            variant="contained"
            component="span"
            fullWidth={fullWidth}
            style={{ width: "30%", borderRadius: "50px" }}
            startIcon={<BackupIcon />}
          >
            Upload Artwork
          </CustomizedButton>
        </label>
      </div>
    </>
  );
};

export default CustomizedImageButton;