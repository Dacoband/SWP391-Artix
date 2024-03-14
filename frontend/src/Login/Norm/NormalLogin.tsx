import axios from 'axios'
import React from 'react'


const accounturl = 'https://localhost:7233/api/Account'
const creatorurl = 'https://localhost:7233/api/Creator/'

type initialUser = {
  password: "",
  email: "",
}

export function NormalLogin() {
  return (
    <div>NormalLogin</div>
  )
}

export async function CheckLogin(checkAccount:initialUser, setAccount:any, storeUserData:any) {
  try {
    const response = await axios.get(accounturl);
    const listOfAccounts = response.data;
    console.log(listOfAccounts);
    const foundAccount = listOfAccounts.find(account => account.email === checkAccount.email && account.password === checkAccount.password);
    if (foundAccount) {
      setAccount(foundAccount);
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