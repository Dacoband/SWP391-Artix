
import { Artwork } from '../../Interfaces/ArtworkInterfaces' 
import axios from 'axios'


const arturl = "https://localhost:7233/api/artworks/"
const top10arturl = `https://localhost:7233/api/artworks/Top10Liked`
const random10arturl = `https://localhost:7233/api/artworks/random11`

export async function GetArtList() {
        try{
            let artList:Artwork[] = await axios.get(arturl).then(response => response.data)
            return artList
            
        }catch(err){
          console.log(err)
        }
}

export async function GetTop10Arts() {
  try{
      let artList:Artwork[] = await axios.get(top10arturl).then(response => response.data)
      return artList
      
  }catch(err){
    console.log(err)
  }
}

export async function GetRandom10Arts() {
  try{
      let artList:Artwork[] = await axios.get(random10arturl).then(response => response.data)
      return artList
      
  }catch(err){
    console.log(err)
  }
}


export async function GetArtListById(id:string) {
  try{
      let artwork:Artwork[] = await axios.get(arturl+id).then(response => response.data)
      return artwork
  }catch(err){
    console.log(err)
  }
}