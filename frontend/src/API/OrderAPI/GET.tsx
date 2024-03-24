import axios from 'axios'
import { OrderDetails, OrderDetailsExtended, OrderHeader } from '../../Interfaces/OrderInterfaces';

const getordernoImageurl = `https://localhost:7233/api/OrderDetail/GetNotImage`

const getorderlisturl = `https://localhost:7233/api/OrderDetail/`

const orderheaderurlbyid = `https://localhost:7233/api/Order/`

const getorderdetailpaymenturl =`https://localhost:7233/api/OrderDetail/PurchaseConfirmationImage/`

const getextendedorderdetail = `https://localhost:7233/api/OrderDetail/All`

export async function GetOrderDetailListNoImageExtended() {
    
    try{
        let form:OrderDetailsExtended[] = await axios.get(getextendedorderdetail).then(response => response.data)
        return form
    }catch(err){
      console.log(err)
    }
  }

export async function GetOrderDetailListNoImage() {
    
    try{
        let form:OrderDetails[] = await axios.get(getordernoImageurl).then(response => response.data)
        return form
    }catch(err){
      console.log(err)
    }
  }

  export async function GetOrderDetaiPaymentlID(id:string) {
    try{
        let form:string = await axios.get(getorderdetailpaymenturl+id).then(response => response.data)
        return form
        
    }catch(err){
      console.log(err)
    }
  }

export async function GetOrderDetailList() {
    
    try{
        let form:OrderDetails[] = await axios.get(getorderlisturl).then(response => response.data)
        return form
    }catch(err){
      console.log(err)
    }
  }

  export async function GetOrderDetailID(id:string) {
    try{
        let form:OrderDetails = await axios.get(getorderlisturl+id).then(response => response.data)
        return form
        
    }catch(err){
      console.log(err)
    }
  }