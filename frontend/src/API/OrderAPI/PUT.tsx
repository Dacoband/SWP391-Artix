import axios from 'axios'
import { OrderDetails, OrderHeader } from '../../Interfaces/OrderInterfaces';

const createorderheaderurl = `https://localhost:7233/api/Orders/`


const headers = {
    'Content-Type': 'application/json',
    // Optionally, add additional headers such as Authorization if required
    // 'Authorization': 'Bearer your-token',
  };

export async function PutOrderHeader(values:OrderHeader,id:string) {
    try{
        let form:OrderHeader = await axios.put(createorderheaderurl+id,values,{headers}).then(response => response.data)
        return form
    }catch(err){
      console.log(err)
    }
  }