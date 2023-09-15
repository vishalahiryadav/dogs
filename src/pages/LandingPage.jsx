import React, { useEffect, useState } from "react"
import PetCard from "../component/PetCard";
import WhatWeDo from "../component/WhatWeDo";
import RecentalyViewedPets from "../component/RecentalyViewedPets";
import NewsLetterForm from "../component/Newsletter";
import PetSortHomePage from "../component/PetSortHomePage";
import { Link } from "react-router-dom";
import { iconsArray } from "../component/PetSortHomePage";
import SetMetaData from "../CustomHooks/SetMetaData";
function LandingPage({ pets }) {
  SetMetaData(
    "description",
    "Explore a wide variety of adoptable pets on Poodles Pet Adoption. Find your perfect companion and provide a loving forever home. Join us in promoting responsible pet adoption. Adopt dogs, cats, or other small animals .",
    "Find Your New Furry Friend - Poodles Pet Adoption | Adopt Dogs, Cats, and More",

  );
  return (
    <div>
      <div className="container-fluid landing_content_container">
        <div className="hero_image_container">
          <picture>
        <source media="(min-width: 768px)" srcSet="./images/hero_image.svg" />
        <img src="./images/Frame 96.svg" alt="A responsive image" />
      </picture>

        </div>
      </div>
      <div className="home_pet_sort_landing_page_container m-2">
        {iconsArray.map((item, index) => {
          return (
            <PetSortHomePage
              key={index}
              item={item.icon}
              category={item.category}

            />

          )
        })}
      </div>
      <div className="container-fluid newest_pet_home_container mt-4">
        <div className="newest_pet_home_inner_container">
          <div className="col d-flex justify-content-between align-items-center mt-4">
            <h4>Pets Available for Adoption Nearby</h4>
            <Link to="/allpets" aria-current="page"><button className="header_login_form_btn" >See all</button></Link>
          </div>
        </div>
        <div className="row justify-content-center align-items-center recent-added-pets-container mt-4">
          {pets && pets.slice(0, 5).map((pet, index) => {
            const { petId, petname, files } = pet;
            const fileIds = Object.keys(files);
            const firstFileId = fileIds[0];
            const firstFile = files[firstFileId];
            const __filePath = firstFile ? firstFile.__filePath : null;
            return (
              <PetCard
                key={petId}
                petId={petId}
                name={petname}
                profilepic={__filePath}
              />
            )
          })}

        </div>
      </div>
      <div className="container-fluid what_we_do_container" >
        <WhatWeDo />
      </div>
      <div className="container-fluid newsletter-container mt-5">
        <NewsLetterForm />
      </div>
      <div className=" container-fluid col d-flex justify-content-between align-items-center recentaly-viewed-pets-container recent-added-pets-container mt-5">
        <RecentalyViewedPets pets={pets} />

      </div>
    </div>
  )
}
export default LandingPage;