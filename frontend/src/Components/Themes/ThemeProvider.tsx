import React, {useState} from 'react'
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
    color:'#0096FA',
    backgroundColor:'#FFF',
    backgroundImage: lightimages,
    transition: "all 1s ease-in-out",
    borderColor:"cyan",
  },
  dark:{
    color:'#61dafb',
    backgroundColor:'#1a1a2e',
    backgroundImage: darkimages,
    transition: "all 1s ease-in-out",
    borderColor:"red",
  },
}

const initialState = {
  dark: false,
  theme: Theme.light,
  toggleTheme: () => {},
}

const ThemeContext = React.createContext(initialState);

function ThemeProvider({children}) {
  const [dark,SetDark] = useState(false)
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