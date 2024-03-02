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
    const initialArtForm = {
        artworkID,
        creatorID,
        tagID,
        artworkName,
        description: '',
        dateCreated:null,
        Likes:0,
        purchasable:false,
        price:0,
        imageFile: null,
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
        if (name === "imageFile") { 
            // Files is a FileList object, you can grab the first file using indexing if you're accepting single files
            const file = files[0];
            // Now you can set the file to your state, make sure you have a state property to hold it
            setArtForm({ ...artForm, [name]: file });
            console.log(artForm.imageFile)
            blobToBase64(file,function(base64Image){
                setArtForm({...artForm, [name]: base64Image})
                //console.log(base64Image)
            })

        } else {
            const { value } = e.target;
            setArtForm({ ...artForm, [name]: value });
        }
    };
    const handleSwitchChange = (e) => {
        setArtForm({ ...artForm, isPurchasable: e.target.checked });
    };
    const handleTagChange = (event) => {
        const {
            target: { value },
        } = event;
        setArtForm({
            ...artForm,
            tags: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const handleTagDelete = (chipToDelete) => () => {
        setArtForm({
            ...artForm,
            tags: artForm.tags.filter((chip) => chip !== chipToDelete),
        });
    };

    const handlePriceVisibility = () => {
        return artForm.purchasable && (
            <CustomizedTextField
                sx={{margin:'0 0 0 0'}}
                name="price"
                label="Price"
                value={artForm.price}
                onChange={handleInputChange}
            />
        );
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const time = new Date()
        setArtForm({ ...artForm, dateCreated: time.toISOString() });
        //Call the convertion function
        // TODO: Submit your form logic...
        console.log(artForm)

        const url = "https://localhost:7233/api/Artworks";
        axios.post(url,
            {
                artForm
            })
        .then(response => response.data)
        .then(data => {console.log(data)})
        .catch(error => console.log(error))
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
                            name="selectedFile" 
                            type="file"
                            onChange={handleInputChange}
                            fullWidth
                        />
                         {handlePriceVisibility()}
                        <FormControlLabel
                        sx={{color:theme.color,marginLeft:'',float:'right'}}
                            control={
                                <CustomizedSwitch
                                    checked={artForm.isPurchasable}
                                    onChange={handleSwitchChange}
                                    name="isPurchasable"
                                />
                            }
                            label="Is Purchasable?"
                        />
                        <br></br>
                        <CustomizedTextField
                            name="description"
                            label="Description..."
                            value={artForm.description}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={4}
                            style={{width:'50%'}}
                        />
                        <img 
                        style={{border:`solid 1px ${theme.color}`}}
                        className='previewImage' src={artForm.selectedFile} alt="Your New Upload" />
                        <br></br>
                        <FormControl variant='standard' fullWidth style={{marginTop:'2%',width:'50%'}}>
                            <InputLabel><CustomizedTypography variant="body1">Tags</CustomizedTypography></InputLabel>
                            <CustomizedSelect
                                
                                multiple
                                name="tags"
                                value={artForm.tags}
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
                                    <MenuItem key={tag.id} value={tag.nameTag}>
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