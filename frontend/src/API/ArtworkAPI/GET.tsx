import React, { useEffect, useState } from 'react'
import { Artwork } from '../../Interfaces/ArtworkInterfaces' 
import axios from 'axios'


const arturl = "https://localhost:7233/api/Artworks"
export async function GetArtList() {
        try{
            let artList:Artwork[] = await axios.get(arturl).then(response => response.data)
            return artList
            
        }catch(err){
          console.log(err)
        }
}