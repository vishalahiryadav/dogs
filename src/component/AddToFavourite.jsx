import React,{useState} from "react"
import { db,serverTimestamp, dbRef,set,push,get } from "../firebase.js";
function AddToFavourite({petId, userId,User,handleLoginPopUpClick}){
    const[ResponseMessage,SetResponseMesage]=useState("");

    const saveAddtoFavourite = async(err)=>{
        try{
            if(User){
                const favouritepetRef =  dbRef(db,`favouritepet/${userId}`);
                const snapshot = await get(favouritepetRef);
                if(snapshot.exists()){
                    const favouritePets = snapshot.val();
                    if(Object.values(favouritePets).some((pet) => pet.petId === petId)){
                        console.log("Pet is already in the favaourite pet list!")
                    }
                   else{
                        const newfavouritepetRef = push(favouritepetRef)
                        await set(newfavouritepetRef, {
                            petId: petId,
                            createdAt:new Date(),
                          });
                          SetResponseMesage("Pet Added To Favourite Pet List!");
                          setTimeout(() => {
                            SetResponseMesage(null);
                          }, 2000);
                    }
                }else{
                    const newfavouritepetRef = push(favouritepetRef)
                    await set(newfavouritepetRef, {
                        petId: petId,
                        createdAt: serverTimestamp(),
                      });
                    console.log("added to the favourties")
                    console.log("User:",User)
                    console.log("PetId:",petId);
                    console.log("userId:",userId)
                }
               
                  }else{
                    console.log("can not add to the favourites")
                  }
        }
        catch(err){
    console.log("there is something wrong!",err)
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        saveAddtoFavourite()
    }
    return( <>        {ResponseMessage && (
            <div className="modal message-popup-model">
              <div className="message-popup-model-content">
              <br></br><h3>Awesome</h3>
                <p className="message-text">{'\u{1F389}'} Congratulations! <br></br><br></br>{ResponseMessage}</p>
              </div>
            </div>
          )}
    <button type="button" className=" pet-small-description-action-btn"  onClick={User ? handleSubmit :handleLoginPopUpClick}> <i className="fa fa-heart"></i> Add To Favourites</button>
    </>
)
}
export default AddToFavourite;