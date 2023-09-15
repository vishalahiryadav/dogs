import React from "react";
import SignUpForm from "../component/SignUp.jsx";
import SetMetaData from "../CustomHooks/SetMetaData.jsx";
function Registration(){
    SetMetaData("description",
    "Sign up and create your account on Poodles Pet Adoption. Be part of our community and take the first step in providing a loving home to an animal in need.",
    "Join Poodles Pet Adoption Platform - Create Your Account",
    )

    return(<div className="container-fluid mt-5">
    
             <SignUpForm/>
      
    </div>)
}
export default Registration;