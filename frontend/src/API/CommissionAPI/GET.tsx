import { ICommissionForm, IExtraCommissionForm } from "../../Interfaces/CommissionForm"
import axios from 'axios'

const getcommssionformurl = "https://localhost:7233/api/CommissionForm"
const getcommissionrequestorurl = `https://localhost:7233/api/CommissionForm/ByRequestorIDAddEmailAndPhone/`
const getcommissionrecieverurl = `https://localhost:7233/api/CommissionForm/ByReceiverIDAddEmailAndPhone/`

export async function GetCommissionRequestorById(id:string) {
    try{
        let form:IExtraCommissionForm[] = await axios.get(getcommissionrequestorurl+id).then(response => response.data)
        return form
        
    }catch(err){
      console.log(err)
    }
  }

  export async function GetCommissionRecieverById(id:string) {
    try{
        let form:IExtraCommissionForm[] = await axios.get(getcommissionrecieverurl+id).then(response => response.data)
        return form
        
    }catch(err){
      console.log(err)
    }
  }