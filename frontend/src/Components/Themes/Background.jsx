import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { ThemeContext } from './ThemeProvider.tsx'
export default function Background({children}) {
  const { theme } = useContext(ThemeContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const listofimages = theme.backgroundImage;
  useEffect(() => {
    const timeout = setTimeout(() => {
        setCurrentIndex(
          prevIndex => (prevIndex === listofimages.length - 1 ? 0 : prevIndex + 1)
        );
    }, 6000);

    return () => clearTimeout(timeout);
  },);

  return (
    <div className="background" style={{ backgroundImage: `url('${listofimages[currentIndex]}')`, transition: theme.transition }}>
        {children}
    </div>
  )
}
