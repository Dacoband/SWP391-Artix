import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../../Components/AuthenContext.tsx';

const url = 'https://localhost:7233/api/Account'

const initialUser = {
  accountID: 0,
  roleID: 0,
  password: "",
  email: "",
}

export default function NormalLogin() {
  return (
    <div>NormalLogin</div>
  )
}

export function checkLogin(email, password) {
  const [account, setAccount] = useState(initialUser)
  const [listOfAccounts, setListOfAccounts] = useState([])
  const {storeUserData} = useAuth()
  axios.get(url)
    .then(response => response.data)
    .then(data => { console.log(data); setListOfAccounts(data) })
    .catch(err => console.log(err))
  listOfAccounts.forEach(account => {
    if (account.email === email && account.password === password) {
      setAccount(account)
    }
  }
  )

}
