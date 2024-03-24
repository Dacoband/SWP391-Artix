import React, { useEffect, useState } from 'react'
import { Account, Creator } from '../../Interfaces/UserInterface.tsx'
import axios from 'axios'


const creatorurl = 'https://localhost:7233/api/Creator/'
const creatonobackgroundimageurl = `https://localhost:7233/api/Creator/NotBackground`
const accountemailurl = 'https://localhost:7233/api/Account/email/'
const countcreatorurl = "https://localhost:7233/api/Creator/CountCreators"
const creatorvipstatusurl = `https://localhost:7233/api/Creator/GetID/UserName/Vip`
const gettotalartworklikesbycreatorurl = `https://localhost:7233/api/artworks/total-likes/`

export async function GetTotalLikeByCreatorID(id:string|number) {
  try{
      let total:number = await axios.get(gettotalartworklikesbycreatorurl+id).then(response => response.data)
      return total
      
  }catch(err){
    console.log(err)
  }
}

export async function GetCreatorListNoImage() {
  try{
      let creatorList:Creator[] = await axios.get(creatorvipstatusurl).then(response => response.data)
      return creatorList
      
  }catch(err){
    console.log(err)
  }
}

export async function GetCreatorListNoBackground() {
  try{
      let creatorList:Creator[] = await axios.get(creatorurl).then(response => response.data)
      return creatorList
      
  }catch(err){
    console.log(err)
  }
}

export async function GetCreatorListCount() {
  try{
      let creatorList:Creator[] = await axios.get(creatonobackgroundimageurl).then(response => response.data)
      return creatorList
      
  }catch(err){
    console.log(err)
  }
}

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

export async function GetAccountByEmail(email:string) {
  try{
      let account:Account = await axios.get(accountemailurl+`${email}`).then(response => response.data)
      return account
      
  }catch(err){
    console.log(err)
  }
}