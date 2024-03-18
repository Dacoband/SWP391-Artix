import React, {useState,useEffect} from 'react'


//type Theme =  string
const lightimages = [
  "/sliderImages/day1.png",
  "/sliderImages/day2.png",
  "/sliderImages/day3.png",
  "/sliderImages/day4.png",
  ]
const darkimages = [
  "/sliderImages/night1.png",
  "/sliderImages/night2.png",
  "/sliderImages/night3.png",
  "/sliderImages/night4.png",
  ]
// public folder is in the same order as the src. 
//To import images from public: started the path from inside the public folder.
// ex: /<imagefolder>/image.png
const Theme = {
  light:{
    color2:'#0096FA',
    color:'#0096FA',
    backgroundColor:'#FFF',
    rgbBackgroundColor:"255, 255, 255",
    backgroundImage: lightimages,
    transition: "all 1s ease-in-out",

    borderColor:"cyan",
    hoverBackgroundColor:"#F5F5F5",
  },
  dark:{
    color2:'#EBEBEB',
    color:'#61dafb',
    backgroundColor:'#1a1a2e',
    rgbBackgroundColor:"26, 26, 46",
    backgroundImage: darkimages,
    transition: "all 1s ease-in-out",
    borderColor:"red",
    hoverBackgroundColor:"#302e4d",

  },
}

const initialState = {
  dark: false,
  theme: Theme.light,
  toggleTheme: () => {},
}

const ThemeContext = React.createContext(initialState);

function ThemeProvider({children}) {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme !== null ? JSON.parse(savedTheme) : false;
  };
  const [dark, SetDark] = useState(getInitialTheme); // Now we get state from function
  useEffect(() => {
    // Update local storage when the theme changes
    localStorage.setItem('isDarkMode', JSON.stringify(dark));
  }, [dark]);
  const toggleTheme = () => {
    SetDark(prevDark => !prevDark); // Toggles dark mode without a separate state change
  }
  const theme = dark ? Theme.dark : Theme.light
  return (
    <ThemeContext.Provider value={{theme,dark,toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}


export {ThemeContext,ThemeProvider}