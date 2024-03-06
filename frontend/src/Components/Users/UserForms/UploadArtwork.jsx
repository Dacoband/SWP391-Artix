import React, { useState, useContext } from 'react';
import CustomizedButton from '../../StyledMUI/CustomizedButton.tsx';
import { ThemeContext } from '../../Themes/ThemeProvider.tsx';
import CustomizedTextField from '../../StyledMUI/CustomizedTextField.tsx'
import CustomizedSwitch from '../../StyledMUI/CustomizedSwitch.jsx';
import { ListTag } from '../../../share/ListofTag.js'
import CustomizedTypography from '../../StyledMUI/CustomizedTypography.jsx'
import CustomizedSelect from '../../StyledMUI/CustomizedSelect.jsx'
import CustomizedImageButton from '../../StyledMUI/CustomizedImageButton.jsx'
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
    const [preview,setPreview] = useState();
    const initialArtForm = {
        ArtworkID:0,
        CreatorID:1,
        TagID:[], //TODO Fix TagID array Maybe another POST to TagID DB
        ArtworkName:'',
        Description: '',
        DateCreated:'',
        Likes:0,
        Purchasable:false,
        Price:0,
        ImageFile: null,
    };
    const axiosConfig = {
        headers: {
          'Content-Type': 'application/json', // Make sure the content type matches what the server expects
        },
      };
    const [artForm, setArtForm] = useState(initialArtForm)

     //Covert Blob to Base64 string to easily view the image
     function blobToBase64(blob, callback) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
          const base64data = reader.result;   
          callback(base64data);
        };
      }

    const handleInputChange = (e) => {
        const { name, files } = e.target;
        if (name === "ImageFile") { 
            // Files is a FileList object, you can grab the first file using indexing if you're accepting single files
            const file = files[0];
            // Now you can set the file to your state, make sure you have a state property to hold it
            setArtForm({ ...artForm, [name]: file });
            //console.log(artForm.imageFile)
            blobToBase64(file,function(base64Image){
                setPreview(base64Image)
                //console.log(base64Image)
            })

        } else {
            const { value } = e.target;
            setArtForm({ ...artForm, [name]: value });
        }
    };
    const handleSwitchChange = (e) => {
        setArtForm({ ...artForm, Purchasable: e.target.checked });
    };
    const handleTagChange = (event) => {
        const {
            target: { value },
        } = event;
        setArtForm({
            ...artForm,
            TagID: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const handleTagDelete = (chipToDelete) => () => {
        setArtForm({
            ...artForm,
            TagID: artForm.tags.filter((chip) => chip !== chipToDelete),
        });
    };

    const handlePriceVisibility = () => {
        return artForm.Purchasable && (
            <CustomizedTextField
                sx={{margin:'0 0 0 0'}}
                name="Price"
                label="Price"
                value={artForm.Price}
                onChange={handleInputChange}
            />
        );
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const time = new Date()
        setArtForm({ ...artForm, DateCreated: time.toISOString() });
        //Call the convertion function
        // TODO: Submit your form logic...
        console.log(artForm)
        //Using FromData instead of normally fetching using Axios
            event.preventDefault();
            const formData = new FormData();
            // Append the standard text fields
            formData.append('ArtworkID', artForm.ArtworkID);
            formData.append('CreatorID', artForm.CreatorID);
            formData.append('TagID', artForm.TagID); // Make sure this is the format your backend expects. ARRAY OF TAG IS WRONG
            formData.append('ArtworkName', artForm.ArtworkName);
            formData.append('Description', artForm.Description);
            formData.append('DateCreated', artForm.DateCreated); 
            formData.append('Likes', artForm.Likes);
            formData.append('Purchasable', artForm.Purchasable);
            formData.append('Price', artForm.Purchasable ? artForm.Price : 0); // Conditional based on Purchasable
            // Append the file if it exists
            if (artForm.ImageFile) {
                formData.append('ImageFile', artForm.ImageFile);
            }
            const url = "https://localhost:7233/api/Artworks";
            // Send formData without axiosConfig for Content-Type
            axios.post(url, formData)
            .then(response => {
                console.log("Upload successful!", response.data);
            })
            .catch(error => {
                console.error("Upload failed.", error);
            });
    };

    

    return (
        <>
            <div className='form'>
                <div className='userInfoForm' style={{ backgroundColor: `rgba(${theme.rgbBackgroundColor},0.9)` }}>
                    <form onSubmit={handleSubmit}>
                        <CustomizedTypography variant="h4" component="h2" gutterBottom>
                            Share Us Your Creation
                        </CustomizedTypography>

                        <CustomizedImageButton
                            name="ImageFile" 
                            type="file"
                            onChange={handleInputChange}
                            fullWidth
                        />
                         {handlePriceVisibility()}
                        <FormControlLabel
                        sx={{color:theme.color,marginLeft:'',float:'right'}}
                            control={
                                <CustomizedSwitch
                                    checked={artForm.Purchasable}
                                    onChange={handleSwitchChange}
                                    name="Purchasable"
                                />
                            }
                            label="Is Purchasable?"
                        />
                        <br></br>
                        <CustomizedTextField
                            name="ArtworkName"
                            label="Give Your Amazing Art A Name"
                            value={artForm.ArtworkName}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={4}
                            style={{width:'50%'}}
                        />
                        <CustomizedTextField
                            name="Description"
                            label="Description..."
                            value={artForm.Description}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={4}
                            style={{width:'50%'}}
                        />
                        <img 
                        style={{border:`solid 1px ${theme.color}`}}
                        className='previewImage' src={preview} alt="Your New Upload" />
                        <br></br>
                        <FormControl variant='standard' fullWidth style={{marginTop:'2%',width:'50%'}}>
                            <InputLabel><CustomizedTypography variant="body1">Tags</CustomizedTypography></InputLabel>
                            <CustomizedSelect
                                multiple
                                name="tagID"
                                value={artForm.TagID}
                                onChange={handleTagChange}
                                input={<Input id="select-multiple-tags" />}
                                renderValue={(selected) => (
                                    <div className="tagHolder">
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} onDelete={handleTagDelete(value)} />
                                        ))}
                                    </div>
                                )}
                            >
                                {/* Here you can map over your tags to create MenuItem components */}
                                {ListTag.map((tag) => (
                                    <MenuItem key={tag.id} value={tag.id}>
                                        {tag.nameTag}
                                    </MenuItem>
                                ))}
                            </CustomizedSelect>
                        </FormControl>
                        <CustomizedButton sx={{display:'block',width:'50%',margin:'auto',marginTop:'10vw'}} variant="contained" type="submit">
                            Welcome To The Wolrd!
                        </CustomizedButton>
                    </form>
                </div>
            </div>
        </>
    );
}
export default UploadArtwork;