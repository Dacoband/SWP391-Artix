import { Payment } from "../../Interfaces/PaymentIntrerfaces";
import axios from 'axios'

const getpaymentadminurl="https://localhost:7233/api/Payment/admin-qr"
const getpaymentaccounturl=`https://localhost:7233/api/Payment/account-qr/`

export async function GetPaymentAdmin() {
    try{
        let form:string|null = await axios.get(getpaymentadminurl).then(response => response.data)
        return form
    }catch(err){
      console.log(err)
    }
  }
  export async function GetPaymentAccount(id:string) {
    try{
        let form:Payment = await axios.get(getpaymentaccounturl+id).then(response => response.data)
        return form
        
    }catch(err){
      console.log(err)
    }
  }