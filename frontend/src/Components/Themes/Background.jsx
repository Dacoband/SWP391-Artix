import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { ThemeContext } from './ThemeProvider.tsx'
export default function Background({children}) {
    const { theme, change, switchImage } = useContext(ThemeContext)
  const [currentIndex, SetIndex] = useState(0)
  var listofimages = theme.backgroundImage;
  useEffect(() => {
    const timeout = setTimeout(() => {
      // eslint-disable-next-line
      if (change) { listofimages = theme.backgroundImage; switchImage(); return () => clearTimeout(timeout) }
      // eslint-disable-next-line
      if (currentIndex === listofimages.length - 1) {
        SetIndex(0);
      }
      else {
        SetIndex(currentIndex + 1);
      }
    }, 6000)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line
  }, [currentIndex, switchImage])
  return (
    <div className="background" style={{ backgroundImage: `url('${listofimages[currentIndex]}')`, transition: theme.transition }}>
        {children}
    </div>
  )
}
