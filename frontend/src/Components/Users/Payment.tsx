import CustomizedImageButton from '../StyledMUI/CustomizedImageButton.jsx'
import '../../css/Payment.css'
import { ThemeContext } from '../Themes/ThemeProvider.tsx';
import Box from '@mui/material/Box';
import React, { useContext, useEffect, useState } from 'react'
import AddCardIcon from '@mui/icons-material/AddCard';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography'
import { GetPaymentAdmin } from '../../API/PaymentAPI/GET.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { GetArtByIdNoImage } from '../../API/ArtworkAPI/GET.tsx';
import { GetCreatorByID } from '../../API/UserAPI/GET.tsx';
import { Artwork } from '../../Interfaces/ArtworkInterfaces.ts';
import { Creator } from '../../Interfaces/UserInterface.ts';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { OrderDetails, OrderHeader } from '../../Interfaces/OrderInterfaces.ts';
import { PostOrderDetail, PostOrderHeader } from '../../API/OrderAPI/POST.tsx';
export default function Payment() {
  const { theme } = useContext(ThemeContext)
  const savedAuth = sessionStorage.getItem('auth');
  // Check if there's any auth data saved and parse it
  const user:Creator = savedAuth ? JSON.parse(savedAuth) : null;
  // Now 'auth' contains your authentication state or null if there's nothing saved
  const { id } = useParams();
  const [preview, setPreview] = useState<string | null | undefined>(null);
  const [adminQR, setAdminQR] = useState<String | null | undefined>(null);
  const [artwork, setArtwork] = useState<Artwork>()
  const [creator, setCreator] = useState<Creator>()
  const [loading, setLoading] = useState(false)
  const [sendCompleted, setSendCompleted] = useState(false)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    // Ignore close events from clicking away
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    if (sendCompleted) {
      navigate(`../artwork/${id}`)
    }
  };

  useEffect(() => {
    const getAdminQR = async () => {
      let qr: string | null | undefined = await GetPaymentAdmin()
      setAdminQR(qr)
    }
    const getArtWork = async () => {
      const artwork = await GetArtByIdNoImage(id ? id : "1");
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

  const handleSubmit = async () => {
    setLoading(true)
    try {
      let orderHeader: OrderHeader = {
        orderID: '0',
        sellerID: creator?.creatorID,
        buyerID:user.creatorID,
        confirmation: false
      }
      const order = await PostOrderHeader(orderHeader)

      let orderDetail: OrderDetails = {
        orderDetailID: '0',
        orderID: order?.orderID,
        artWorkID: artwork?.artworkID,
        dateOfPurchase: undefined,
        price: artwork?.price,
        purchaseConfirmationImage: preview
      }
      const response = await PostOrderDetail(orderDetail)
      console.log("Order Submission Complete!" + response)
      setLoading(false)
      setSendCompleted(true)
      setOpen(true)
    } catch (error) {
      console.error('Error: ', error);
      setLoading(false)
    }
  }



  return (
    <Box className='box'
      sx={{
        color: theme.color,
        backgroundColor: `rgba(${theme.rgbBackgroundColor},0.97)`,
        transition: theme.transition,
        width: '90%',
        margin: 'auto',
        borderRadius: '5px',
        marginBottom: '15px',
        minHeight: '900px'
      }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 100 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              <Button onClick={handleSubmit} variant='contained' color='error' disabled={loading || !preview}>Submit Payment</Button>
            </div>
          </div>
        </Box>
        <Box className='inforQR'>
          <div className='imagecontent'>
            <div className='image' style={{ marginLeft: "15%" }}>
              {preview && (<img src={`${preview}`} style={{ width: '300px', height: "400px", margin: "1% 1% 1% 1%" }} />)}
              <img src={adminQR !== null ?
                `data:image/jpeg;base64,${adminQR}`
                :
                `/images/loadingImages.gif`
              } style={{ width: '300px', height: "400px", margin: "1% 1% 1% 1%" }} />
            </div>
            <h3>Account owner: Artix's Administrator</h3>
          </div>
        </Box>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={sendCompleted ? "success" : "error"} sx={{ width: '100%' }}>
          {sendCompleted ? "Your form has been submitted successfully!" : "Sending Form Failed!"}
        </Alert>
      </Snackbar>
    </Box>
  )
}
