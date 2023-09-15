import React from "react";
function UserProfile({ userData }) {
    return (
        <div className="row justify-content-center user_main_container">
            <div className="col-12 col-md-4 user_left_container">
                <img src="./images/Frame 39 (3).png" alt="poodles user profile picture " className="adoption_request_overview_image" />
            </div>
            <div className="col-6 col-md-4 user_middle_container text-center">
                <h2>{userData.fullname}</h2>
                <button className="user_profile_contact_info_btn">Contact Information</button>
                <p>Mobile: {userData.mobile}</p>
                <p>Email: {userData.email}</p>
            </div>
            <div className="col-6 col-md-4 user_right_container">
                <h2>Address</h2>
                <h2>Address</h2>
                <h2>Address</h2>
            </div>
        </div>)
}
export default UserProfile