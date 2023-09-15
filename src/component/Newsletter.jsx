import React, { useState } from "react";
import InputField from "./InputField";
function NewsLetterForm() {
    const [ResponseMessage, setResponseMessage] = useState("");
    const [IsLoading, SetIsLoading] = useState(false);
    const [ResponseError, SetResponseError] = useState("")
    const [Details, setDetails] = useState({
        email: "",
    });

    function handleDetails(event) {
        const NewValue = event.target.value;
        const InputName = event.target.name;
        setDetails((prevValue) => {
            return {
                ...prevValue,
                [InputName]: NewValue
            }
        })
    }

    const PostDetails = async (err) => {
        const { email } = Details;
        SetIsLoading(true)
        await fetch(" https://us-central1-poodles-8da8a.cloudfunctions.net/NewsLetterForm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network Response Was Not Ok!");
                }
                return response.json()
            })
            .then((data) => {
                setResponseMessage(data.message);
                setTimeout(() => {
                    setResponseMessage(null)
                }, 2000)
            })
            .catch((error) => {
                SetResponseError("There is something wrong Please try again!");
                setTimeout(() => {
                    SetResponseError(null);
                }, 2000)
            })
    }

    function handleSubmit(e) {
        e.preventDefault()
        PostDetails().then(() => {
            SetIsLoading(false)
            setDetails({
                email: "",
            });
        })
    }
    return (

        <div className="newsletter-from-container d-flex justify-content-between align-items-center flex-column">
            {IsLoading && (<div id="loading-screen">
                <div className="loading-circle"></div>
            </div>)}
            {ResponseMessage && (<div className="contact-us-pop-up-container">
                <img src="./images/checkmark.png" alt="Checkmark" className="checkmark-icon" />
                <p className="contact-us-pop-message">{ResponseMessage}</p>
            </div>)}
            <div className="newsletter-form-inner-container ">
                <div className="heading-container" style={{ display: "inline-flex" }}>
                    <h1 className="newsletter-form-inner-container-heading">JOIN OUR NEWSLETTER</h1>
                    <img src="../images/Group 23.png" alt="Image description" style={{ margin: '0 10px' }} />
                </div>
                <p>Discover the Extraordinary World of Pets: Where Love, Loyalty,
                    and Cuteness Know No Bounds!"</p>
                <form className="d-flex align-items-center" name="newsletterform" onSubmit={handleSubmit} method="POST" >
                    <InputField required type="email" name="email" placeholder="Enter Email Here" className="newsletter_form_input" value={Details.email} onChange={handleDetails} />
                    <button className="news_btn_class" type="submit"><i className="fa fa-newspaper-o"></i> Subscribe</button>
                </form>
            </div>

        </div>
    );
}
export default NewsLetterForm;