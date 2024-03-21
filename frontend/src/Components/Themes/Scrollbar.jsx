import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { ThemeContext } from './ThemeProvider.tsx'
export default function Scrollbar({children}) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="custom-scrollbar" 
    style={{ 
    
    
    
    transition: theme.transition }}>
        {children}
    </div>
  )
}
