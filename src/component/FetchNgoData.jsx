import React, { useEffect, useState } from "react"
import { db, dbRef,get} from "../firebase.js"
function FetchNgoData({ngoId,handleNgoDataFetch}){
  const[ngoData,setNgoData]=useState({});
    useEffect(()=>{
      if(ngoId){
        const fetchNgoData = async()=>{
          const ngoRef = dbRef(db,`ngos/${ngoId}`)
          const snapshot = await get(ngoRef);
          const snapshotData = snapshot.val();
          handleNgoDataFetch(snapshotData)
          setNgoData(snapshotData)
      }
      fetchNgoData()
      }
        
        
      
    },[ngoId])
    return( <div className="ngo-details-container">
    <div className="logo-container">
      <a>NgoName:{ngoData.createdAt}</a>
      <h4>NGO Name:{ngoData.createdAt}</h4>
         </div>
    <div className="details-content">
    
  <p>NGO Description:{ngoData.role}</p>
      </div>
       </div>)
}
export default FetchNgoData