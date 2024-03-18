import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Select } from '@mui/material';
import CustomizedButton from '../../StyledMUI/CustomizedButton.tsx';
import { ThemeContext } from '../../Themes/ThemeProvider.tsx';
import CustomizedTextField from '../../StyledMUI/CustomizedTextField.tsx'
import CustomizedSwitch from '../../StyledMUI/CustomizedSwitch.jsx';
import { ListTag } from '../../../share/ListofTag.js'
import CustomizedTypography from '../../StyledMUI/CustomizedTypography.jsx'
import CustomizedSelect from '../../StyledMUI/CustomizedSelect.jsx'
import CustomizedImageButton from '../../StyledMUI/CustomizedImageButton.jsx'
import * as Yup from 'yup';
import { useFormik, FieldArray, FormikProvider } from 'formik'; // useFormik instead of a custom handleChange event
import axios from 'axios';
import {
    FormControlLabel,
    Input,
    InputLabel,
    FormControl,
    Chip,
    MenuItem,
} from '@mui/material';

function UploadArtwork() {
    const { theme } = useContext(ThemeContext)
    const [preview, setPreview] = useState();
    const [blobImage, setBlobImage] = useState();
    const [priceSwitch,setPriceSwitch] = useState(false)
    const [listOfTags, setListOfTags] = useState(ListTag);
    const url = "https://localhost:7233/api/Artworks";

    // Attempt to retrieve the auth state from sessionStorage
  // Check if there's any auth data saved and parse it
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('auth')))
  //nullish coalescing operator (??) 
  
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
    
 
    const handleSwitchChange = (e) => {
        setPriceSwitch(e.target.checked)
        formik.values.purchasable = priceSwitch
    };

    const handlePriceVisibility = () => {
        return priceSwitch && (
            <div className='priceField'>
                <CustomizedTextField
                    sx={{ float: 'right' }}
                    name="price"
                    label="Price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    fullWidth
                />
            </div>
        );
    };

  

    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: false,
        enableReinitialize: true,
        initialValues: {
            artworkID: 0,
            creatorID: user.creatorID, //CHANGE THE CREATOR ID 
            artworkName: "",
            description: "",
            dateCreated: "",
            likes: 0,
            purchasable: false,
            price: 0,
            imageFile: preview,
            artworkTag: [ {
                artworkTagID: 0,
                artworkID: 0,
                tagID: 1
              },]
        },
        onSubmit: (values) => {
            const time = new Date()
            values.dateCreated = time.toISOString()
            values.imageFile = preview.split(',')[1]; 
            values.purchasable = priceSwitch
            // Split Data URL Base64 (data:image/jpeg,base64) => (base64)
            console.log(values)
            axios.post(url, values)
                .then(response => response.data)
                .then(data => console.log("Post Artwork Complete!"+data))
                .catch(err => console.error(err))

        },
        validationSchema: Yup.object({
            artworkName: Yup.string().required("NAME! I want a name! Please..."),
            description: Yup.string().required("What? Tell me more about your work."),
            imageFile: Yup.mixed().required("Where the image, mate?"),
        }),
    })
    return (
        <>

            <div className='form'>
                <div className='userInfoForm' style={{ backgroundColor: `rgba(${theme.rgbBackgroundColor},0.95)` }}>
                    <form onSubmit={formik.handleSubmit}>
                        <CustomizedTypography variant="h4" component="h2" gutterBottom>
                            Share Us Your Creation
                        </CustomizedTypography>

                        <CustomizedImageButton
                            name="imageFile"
                            type="file"
                            onChange={handleImageChange}
                            fullWidth
                        />

                        {formik.errors.imageFile && (<Typography variant="body2" color="red">{formik.errors.imageFile}</Typography>)}
                        <div className='allFieldForm'>
                            <Box className="textFieldBox">
                                <div className='artTextField' style={{ marginBottom: '2%' }}>
                                    <CustomizedTextField
                                        name="artworkName"
                                        label="Give Your Amazing Art A Name"
                                        value={formik.values.artworkName}
                                        onChange={formik.handleChange}
                                        fullWidth
                                    />
                                    {formik.errors.artworkName && (<Typography variant="body2" color="red">{formik.errors.artworkName}</Typography>)}
                                </div>
                                <div className='artTextField'>
                                    <CustomizedTextField
                                        name="description"
                                        label="Description Of Your Art"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        multiline
                                        fullWidth
                                        rows={4}
                                    />
                                    {formik.errors.description && (<Typography variant="body2" color="red">{formik.errors.description}</Typography>)}
                                </div>
                            </Box>
                            <Box className="priceBox"
                                sx={{
                                    backgroundColor: theme.backgroundColor,
                                    borderColor: theme.color
                                }}
                            >
                                <FormControlLabel
                                    sx={{ color: theme.color, marginBottom: '10%' }}
                                    control={
                                        <CustomizedSwitch
                                            checked={priceSwitch}
                                            onChange={(event)=>handleSwitchChange(event)}
                                            name="purchasable"
                                        />
                                    }
                                    label="Is Purchasable?"
                                />
                                {handlePriceVisibility()}
                            </Box>

                        </div>
                        <Box className="tagAndpreviewBox">
                            <FormikProvider value={formik}
                            //Formik Fields requires you to provide a context with FormikProvider with the difined 'formik' as value
                            >
                                <div className='tagField' >
                                    <FieldArray
                                        name="artworkTag"
                                        render={arrayHelpers => (
                                            <>
                                                {formik.values.artworkTag.map((tag, index) => (
                                                    <div key={index}>
                                                        <Select
                                                            name={`artworkTag.${index}.tagID`}
                                                            value={tag.tagID}
                                                            onChange={formik.handleChange}
                                                        >
                                                            {listOfTags.map((tag) => {
                                                                return (
                                                                    <MenuItem 
                                                                        key={tag.id} value={tag.id}>
                                                                        {tag.nameTag}
                                                                    </MenuItem>
                                                                )
                                                            })}

                                                        </Select>
                                                        <CustomizedButton
                                                          
                                                            onClick={() => arrayHelpers.remove(index)}
                                                        >
                                                            Remove
                                                        </CustomizedButton>
                                                    </div>
                                                ))}
                                                <CustomizedButton
                                                   
                                                    onClick={() => {
                                                        arrayHelpers.push({  artworkTagID: 0,
                                                        artworkID: 0,
                                                        tagID: 1 });
                                                        }
                                                    }>
                                                    Add a Tag
                                                </CustomizedButton>
                                            </>
                                        )}
                                    />
                                </div>
                            </FormikProvider>
                            <div className='imageBox'>
                                <Typography variant="h6"
                                    color={theme.color}
                                    sx={{ textAlign: 'right' }}
                                >
                                    Preview Image</Typography>
                                <img
                                    style={{
                                        border: `solid 1px ${theme.color}`,
                                        backgroundColor: theme.backgroundColor
                                    }}
                                    className='previewImage' src={preview} alt="Preview Here!" />
                            </div>
                        </Box>
                        <CustomizedButton sx={{ 
                            display: 'block', width: '50%', margin: 'auto', marginTop: '5vh' }} variant="contained" type="submit">
                            Welcome To The Wolrd!
                        </CustomizedButton>
                    </form>
                </div>
            </div>
        </>
    );
}
export default UploadArtwork;