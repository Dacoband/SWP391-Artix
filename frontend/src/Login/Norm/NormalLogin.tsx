import axios from 'axios'
import React from 'react'
import { Creator } from '../../Interfaces/UserInterface';


const accounturl = 'https://localhost:7233/api/Account'
const creatorurl = 'https://localhost:7233/api/Creator/'
const roleurl = 'https://localhost:7233/api/Role/'

type initialUser = {
  accountID:number,
  roleID:number,
  password: "",
  email: "",
}

type roles = {
  roleID:number,
  roleName:string,
  description:string
}

export function NormalLogin() {
  return (
    <div>NormalLogin</div>
  )
}

export async function CheckLogin(checkAccount:initialUser, storeUserData:any) {
  try {
    const response = await axios.get(accounturl);
    const listOfAccounts = response.data;
    const foundAccount:initialUser = listOfAccounts.find((account: { email: string; password: string }) => account.email === checkAccount.email && account.password === checkAccount.password);
    if (foundAccount) {
      //Get the user roles
      const userroleResponse = await axios.get(roleurl+foundAccount.roleID);
      const userrole:roles = userroleResponse.data;
      //Store the user role in sesison
      sessionStorage.setItem('userRole', userrole.roleName);
       // Once the user is verified, get additional user data.
      const creatorResponse = await axios.get(creatorurl + foundAccount.accountID);
      const creatorData:Creator = creatorResponse.data;
      const creatorWithoutTheImages = {
        ...creatorData,
        profilePicture:'',
        backgroundPicture:''
      }
      storeUserData(creatorWithoutTheImages);
    } else {
      alert("No account found");
    }
  } catch (err) {
    console.log(err);
  }
}