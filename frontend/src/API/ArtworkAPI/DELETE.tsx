import { Artwork } from '../../Interfaces/ArtworkInterfaces' 
import axios from 'axios'

const arturl = "https://localhost:7233/api/artworks/"
export async function DeleteArtById(id:string) {
    try{
        let artwork = await axios.delete(arturl+id).then(response => response.data)
        return artwork
    }catch(err){
      console.log(err)
    }
  }
  