import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";

function RecentalyViewedPets({pets}) {
    const [RecentViewedPets, setRecentViewedPets] = useState([]);
    const [currentIndex,setCurrentIndex]=useState(0)
 
    useEffect(() => {
        getRecentItems()
    }, [])
    function handlePrevious() {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex -  5);
        }
      }
    
      function handleNext() {
        const maxIndex = Math.max(filteredRecentViewedPets.length - 5, 0);
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 5, maxIndex));
      }
    function getRecentItems() {
        const RecentItems = JSON.parse(sessionStorage.getItem("petid"))
        setRecentViewedPets(RecentItems)
    }
    const filteredRecentViewedPets = RecentViewedPets && RecentViewedPets.filter((petId) =>
    pets && pets.some((pet) => pet.petId === petId)
  );
        
  return (
        <div> 
            <div className="col d-flex justify-content-between align-items-center mt-4">
            {RecentViewedPets && RecentViewedPets.length > 0 && (<h2>Recently Viewed Pets</h2>)}
    </div>
            
              <div className="row">
                {filteredRecentViewedPets && filteredRecentViewedPets.slice(currentIndex,currentIndex+5).map((petId)=>{
                    const Pet = pets && pets.find((pet)=> pet.petId === petId);
                    if(Pet){
                        const {petId,petname,files}=Pet;
                        const images = Object.values(files);
                        const profileImage = images[0].__filePath
                        return(
                            <PetCard
                            key={petId}
                            petId={petId}
                            name={petname}
                            profilepic={profileImage}
                             />
                        )
                    }
                }) }
                
              </div>
              <div className=" adoption_request_prev_next_btn_container">
              {RecentViewedPets && RecentViewedPets.length > 0 ? (
                <>
 <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="adoption_request_prev_next_btn"
          >
            &#9664;
          </button>
          <button
  onClick={handleNext}
  disabled={currentIndex >= Math.max(filteredRecentViewedPets && filteredRecentViewedPets.length - 5, 0)}
  className="adoption_request_prev_next_btn"
>
  &#9654;
</button>
                </>
              ):null}

         
        </div>
        </div>
        
    )
}
export default RecentalyViewedPets;