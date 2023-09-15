import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { db, dbRef, equalTo, get, orderByChild } from "../firebase.js";
import { query } from "firebase/database";
import FavouritePetList from "../component/FavouritePetList"
import AdoptionRequest from "../component/AdoptionRequest"
import UserProfile from "../component/UserProfile";
import SetMetaData from "../CustomHooks/SetMetaData";
function UserProfilePage({ pets }) {

  const [favouritePets, setFavouritesPets] = useState()
  const [userData, setUserData] = useState([])
  const [adoptionData, setAdoptionData] = useState([])

  const { User } = useContext(UserContext);
  const userId = User && User.uid;
  SetMetaData("description",
    "Manage your Poodles Pet Adoption profile. View your adopted pets, update your preferences, and stay connected with our community of pet lovers.",
    "Your Poodles Pet Adoption Profile",
  );

  useEffect(() => {
    if (User && userId) {
      const fetchAdoptionRequests = async () => {
        try {
          const adoptionRef = dbRef(db, `adoptions/`);
          const queryConstraints = [orderByChild("userId"), equalTo(userId)];
          const snapshot = await get(query(adoptionRef, ...queryConstraints));
          const adoptionData = snapshot.val();
          if (adoptionData) {
            setAdoptionData(adoptionData)
          } else {
            console.log("no adoptions in here")
          }
        }
        catch (error) {
          console.log("error:", error)
        }
      }
      fetchAdoptionRequests(userId);
    }
  }, [userId, User])

  useEffect(() => {
    if (User && userId) {
      const fetchFavouritePets = async () => {
        try {
          const favouritePetRef = dbRef(db, `favouritepet/${userId}`)
          await get(favouritePetRef).then((snapshot) => {
            const data = snapshot.val();
            if (data) {
              const favouritePetsArray = Object.values(data);
              setFavouritesPets(favouritePetsArray)
            } else {
              setFavouritesPets([])
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
      fetchFavouritePets(userId)
    }
  }, [userId, User])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = dbRef(db, `users/${userId}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        if (userData) {
          setUserData(userData)
        }
      } catch (error) {
        console.log("error:", error)
      }

    }
    fetchUser()
  }, [userId])

  if (!User) {
    return (<h1>Please login first</h1>)
  }
  return (
    <>
      <div className="container-fluid user_profile_data_container mt-5">
        <UserProfile userData={userData} />
      </div>


      <div className="container-fluid user_adoption_data_container mt-5">
        {adoptionData && <h2 className="user_adoption_data_container_title">Recent Adoption Requests</h2>}

        <AdoptionRequest adoptionData={adoptionData} />
      </div>

      <div className="container-fluid row mt-5 recent-added-pets-container ">

        {favouritePets && favouritePets.length > 0 && (<h2 style={{ textAlign: "left" }}>Wishlisted Pets</h2>)}
        <FavouritePetList favouritePets={favouritePets} pets={pets} />
      </div>
    </>

  )
}
export default UserProfilePage;