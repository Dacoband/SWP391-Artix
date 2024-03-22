import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { SearchResultsList } from './SearchListUser'
import axios from 'axios';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles'
import TableListUser from './TableListUser';

const Search = styled('div')(({ theme }) => ({
    height:'50px',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    border: '2px solid', // Thêm đường viền
    borderColor: "rgba(0, 0, 0, 0.2)", // Màu của đường viền
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
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
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
     
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      marginTop:'5px',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '100ch', // Thay đổi chiều rộng tại breakpoint 'md'
      },
    },
  }));

export default function ExpandingSearchBarAdmin() {
    
    const [input, setInput] = useState("");
    const [dataCreator, setDataCreator] = useState("");

    
    const fetchCreator = (value) => {
        axios.get(`https://localhost:7233/api/Creator`)
            .then(response => {
                const filteredResults = response.data.filter(user => {
                    return (
                        value &&
                        user &&
                        user.userName &&
                        user.userName.toLowerCase().includes(value.toLowerCase())
                    );
                });
                setDataCreator(filteredResults);
               
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const handleChange = (value) => {
        setInput(value);
        fetchCreator(value);
    };

    const searchBarComponentAdmin = (
        <>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={input} 
                    onChange={(e) =>handleChange(e.target.value) }
                />
            </Search>
        </>
    );

    return (
        <div>
            {searchBarComponentAdmin}
            {(!dataCreator || dataCreator.length === 0) && <TableListUser />}
            {dataCreator && dataCreator.length > 0  && <SearchResultsList dataCreator={dataCreator} />}
        </div>
    );
}
