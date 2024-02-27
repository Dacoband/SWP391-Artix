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

  },
  dark:{
    color:'#61dafb',
    backgroundColor:'#1a1a2e',
    backgroundImage: darkimages,
    transition: "all 1s ease-in-out",
  },
}

const initialState = {
  dark: false,
  theme: Theme.light,
  change: false,
  toggleTheme: () => {},
  switchImage: () => {},
}

const ThemeContext = React.createContext(initialState);

function ThemeProvider({children}) {
  const [dark,SetDark] = useState(false)
  const [change,SetChange] = useState(false)
  const toggleTheme = () => {
    !dark ? SetDark(true) : SetDark(false)
    SetChange(true)
  }
  const switchImage = () =>{
    SetChange(false)
  }
  const theme = dark ? Theme.dark : Theme.light
  return (
    <ThemeContext.Provider value={{theme,dark,change,toggleTheme,switchImage}}>
      {children}
    </ThemeContext.Provider>
  )
}


export {ThemeContext,ThemeProvider}