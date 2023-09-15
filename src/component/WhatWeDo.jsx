import React from "react"
function WhatWeDo() {
  return (
    <div className="how_it_works_container mt-5">
      <h2>Find Your Perfect Pet: Search, Select, and Adopt on Our Platform</h2>

      <div className="row  justify-content-center align-items-center how_it_works_inner_content_container" >
        <div className="col col-md-4 how_it_works_inner_content_container">
          <button type="button" className="how_it_works_title_num_button">1</button>
          <h3 className=" how_it_works_inner_content_heading">Discover</h3>
          <img src="./images/how_it_works_discover.svg" alt="discover adoptable pets nearby"></img>

            <p>Search through the pet profiles to find your
              perfect pet. Filter by breed, age,and city
              more to narrow down your options.</p>

        </div>

        <div className="col col-md-4 how_it_works_inner_content_container">
          <button className="how_it_works_title_num_button" type="button">2</button>
          <h3 className=" how_it_works_inner_content_heading">Choose</h3>
          <img src="./images/how_it_works_chose.svg" alt="discover adoptable pets nearby"></img>

            <p>Found a pet you’re interested in, select them
              to View their photos, read their story, and find
              out if they’re the right fit for you.</p>

        </div>

        <div className="col col-md-4 how_it_works_inner_content_container">
          <button className="how_it_works_title_num_button" type="button">3</button>
          <h3 className=" how_it_works_inner_content_heading">Adopt</h3>
          <img src="./images/how_it_works_adopt.svg" alt="discover adoptable pets nearby"></img>

            <p>Fill out an application and submit it, Once approved,
              take your new furry friend home and give
              them the loving forever home.</p>

        </div>
      </div>
    </div>
  )
}
export default WhatWeDo;

