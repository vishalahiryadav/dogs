import React, { useState } from "react";
import InputField from "./InputField";
import { fetchSignInMethodsForEmail, } from "../firebase.js";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [IsLoading, SetIsLoading] = useState(false);
    const [ResponseMessage, setResponseMessage] = useState("");
    const [ResponseError, SetResponseError] = useState("")
    const HandlePasswordReset = async (e) => {
        e.preventDefault();

        SetIsLoading(true)

        return fetchSignInMethodsForEmail(getAuth(), email).then((SignInMethod) => {
            try {
                if (SignInMethod.length === 0) {
                    SetIsLoading(false)
                    SetResponseError("The Email You Provided Is Not Associated With Any Account! Please Try With Correct Email.")
                    setTimeout(() => {
                        SetResponseError("")
                    }, 3000)
                } else {
                    sendPasswordResetEmail(getAuth(), email).then(() => {
                        SetIsLoading(false)
                        setEmail("")
                        setResponseMessage("An email has been sent to your email address,Follow the direction in email to reset your password.")
                        setTimeout(() => {
                            setResponseMessage("")
                        }, 3000)
                    })
                }
            } catch (error) {
                console.log(error)
            }

        });
    }
    return (

        <div className="container-fluid">
            {IsLoading && (
                <div id="loading-screen">
                    <div className="loading-circle"></div>
                </div>
            )}
            {ResponseMessage && (<div className="modal message-popup-model">
                <div className="message-popup-model-content">
                    <br></br><h3>Password Reset Email Sent</h3>
                    <p className="message-text">{'\u{1F389}'} Congratulations! <br></br><br></br>{ResponseMessage}</p>
                </div>
            </div>)}
            {ResponseError && (<div className="modal message-popup-model">
                <div className="message-popup-model-content error-popup-model-content">
                    <h3>Oh ho!</h3>
                    <p className="message-text"> {'\u{1F61E}'} Sorry! <br></br><br></br>{ResponseError}</p>
                </div>
            </div>)}
            <div className="forgot-password-container">
                <div className="forgot-pwd-title-container">
                    <h2 className="forgot-pwd-title-text mt-3">Forgot Password?</h2>
                    <p className="forgot-pwd-tilte-para-text mt-3">To reset your password, please enter your email below. Password reset instructions will be sent to the email address associated with your account.</p>
                </div>
                <div className="forgot-pwd-form-container">
                    <form className="forgot-pwd-from" name="forgot-pwd-form" onSubmit={HandlePasswordReset}>
                        <InputField required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" type="email" name="email" placeholder=" Email " className="signup_form_input" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                        <button className="forgot-pwd-btn" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>)
}
export default ForgotPassword;