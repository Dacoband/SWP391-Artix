import CustomizedImageButton from '../StyledMUI/CustomizedImageButton.jsx'
import '../../css/Payment.css'
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import React, { useContext, useEffect, useState } from 'react'
import AddCardIcon from '@mui/icons-material/AddCard';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
export default function Payment() {
  const { theme } = useContext(ThemeContext)
  // Up ảnh
  //  t copy sai hay sao á
  // ktra lại giúp nhaa
  const [preview, setPreview] = useState(null);



  const [blobImage, setBlobImage] = useState();
  //Covert Blob to Base64 string to easily view the image
  function blobToBase64(blob, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
        const base64data = reader.result;
        callback(base64data);
    };
}

const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === "imageFile") {
        // Files is a FileList object, you can grab the first file using indexing if you're accepting single files
        const file = files[0];
        // Now you can set the file to your state, make sure you have a state property to hold it
        setBlobImage(file)
        //console.log(artForm.imageFile)
        blobToBase64(file, function (base64Image) {
            setPreview(base64Image)
            //console.log(base64Image)
        })

    }
};


  return (
    <Box className='box'
    sx={{
      color: theme.color,
      backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
      transition: theme.transition,
      width: '85%',
      margin: 'auto',
      borderRadius: '5px',
      marginBottom: '15px',
      minHeight:'600px'
    }}>
      <h1>Order Details</h1>
      <div className='contentpay'>
        <Box className='orderDetail'>
          <div className='inforpay'>
          <h2><AddCardIcon style={{transform: 'translateY(5px)', fontSize:'30px'}} /> Your Bill :</h2>
          
          <div>Name Arwork :</div>
          <div>Artist :</div>
          <div>Price :</div>
          <div>Customer Name : </div>
          </div>

          <div className='guide'>
          <h2><CollectionsBookmarkIcon style={{transform: 'translateY(5px)', fontSize:'30px'}}></CollectionsBookmarkIcon>Payment Guide:</h2>
          <div>
          <div>Step1: Scan the QR code below with the Internet Banking application to pay.</div>
          <div>Step2: Screenshot your payment and post it in the button below. </div>
          <CustomizedImageButton
                            name="imageFile"
                            onChange={handleImageChange}
                            fullWidth
                        />
           </div></div>

            
        </Box>
        <Box className='inforQR'>
          <div className='imagecontent'>
            <div className='image'>

           <img src='/images/QR2.jpeg' style={{width:'350px'}}/></div>

           <h3>Account owner: TRAN ANH TUYET</h3>
           <h3>Account number:tk giả chuyển tiền real mà ko có sô nha </h3>
           </div>
        </Box>
      </div>

      
    </Box>
  )
}
