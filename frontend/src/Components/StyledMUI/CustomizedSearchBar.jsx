import React, { useContext, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { ThemeContext } from "../Themes/ThemeProvider.tsx"
import { SearchResultsList } from '../Users/SearchResultsList.jsx';
import axios from 'axios';
import { Box } from '@mui/material';

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
                width: '50ch', // Expanded width on focus
                
            },
        },
    },
}));


export default function ExpandingSearchBar() {
    const { dark } = useContext(ThemeContext);
        
    // const[input,setInput] = useState("")
    // const [results, setResults] = useState([]);
    // const fetchData =(value)=>{
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //     .then((response) => response.json())
    //     .then((json) => {
    //       const results = json.filter((user) => {
    //         return (
    //           value &&
    //           user &&
    //           user.name &&
    //           user.name.toLowerCase().includes(value)
    //         );
    //       });
    //       setResults(results);
    //       {results && results.length > 0 && <SearchResultsList results={results} />}
    //     });   
    // }

    // const [input, setInput] = useState("");
    // const [results, setResults] = useState([]);

    // const fetchData = (value) => {
    //     // Sử dụng Axios để thực hiện request GET đến API
    //     axios.get("https://jsonplaceholder.typicode.com/users")
    //         .then(response => {
    //             // Lọc kết quả trả về dựa trên giá trị tìm kiếm
    //             const filteredResults = response.data.filter(user => {
    //                 return (
    //                     value &&
    //                     user &&
    //                     user.name &&
    //                     user.name.toLowerCase().includes(value.toLowerCase())
    //                 );
    //             });
    //             // Cập nhật state với kết quả đã lọc
    //             setResults(filteredResults);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }
    // dung de search user
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    // const [showResults, setShowResults] = useState(false); // Trạng thái để kiểm soát việc hiển thị kết quả tìm kiếm

    const fetchData = (value) => {
        console.log(1);
        axios.get(`https://localhost:7233/api/Creator`)
            .then(response => {
                // console.log(response);
                const filteredResults = response.data.filter(user => {
                    return (
                        value &&
                        user &&
                        user.userName &&
                        user.userName.toLowerCase().includes(value.toLowerCase())
                    );
                });
                setResults(filteredResults);
                // setShowResults(true);
    
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
      
    }
    const handleChange = (value) => {
        setInput(value);
        fetchData(value);

      };



    // const handleChange = (value) => {
    //     setInput(value);
    //     if (value.trim() === "") {
    //         setShowResults(false);
    //     } else {
    //         fetchData(value);
    //     }
    // };
    // const handleBlur = () => {
    //     // Ẩn kết quả tìm kiếm khi người dùng nhấp ra khỏi ô tìm kiếm, trừ khi đã bắt đầu nhập lại vào ô
    //     // if (input.trim() === "") {
    //         setShowResults(false);
        
    // };
    // const handleFocus = () => {
    //     // Hiển thị kết quả tìm kiếm khi người dùng nhấp vào ô tìm kiếm
    //     if (input.trim() !== "") {
    //         setShowResults(true);
    //     }
    // };
    const searchBarComponent = (
        // <Box onBlur={handleBlur}
        // onFocus={handleFocus}>
        <>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search'
             }}
                 value={input} 
                 onChange={(e) =>handleChange(e.target.value) }
                 
            />
            {/* bo cho nay */}
            
            {/* // {showResults && results && results.length > 0 && <SearchResultsList results={results} />} */}
        {/* // </Box> */}
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
        // dark? darkMode : lightMode
        <div>
        {dark ? (
            <SearchDarkMode>
                {searchBarComponent}
                {results && results.length > 0 && <SearchResultsList results={results} />}
            </SearchDarkMode>
        ) : (
            <SearchLightMode>
                {searchBarComponent}
                {results && results.length > 0 && <SearchResultsList results={results} />}
            </SearchLightMode>
        )}
       
    </div>


//     <div>
//     {dark ? (
//         <SearchDarkMode>
//             {searchBarComponent}
//             {/* {showResults && results && results.length > 0 && <SearchResultsList results={results} />} */}
//         </SearchDarkMode>
//     ) : (
//         <SearchLightMode>
//             {searchBarComponent}
//             {/* {showResults && results && results.length > 0 && <SearchResultsList results={results} />} */}
//         </SearchLightMode>
//     )}
// </div>
           
)
}