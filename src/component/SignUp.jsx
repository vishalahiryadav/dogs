import React, { useState, useContext } from "react";
import {
  db,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  dbRef,
  set,
  signInWithPopup,
} from "../firebase.js";
import InputField from "./InputField.jsx";
import {
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { UserContext } from "../App.js";
function SignUpForm() {
  const { userLocation } = useContext(UserContext);
  const [IsLoading, SetIsLoading] = useState(false);
  const [ResponseMessage, SetResponseMesage] = useState("");
  const [ResponseError, SetResponseError] = useState("");
  const [Details, setDetails] = useState({
    email: "",
    mobile: "",
    fullname: "",
    password: "",
    confirmpassword: "",
    postalcode: "",
    privacyPolicy: "",
  });
  function handleDetails(event) {
    const InputName = event.target.name;
    const NewValue = event.target.value;
    setDetails((prevValue) => {
      return {
        ...prevValue,
        [InputName]: NewValue,
      };
    });
  }

  const PostDetails = async (err) => {
    const { email, password, fullname, mobile, postalcode, privacyPolicy } =
      Details;
    SetIsLoading(true);
    try {
      const signInMethods = await fetchSignInMethodsForEmail(getAuth(), email);
      if (signInMethods.length != 0) {
        SetResponseError("An account with this email already exists.");
        setTimeout(() => {
          SetResponseError(null);
        }, 2000);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        if (userCredential) {
          sendEmailVerification(userCredential.user);
          const { uid } = userCredential.user;
          set(dbRef(db, `users/${uid}`), {
            userId: uid,
            email,
            mobile,
            fullname,
            postalcode,
            role: "user",
            privacyPolicy,
            createdAt: new Date(),
          });
          SetResponseMesage(
            "We have sent you a verification email, please click on the given link and verify your account!"
          );
          setTimeout(() => {
            SetResponseMesage(null);
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
      SetResponseError("There Is Something Wrong! please try again.");
      setTimeout(() => {
        SetResponseError(null);
      }, 2000);
    }
  };

  const HandleGoogleSignUp = async (err) => {
    try {
      const result = await signInWithPopup(getAuth(), new GoogleAuthProvider());
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const { user } = result;

      const { uid, displayName, email, phoneNumber } = user;
      set(dbRef(db, `users/${uid}`), {
        userId: uid,
        mobile: phoneNumber,
        email,
        fullname: displayName,
        role: "user",
        privacyPolicy: "Agrred",
        createdAt: new Date(),
      });
    } catch (error) {
      SetResponseError("There Is Something Wrong! please try again.");
      setTimeout(() => {
        SetResponseError(null);
      }, 2000);
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    PostDetails()
      .then(() => {
        SetIsLoading(false);
      })
      .then(() => {
        setDetails({
          email: "",
          password: "",
          mobile: "",
          fullname: "",
          confirmpassword: "",
          postalcode: "",
          privacyPolicy: "",
        });
      });
  }
  return (
    <div className="sign_up_form row">
      {IsLoading && (
        <div id="loading-screen">
          <div className="loading-circle"></div>
        </div>
      )}
      {ResponseMessage && (
        <div className="modal message-popup-model">
          <div className="message-popup-model-content">
            <br></br>
            <h3>Awesome</h3>
            <p className="message-text">
              {"\u{1F389}"} Congratulations! <br></br>
              <br></br>
              {ResponseMessage}
            </p>
          </div>
        </div>
      )}
      {ResponseError && (
        <div className="modal message-popup-model">
          <div className="message-popup-model-content error-popup-model-content">
            <h3>Oh ho!</h3>
            <p className="message-text">
              {" "}
              {"\u{1F61E}"} Sorry! <br></br>
              <br></br>
              {ResponseError}
            </p>
          </div>
        </div>
      )}
      <img
        src="./images/sign_up_page_image.svg"
        className="img-fluid sign_up_img col-12 col-md-6"
      />
      <div className="sign_up_right_section col-12 col-md-6 d-flex py-4">
        <h1>Create Your Account</h1>
        <button
          className="google_signup_button"
          type="submit"
          onClick={HandleGoogleSignUp}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3.3rem"
            height="3.4rem"
            viewBox="0 0 33 34"
            fill="none"
          >
            <path
              d="M33 17.3976C33 27.0972 26.4473 34 16.7705 34C7.49262 34 0 26.4048 0 17C0 7.59516 7.49262 0 16.7705 0C21.2877 0 25.0881 1.67944 28.0162 4.44879L23.4516 8.89758C17.4805 3.05726 6.37684 7.44436 6.37684 17C6.37684 22.9294 11.0496 27.7347 16.7705 27.7347C23.4111 27.7347 25.8996 22.9089 26.2918 20.4069H16.7705V14.5597H32.7363C32.8918 15.4302 33 16.2665 33 17.3976Z"
              fill="#8648D5"
            />
          </svg>
          Sign Up With Google
        </button>
        <div className="hr_container d-flex">
        <svg className="img-fluid" width="18rem" height="2rem" viewBox="0 0 240 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="1" y1="1" x2="239" y2="1" stroke="#3F3B3B" stroke-width="2" stroke-linecap="round" stroke-dasharray="5 14"/>
</svg>

          <h2 className="mx-5">Or</h2>
          <svg className="img-fluid" width="18rem" height="2rem" viewBox="0 0 240 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="1" y1="1" x2="239" y2="1" stroke="#3F3B3B" stroke-width="2" stroke-linecap="round" stroke-dasharray="5 14"/>
</svg>
        </div>
        <form name="user_signup_form" method="POST" onSubmit={handleSubmit}>
          <InputField
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            type="email"
            name="email"
            placeholder=" Email "
            className="signup_form_input"
            value={Details.email}
            onChange={handleDetails}
          />
          <InputField
            required
            pattern="[A-Za-z\s]+"
            type="text"
            name="fullname"
            placeholder=" Fullname "
            className="signup_form_input"
            value={Details.fullname}
            onChange={handleDetails}
          />
          <InputField
            required
            pattern="[0-9]{10}"
            type="text"
            name="mobile"
            placeholder=" Mobile "
            className="signup_form_input"
            value={Details.mobile}
            onChange={handleDetails}
          />
          <InputField
            required
            pattern="[0-9]{6}"
            type="text"
            name="postalcode"
            placeholder="Postal Code"
            className="signup_form_input"
            value={Details.postalcode}
            onChange={handleDetails}
          />
          <InputField
            required
            pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            type="password"
            name="password"
            placeholder=" Password "
            className="signup_form_input"
            value={Details.password}
            onChange={handleDetails}
          />
          <InputField
            required
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password "
            className="signup_form_input"
            value={Details.confirmpassword}
            onChange={handleDetails}
          />
          <br></br>
          <div className="checkbox_container mb-5 d-flex justify-content-center">
            <input
              type="checkbox"
              value="Agreed"
              onChange={handleDetails}
              name="privacyPolicy"
              className="input_checkbox"
            />
            <span>
              <p className="mb-0">I Agree To Privacy Policy And To All T&C.</p>
            </span>
          </div>
          <button className="signup_btn_class" type="submit">
            {" "}
            <i className="fa fa-sign-in"></i> Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
