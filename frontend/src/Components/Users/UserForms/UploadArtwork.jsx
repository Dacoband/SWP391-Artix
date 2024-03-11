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
    const url = "https://localhost:7233/api/Artworks";

    const initialArtForm = {
        ArtworkID: 0,
        CreatorID: 1,
        TagID: [], //TODO Fix TagID array Maybe another POST to TagID DB
        ArtworkName: '',
        Description: '',
        DateCreated: '',
        Likes: 0,
        Purchasable: false,
        Price: 0,
        ImageFile: null,
    };

    const [artForm, setArtForm] = useState(initialArtForm)
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
        setArtForm({ ...artForm, Purchasable: e.target.checked });
    };


    const artworkTags = [];
    const [artTags, SetArtTags] = useState(artworkTags)

    const handleTagChange = (event) => {
        // Flat array of selected options (tag IDs).
        const { value } = event.target;
        // Ensure we're working with a flat array.
        // If value is incorrectly nested, you can flatten it like this:
        const flatValues = value.flat(); // Use Array.prototype.flat() to flatten the array.
        // Update your state to set the selected tags.
        // This will depend on how you're storing these IDs in your state.

        const selectedTagID = flatValues; // The ID of the selected tag
        console.log(event.target.value)
        // Check if the tag is already selected
        if (!artTags.some(tag => tag.tagID === selectedTagID)) {
            const newArtworkTag = {
                artworkTagID: 0, // Replace with a function/way to generate a new ID
                artworkID: 0, // Replace with the current artwork's ID
                tagID: selectedTagID
            };
            // Add the new tag to the existing tags
            SetArtTags([...artTags, newArtworkTag]);
        }
    };

    const handlePriceVisibility = () => {
        return artForm.Purchasable && (
            <div className='priceField'>
                <CustomizedTextField
                    sx={{ float: 'right' }}
                    name="price"
                    label="Price"
                    value={artForm.Price}
                    onChange={formik.handleChange}
                    fullWidth
                />
            </div>
        );
    };
    useEffect(() => {
        console.log('Updated artTags:', artTags);
    }, [artTags]); // Only re-run the effect if artTags changes


    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: true,
        enableReinitialize: true,
        initialValues: {
            artworkID: 0,
            creatorID: 0,
            artworkName: "",
            description: "",
            dateCreated: "",
            likes: 0,
            purchasable: false,
            price: 0,
            imageFile: preview,
            artworkTag: [ {
                "artworkTagID": 0,
                "artworkID": 0,
                "tagID": 0
              },]
        },
        onSubmit: (values) => {
            const time = new Date()
            values.dateCreated = time.toISOString()
            values.imageFile = blobImage.split(',')[1]; 
            // Split Data URL Base64 (data:image/jpeg,base64) => (base64)
            values.price = artForm.Price
            values.purchasable = artForm.Purchasable
            axios.post(url, values)
                .then(response => response.data)
                .then(data => console.log(data))
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
                                        value={artForm.ArtworkName}
                                        onChange={formik.handleChange}
                                        fullWidth
                                    />
                                    {formik.errors.artworkName && (<Typography variant="body2" color="red">{formik.errors.artworkName}</Typography>)}
                                </div>
                                <div className='artTextField'>
                                    <CustomizedTextField
                                        name="description"
                                        label="Description Of Your Art"
                                        value={artForm.Description}
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
                                            checked={artForm.Purchasable}
                                            onChange={handleSwitchChange}
                                            name="Purchasable"
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
                                                            onBlur={formik.handleBlur}
                                                        >
                                                            {ListTag.map((tag) => {
                                                                return (
                                                                    <MenuItem
                                                                        key={tag.id} value={tag.id}>
                                                                        {tag.nameTag}
                                                                    </MenuItem>
                                                                )
                                                            })}

                                                        </Select>
                                                        <CustomizedButton
                                                            type="button"
                                                            onClick={() => arrayHelpers.remove(index)}
                                                        >
                                                            Remove
                                                        </CustomizedButton>
                                                    </div>
                                                ))}
                                                <CustomizedButton
                                                    type="button"
                                                    onClick={() => arrayHelpers.push({ tagID: '' })}
                                                >
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