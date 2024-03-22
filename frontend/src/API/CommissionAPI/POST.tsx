import axios from 'axios'
import { CommissionForm } from '../../Interfaces/CommissionForm'

const commissionIdurl = "https://localhost:7233/api/Commission"
const commissionFromCreate = "https://localhost:7233/api/CommissionForm"

const headers = {
    'Content-Type': 'application/json',
    // Optionally, add additional headers such as Authorization if required
    // 'Authorization': 'Bearer your-token',
  };
export async function GetCommissionID() {
    try{
        
        const value = {commissionID:0}
        let id:number = await axios.post(commissionIdurl,value,{headers}).then(response => response.data)
        return id
        
    }catch(err){
      console.log(err)
    }
}

export async function CreateCommissionForm(value:CommissionForm) {
    try{
        let tag:CommissionForm = await axios.post(commissionFromCreate,value,{headers}).then(response => response.data)
        return tag
        
    }catch(err){
      console.log(err)
    }
}
