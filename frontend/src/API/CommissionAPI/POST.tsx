import axios from 'axios'
import { CommissionForm } from '../../Interfaces/CommissionForm'

const commissionIdurl = "https://localhost:7233/api/Commission"
const commissionFromCreate = "https://localhost:7233/api/CommissionForm"

export async function GetCommissionID() {
    try{
        let id:number = await axios.post(commissionIdurl).then(response => response.data)
        return id
        
    }catch(err){
      console.log(err)
    }
}

export async function GetTagById(id:string) {
    try{
        let tag:CommissionForm = await axios.post(commissionFromCreate).then(response => response.data)
        return tag
        
    }catch(err){
      console.log(err)
    }
}
