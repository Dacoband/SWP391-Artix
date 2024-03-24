import axios from 'axios'
import { Payment } from "../../Interfaces/PaymentIntrerfaces";

const paymenturl="https://localhost:7233/api/Payment"
const headers = {
    'Content-Type': 'application/json',
    // Optionally, add additional headers such as Authorization if required
    // 'Authorization': 'Bearer your-token',
  };
  export async function PostPayment(value:Payment) {
    try{
        let response = await axios.post(paymenturl,value,{headers}).then(response => response.data)
        return response
        
    }catch(err){
      console.log(err)
    }}