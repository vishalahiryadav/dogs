// AdoptionRequest component
import React, { useState } from "react";

function AdoptionRequest({ adoptionData }) {
  const [startIndex, setStartIndex] = useState(0);
  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 2);
  }
  const handlePrevious = () => {
    setStartIndex((prevIndex) => prevIndex - 2);
  }
  return (
    <div className="row  justify-content-center align-items-center">

      {Object.keys(adoptionData).slice(startIndex, startIndex + 2).map((key) => {
        const currentAdoptionData = adoptionData[key];
        return (
          <div className="col col-md-6 adoption_request_main_container" key={key}>
            <div className="row justify-content-center align-items-center  adoption_request_inner_container" >
              <div className="col-12 col-lg-4 adoption_request_inner_container_left">
                <img src={currentAdoptionData.profilepic} alt="Pet" className="adoption_request_overview_image" />
              </div>
              <div className=" col-12 col-lg-8 adoption_request_inner_container_right">
                <div className="row justify-content-center align-items-center">
                  <div className="col">
                    <p>ID: {currentAdoptionData.adoptionid}</p>
                    <p>Status: {currentAdoptionData.adoptionstatus}</p>
                  </div>
                  <div className="col">
                    <p>PetName: {currentAdoptionData.petname}</p>
                    <p>AdopterName: {currentAdoptionData.fullname}</p>
                  </div>
                </div>

              </div></div>
          </div>
        );
      })}

      <div className=" adoption_request_prev_next_btn_container">

        {adoptionData && Object.keys(adoptionData).length > 0 ? (
          <>
            <button onClick={handlePrevious} disabled={startIndex === 0} className="adoption_request_prev_next_btn">
              &#9664;
            </button>
            <button onClick={handleNext} disabled={startIndex >= Object.keys(adoptionData).length - 2} className="adoption_request_prev_next_btn">
              &#9654;
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default AdoptionRequest;
