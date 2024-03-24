import axios from 'axios'
import { OrderDetails, OrderHeader } from '../../Interfaces/OrderInterfaces';

const getordernoImageurl = `https://localhost:7233/api/Orders`

const getorderlisturl = `https://localhost:7233/api/OrderDetail/`

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
        let form:OrderDetails[] = await axios.get(getorderlisturl+id).then(response => response.data)
        return form
        
    }catch(err){
      console.log(err)
    }
  }