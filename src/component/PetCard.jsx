import React from "react";
import { Link } from "react-router-dom";
function PetCard({ petId, name, profilepic }) {

   function HandleRecentalyViewed() {
      const existingFavouritePets = JSON.parse(sessionStorage.getItem("petid")) || [];
      if (existingFavouritePets === null) {
         console.log("no records")
      } else {
         if (!existingFavouritePets.includes(petId)) {
            const updatedPets = [...existingFavouritePets, petId];
            sessionStorage.setItem("petid", JSON.stringify(updatedPets));

         }
      }
   }
   return (
 <div  className="col-6 col-sm-3 col-md-2 card-col my-2" >

  <div class="card" key={petId} onClick={HandleRecentalyViewed}>
  <Link to={`/pets/${petId}`}><img className="card-img-top pet_card_media_img" src={profilepic} alt="pet Details" /></Link>
    <div class="card-body">
    <h3 className="card-title">{name}</h3>
    </div>
  </div>
  </div> 
   );
}


export default PetCard;
