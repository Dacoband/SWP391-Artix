import React, { useState, useContext } from 'react';
import CustomizedButton from '../../StyledMUI/CustomizedButton.tsx';
import { ThemeContext } from '../../Themes/ThemeProvider.tsx';
import CustomizedTextField from '../../StyledMUI/CustomizedTextField.tsx'
import CustomizedSwitch from '../../StyledMUI/CustomizedSwitch.jsx';
import { ListTag } from '../../../share/ListofTag.js'
import {
    TextField,
    FormControlLabel,
    Select,
    Input,
    InputLabel,
    FormControl,
    Chip,
    MenuItem
} from '@mui/material';
function UploadArtwork() {
    const { theme } = useContext(ThemeContext)
    const initialArtForm = {
        selectedFile: null,
        description: '',
        category: '',
        tags: [],
        createdtime: '',
        isPurchasable: false,
        price: '',
    };

    const [artForm, setArtForm] = useState(initialArtForm)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArtForm({ ...artForm, [name]: value });
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
        return artForm.isPurchasable && (
            <TextField
                name="price"
                label="Price"
                value={artForm.price}
                onChange={handleInputChange}
            />
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setArtForm({ ...artForm, createdtime: new Date().toISOString() });
        // Submit your form logic...
    };

    return (
        <div className='form'>
            <div className='userInfoForm' style={{ backgroundColor: `rgba(${theme.rgbBackgroundColor},0.9)` }}>
                <form onSubmit={handleSubmit}>
                    <CustomizedTextField
                        type="file"
                        inputProps={{ accept: ".png,.jpeg,.jpg,.tiff,.gif" }}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <CustomizedTextField
                        name="description"
                        label="Description"
                        value={artForm.description}
                        onChange={handleInputChange}
                        fullWidth
                        multiline
                        rows={4}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Tags</InputLabel>
                        <Select
                            multiple
                            name="tags"
                            value={artForm.tags}
                            onChange={handleTagChange}
                            input={<Input id="select-multiple-tags" />}
                            renderValue={(selected) => (
                                <div>
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
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <CustomizedSwitch
                                checked={artForm.isPurchasable}
                                onChange={handleSwitchChange}
                                name="isPurchasable"
                            />
                        }
                        label="Is Purchasable?"
                    />
                    {handlePriceVisibility()}
                    <CustomizedButton variant="contained" type="submit">
                        Upload Image
                    </CustomizedButton>
                </form>
            </div>
        </div>
    );
}
export default UploadArtwork;