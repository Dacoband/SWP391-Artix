import React, { useEffect, useState } from 'react'
import { Creator } from '../../Interfaces/UserInterface.tsx'
import axios from 'axios'


const creatorurl = 'https://localhost:7233/api/Creator/'


export async function GetCreatorList() {
  try{
      let creatorList:Creator[] = await axios.get(creatorurl).then(response => response.data)
      return creatorList
      
  }catch(err){
    console.log(err)
  }
}

export async function GetCreatorByAccountID(accountId:string) {
  try{
      let creator:Creator = await axios.get(creatorurl+accountId).then(response => response.data)
      return creator
      
  }catch(err){
    console.log(err)
  }
}

export async function GetCreatorByID(creatorId:string) {
  try{
      let creator:Creator = await axios.get(creatorurl+`ById/${creatorId}`).then(response => response.data)
      return creator
      
  }catch(err){
    console.log(err)
  }
}