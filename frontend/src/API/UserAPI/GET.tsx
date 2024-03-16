import React, { useEffect, useState } from 'react'
import { Creator } from '../../Interfaces/UserInterface.tsx'
import axios from 'axios'


const creatorurl = 'https://localhost:7233/api/Creator/'
export function GetUserList() {
  const [creatorList, setCreatorList] = useState<Creator[]>([])
    useEffect(() =>{
      const getUserList = async () =>{
        try{
          const list = await axios.get(creatorurl).then(response => response.data)
          setCreatorList(list)
        }catch(err){
          console.log(err)
        }
      }
     getUserList()
    },[])
  return (
    creatorList
  )
}

export function GetUserById(id:string) {
  const [creator, setCreator] = useState<Creator>()
  useEffect(() =>{
    const getUserList = async () =>{
      try{
        const artist = await axios.get(creatorurl+id).then(response => response.data)
        setCreator(artist)
      }catch(err){
        console.log(err)
      }
    }
   getUserList()
  },[])
return (
  creator
)
  }
  