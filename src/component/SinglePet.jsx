import React, { useState, useContext, useEffect, createElement } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import AdoptionForm from "./AdoptionForm.jsx";
import { UserContext } from "../App.js";
import AddToFavourite from "./AddToFavourite";
import FetchNgoData from "./FetchNgoData";
import SetMetaData from "../CustomHooks/SetMetaData";
function SinglePet({ handleLoginPopUp, pets }) {
  const { User } = useContext(UserContext)
  const userId = User ? User.uid : null;
  const [showAdoptionForm, setshowAdoptionForm] = useState(false)
  const [activeButton, setActiveButton] = useState(1);
  const [activePetDescription, setPetDescription] = useState(false)
  const [IsLoading, SetIsLoading] = useState(true);
  const [ngoData, setNgoData] = useState();
  const { PetId } = useParams();
  useEffect(() => {
    // Simulate data fetching delay
    const delay = setTimeout(() => {
      SetIsLoading(false);
    }, 2000);

    // Clean up the timeout on unmount
    return () => clearTimeout(delay);
  }, []);

  if (pets) {
    const Pet = pets && pets.find(pet => String(pet.petId) === PetId);
    const { petname, breed, city, category } = Pet;
    SetMetaData("description",
      `Meet ${petname}, a wonderful ${breed} ${category} available for adoption at Poodles Pet Adoption. Give ${petname} a loving forever home and make a positive impact by choosing adoption.`,
      `${petname} Available For Adoption - In ${city} | Poodles Pet Adoption`,
    );
  }
  if (IsLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  const handleNgoDataFetch = (data) => {
    setNgoData(data)
  }
  const Pet = pets && pets.find(pet => String(pet.petId) === PetId)
  const { petname, category, ngoId, breed, petId, city, description, age, medicalhistory, behaviourinfo, adoptionrequirements, files, petgender, status } = Pet;
  const altText = `Adorable ${petname} Available for Adoption at Poodles Pet Adoption`;

  const fileIds = Object.keys(files);
  const firstFileId = fileIds[0];
  const firstFile = files[firstFileId];
  const { __filePath } = firstFile;
  const profilepic = __filePath;
  const handleLoginPopUpClick = () => {
    if (!User) {
      handleLoginPopUp();
    }
  }
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };
  function openLoginForm(User) {
    if (User) {
      console.log("user is logged in")
    } else if (!User) {
      console.log("user is not logged in")
    }
  }
  return (

    <div className="container-fluid mt-4">
      {showAdoptionForm && (<AdoptionForm age={age} petname={petname} description={description} ngoData={ngoData} profilepic={profilepic} ngoId={ngoId} User={User} petId={petId} userId={userId} showAdoptionForm={showAdoptionForm} setshowAdoptionForm={setshowAdoptionForm} />)}
      <div className="row pet-details-Image-container">

        <div className="col col-md-6 pet-image-inner-container">
          <ImageGallery altText={altText} images={Object.values(files)} />
        </div>
        <div className="col col-md-6 single-pet-details">
          <h1>Meet  {petname}</h1>
          <p>Poodles Foundation</p>
          <div className="pet-short-details">
            <button type="button" className="pet-details-btn">{breed}</button>
            <button type="button" className="pet-details-btn">{petgender}</button>
            <button type="button" className="pet-details-btn">{age}</button>
          </div>

          <div className="pet-short-description-city-container">
            <p>{city}</p>
          </div>
          <div className="pet-short-description" >
            <div className="pet-short-description-header" onClick={() => { setPetDescription(!activePetDescription) }}>
              <h4 className="pet-description-title"  >Pet Description</h4><i className="fa fa-sort-desc" aria-hidden="true"></i>
            </div>
            {activePetDescription && (<p className="pet-description-content">{description}</p>)}
          </div>
          <div className="pet-mediacal-behaviour-container">
            <div className="pet-medical-behav-adoptrequirment-btns">
              <button type="button" className={activeButton === 1 ? " activepetbtn" : "medical-behav-requirement-btn"} onClick={() => handleButtonClick(1)}>Medical History</button>
              <button type="button" className={activeButton === 2 ? " activepetbtn" : "medical-behav-requirement-btn"} onClick={() => handleButtonClick(2)}>BehaviorInformation</button>
              <button type="button" className={activeButton === 3 ? " activepetbtn" : "medical-behav-requirement-btn"} onClick={() => handleButtonClick(3)}>AdoptionRequirements</button>
            </div>
            <div className="pet-medical-behav-adoptrequirment-content-container">
              {activeButton === 1 && <p className="pet-medical-behav-adoptrequirment-content">{medicalhistory}</p>}
              {activeButton === 2 && <p className="pet-medical-behav-adoptrequirment-content">{behaviourinfo}</p>}
              {activeButton === 3 && <p className="pet-medical-behav-adoptrequirment-content">{adoptionrequirements}</p>}
            </div>
          </div>
        </div>
        <div className=" row justify-content-between align-items-center pet-adoption-action-details-container">
          <div className="col col-md-3 profilepic-small-image-conatiner">
            <img src={profilepic} alt="pet availabe for adoption profile image" className="profilepic-small-image-conatiner-thumbnail" />
          </div>
          <div className="col col-md-5 pet-small-description-container pl-4">
            <h4>{petname} From Poodles Foundation</h4>
            <div className="pet-details text-center">
              <span className="pet-detail">Breed: {breed}</span>
              <span className="vertical-line"></span>
              <span className="pet-detail">Age: {age}</span>
            </div>
          </div>
          <div className="col col-md-4 pet-small-description-action-btns">
            <button className="  pet-small-description-action-btn m-1" id="pet-small-description-action-btn-adopt" type="button" onClick={() => User ? setshowAdoptionForm(true) : handleLoginPopUpClick()} > <i className="fa fa-paw"></i>  Start Adoption</button>
            <AddToFavourite petId={petId} userId={userId} User={User} handleLoginPopUpClick={handleLoginPopUpClick} />
          </div>
        </div>
      </div>




    </div>

  )
}
export default SinglePet;