import React, { useContext } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { ThemeContext } from "../Themes/ThemeProvider.tsx"

const SearchDarkMode = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Use 'rgba' for white with opacity
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.25)', // Increase opacity on hover
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchLightMode = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(169, 169, 169, 0.15)', // Use 'rgba' for white with opacity
    '&:hover': {
        backgroundColor: 'rgba(169, 169, 169, 0.25)', // Increase opacity on hover
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // Vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
            '&:focus': {
                width: '35ch', // Expanded width on focus
            },
        },
    },
}));


export default function ExpandingSearchBar() {
    const { dark } = useContext(ThemeContext);
    const searchBarComponent = (
        <>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
            />
        </>
    )
    const lightMode = (
        <SearchLightMode>
        {searchBarComponent}
        </SearchLightMode>
    )
    const darkMode = (
        <SearchDarkMode>
        {searchBarComponent}
        </SearchDarkMode>
    )

    return (
        dark? darkMode : lightMode
           
)
}