import React,{useState,useEffect,createContext} from "react"
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Header from "./component/Header"
import Footer from "./component/Footer"
import LandingPage from "./pages/LandingPage";
import SinglePet from "./component/SinglePet";
import Registration from "./pages/Registration";
import ForgotPassword from "./component/ForgotPwd";
import AllPets from "./pages/AllPets";
import TermsOfService from "./component/TermsOfService";
import FrequentlyAskedQuestion from "./component/FrequentlyAskedQuestion";
import PrivacyPolicy from "./component/PrivacyPolicy";
import UserProfilePage from "./pages/UserProfilePage";
import { db, dbRef,get} from "./firebase.js";
import { query,orderByChild,equalTo } from "firebase/database";
import { UseAuth } from "./CustomHooks/UseAuth";

 const UserContext = createContext();
 export const PetCategoryContext = createContext();
function App() {
  const { User, handleLogout, UserData } = UseAuth(); 
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [pets,setPets] = useState();
  const[userLocation,setUserLocation]=useState(null)
  const [showPopUp,setShowPopUp]=useState(false);
 
  function handleLoginPopUp(){
    setShowPopUp((prevValue)=> !prevValue)
  }
  

  useEffect(() => {
    const fetchPetsWithImages = async () => {
      try {
        const petsRef = dbRef(db, `pets/`);
        const queryConstraints =[orderByChild("status"), equalTo("available")];
        const snapshot = await get(query(petsRef, ...queryConstraints));
        const petsData = snapshot.val();
       
        if (petsData) {
         const petIds =Object.keys(petsData)
         const filesRef = petIds.map((petId)=> dbRef(db,`pets/${petId}/files`))
         const filesSnapshot = await Promise.all(filesRef.map(get));
         const filesData = filesSnapshot.map((snapshot)=> snapshot.val())
          const petsWithImages = petIds.map((petId,index)=>{
            const Pet = petsData[petId]
            return{
              petId,
              ...Pet,
              files: filesData[index] || {}
            }
          })
          setPets(petsWithImages)
        } else {
          console.log("No pets found.");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchPetsWithImages();
  }, []);
 
 

  useEffect(()=>{
 if("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(
    (position)=>{
      const {latitude,longitude}=position.coords;
      setUserLocation({latitude,longitude})
    },
    (error)=>{
      console.log('Error retrieving location:', error);
    }
  )
 }else{
  console.log('Geolocation API not supported.');
 }
  },[])

   const userContextValue = {
    userLocation,
    User
   }

  return (
   <UserContext.Provider value={userContextValue}>
     <PetCategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
    <Router>
    <div className="App">
    <Header  User={User} handleLogout={handleLogout} showPopUp={showPopUp} setShowPopUp={setShowPopUp} handleLoginPopUp={handleLoginPopUp}/>
    <Routes>
      <Route path="/" element={<LandingPage pets={pets} />}/>
      <Route path="/signup" element={<Registration/>}/>
      <Route path="/favouritepet" element={<UserProfilePage pets={pets}/>} />
      <Route path="/pets/:PetId" element={<SinglePet handleLoginPopUp={handleLoginPopUp}  pets={pets}/>} />
      <Route path="/allpets" element={<AllPets pets={pets} selectedCategory={selectedCategory}/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/termsofservice" element={<TermsOfService />}/>
      <Route path="/faq" element={<FrequentlyAskedQuestion />}/>
      <Route path="/privacypolicy" element={<PrivacyPolicy />}/>
    </Routes>
     <Footer />
    </div>
    </Router></PetCategoryContext.Provider>
    </UserContext.Provider>
  )
}

export default App;
export { UserContext };
