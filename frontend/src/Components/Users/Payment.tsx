import CustomizedImageButton from '../StyledMUI/CustomizedImageButton.jsx'
import '../../css/Payment.css'
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import React, { useContext, useEffect, useState } from 'react'
import AddCardIcon from '@mui/icons-material/AddCard';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import CustomizedTypography from '../StyledMUI/CustomizedTypography.jsx';
import Typography from '@mui/material/Typography'
import { GetPaymentAdmin } from '../../API/PaymentAPI/GET.tsx';
import { useParams } from 'react-router-dom';
import { GetArtById, GetArtsNoImageByCreatorId } from '../../API/ArtworkAPI/GET.tsx';
import { GetCreatorByID } from '../../API/UserAPI/GET.tsx';
import { Artwork } from '../../Interfaces/ArtworkInterfaces.ts';
import { Creator } from '../../Interfaces/UserInterface.ts';
import { GetTagByArtId } from '../../API/TagAPI/GET.tsx';
import { Button } from '@mui/material';
export default function Payment() {
  const { theme } = useContext(ThemeContext)
  // Up ảnh
  //  t copy sai hay sao á
  // ktra lại giúp nhaa
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [adminQR, setAdminQR] = useState<String | null | undefined>(null);
  const [artwork, setArtwork] = useState<Artwork>()
  const [creator, setCreator] = useState<Creator>()
  useEffect(() => {
    const getAdminQR = async () => {
      let qr: string | null | undefined = await GetPaymentAdmin()
      setAdminQR(qr)
    }
    const getArtWork = async () => {
      const artwork = await GetArtById(id ? id : "1");
      setArtwork(artwork)
      const creator = await GetCreatorByID(artwork ? artwork.creatorID : "1")
      setCreator(creator)
    }
    getArtWork()
    getAdminQR()
  })


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
        minHeight: '600px'
      }}>
      <h1>Order Details</h1>
      <div className='contentpay'>
        <Box className='orderDetail'>
          <div className='inforpay'>
            <h2><AddCardIcon style={{ transform: 'translateY(5px)', fontSize: '30px' }} /> Your Bill :</h2>
            <div>Name Arwork: {artwork?.artworkName}</div>
            <div>Artist: {creator?.userName}</div>
            <div>Price: {artwork?.price}</div>
          </div>

          <div className='guide'>
            <h2><CollectionsBookmarkIcon style={{ transform: 'translateY(5px)', fontSize: '30px' }}></CollectionsBookmarkIcon>Payment Guide:</h2>
            <div>
              <div>Step 1: Scan the QR code below with the Internet Banking application to pay.</div>
              <div>Step 2: Enter the description with this format:</div>
              <Typography variant="h6" color="error">[Your User Name] + [Account Email] + [Name Of The Artwork] + [Price]</Typography>
              <div style={{ marginBottom: '5%' }}>Step 3: Screenshot your payment and post it in the button below. </div>
              <CustomizedImageButton
                name="imageFile"
                onChange={handleImageChange}
                fullWidth
              />
              <Button variant='contained' disabled={preview??false}
            </div>
          </div>


        </Box>
        <Box className='inforQR'>
          <div className='imagecontent'>
            <div className='image'>
              <img src={adminQR !== null ?
                `data:image/jpeg;base64,${adminQR}`
                :
                `/images/loadingImages.gif`
              } style={{ width: '350px' }} /></div>
            <h3>Account owner: Artix's Administrator</h3>
          </div>
        </Box>
      </div>


    </Box>
  )
}
