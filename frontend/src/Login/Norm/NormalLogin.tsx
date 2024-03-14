import axios from 'axios'
import React from 'react'


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

export async function CheckLogin(checkAccount:initialUser, setRole:any, storeUserData:any) {
  try {
    const response = await axios.get(accounturl);
    const listOfAccounts = response.data;
    console.log(listOfAccounts);
    const foundAccount:initialUser = listOfAccounts.find((account: { email: string; password: string }) => account.email === checkAccount.email && account.password === checkAccount.password);
    if (foundAccount) {
      //Get the user roles
      const userroleResponse = await axios.get(roleurl+foundAccount.roleID);
      const userrole:roles = userroleResponse.data;
      setRole(userrole)
      //Store the user role in sesison
      sessionStorage.setItem('userRole', userrole.roleName);
       // Once the user is verified, get additional user data.
      const creatorResponse = await axios.get(creatorurl + foundAccount.accountID);
      const creatorData = creatorResponse.data;
      console.log(creatorData);
      storeUserData(creatorData);
    } else {
      alert("No account found");
    }
  } catch (err) {
    console.log(err);
  }
}