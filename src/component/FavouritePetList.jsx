import React,{useState,useEffect} from "react"
import PetCard from "../component/PetCard"
function FavouritePetList({favouritePets,pets}){

    const favouritepetIds = favouritePets && favouritePets.map((pet)=>{
        return pet.petId
       }) 
    return(<>

    {favouritepetIds && favouritepetIds.map((favouritepetId)=>{ 
   const Pet  = pets && pets.find((pet)=>  pet.petId === favouritepetId)
   if(Pet){
    const{petId,petname,files}=Pet;
    const Images = Object.values(files);
    const profileImage = Images[0].__filePath;
    return(
        <PetCard
        key={petId}
        petId={petId}
        name={petname}
        profilepic={profileImage}
         />
    )
   }
    })}
    </>)
}

export default FavouritePetList;