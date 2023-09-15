import React, { useState,useEffect, } from "react"
import { db, dbRef,get,onAuthStateChanged} from "../firebase.js";
import { getAuth,signOut} from "firebase/auth";
import { query,orderByChild,equalTo } from "firebase/database";

export function UseAuth(){
    const [User,setUser]=useState(null);
    const[UserData,setUserData]=useState([]);

    useEffect( ()=>{
        const unsubscribe = onAuthStateChanged(getAuth(),async (currentUser)=>{
          if(currentUser && currentUser.emailVerified){
            const userData = await getUserData(currentUser.uid);
            const userRole = userData && userData[currentUser && currentUser.uid]?.role;
            const allowedTypes =["user"];
            if(currentUser && currentUser.emailVerified && allowedTypes.includes(userRole && userRole)){
                setUser(currentUser);
            }else{
                signOut(getAuth());
                setUser(null);
              }
          }else{
              signOut(getAuth());
              setUser(null);
            }
      
        });
        return () => {
            unsubscribe(); // Detach the listener when the component unmounts
          };
      },[User])
    const getUserData = async(userId) =>{
        const userRef = dbRef(db,`users`);
        const queryConstraints = [orderByChild("userId"), equalTo(userId)];
        const snapshot = await get(query(userRef, ...queryConstraints));
        const snapshotData = snapshot.val();
        setUserData(snapshotData);
         return snapshotData || null ;
     }

     function handleLogout() {
        signOut(getAuth())
          .then(() => {
            setUser(false);
            window.location.href = "/";
          })
          .catch((error) => {
            // Handle logout error
          });
      };
    return { User, handleLogout, getUserData,UserData};
}
