import { Tag } from '../../Interfaces/TagInterface'
import axios from 'axios'


const tagurl = "https://localhost:7233/api/Tag/"
const tagsbyarturl = "https://localhost:7233/api/artworks/"
export async function GetTagList() {
        try{
            let tagList:Tag[] = await axios.get(tagurl).then(response => response.data)
            return tagList
            
        }catch(err){
          console.log(err)
        }
}
export async function GetTagById(id:string) {
    try{
        let tag:Tag = await axios.get(tagurl+id).then(response => response.data)
        return tag
        
    }catch(err){
      console.log(err)
    }
}

export async function GetTagByArtId(id:string) {
  try{
      let tag:Tag[] = await axios.get(tagsbyarturl+id+"/tags").then(response => response.data)
      return tag
      
  }catch(err){
    console.log(err)
  }
}