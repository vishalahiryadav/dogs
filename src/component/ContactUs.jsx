import React ,{useState}from "react"
import InputField ,{ TextField } from "./InputField";
function ContactUs(){
 const[ResponseMessage,setResponseMessage]=useState("");
 const[ResponseError,setResponseError]=useState("");
 const [IsLoading,SetIsLoading]=useState(false);

    const [Details,setDetails]= useState({
        email:"",
        fullname:"",
        message:""
    });
    function handleDetails(event){
        const NewValue = event.target.value;
        const InputName = event.target.name;
        setDetails((PrevValue)=>{
            return{
                ...PrevValue,
                [InputName]:NewValue
            }
        })
    }
    const PostDetails = async (err)=>{
        SetIsLoading(true)
      const {email,fullname,message}=Details;
      await fetch("https://us-central1-poodles-8da8a.cloudfunctions.net/ContactUsForm",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,fullname,message})
      })
      .then((response)=>{
        if(!response.ok){
            throw new Error("Network Response Was Not Ok!");
        }
        return response.json();
      })
      .then((data)=>{
        SetIsLoading(false)
        setResponseMessage("Your Message Has Been Sent! We Will Be In Touch Soon.");
        setTimeout(()=>{
            setResponseMessage("")
        },2000)

      })
      .catch((error)=>{
        SetIsLoading(false)
        setResponseError("There Is Something wrong! Please Try Again.")
        setTimeout(()=>{
            setResponseError("");
        })
      })
    }

    function handleSubmit(e){
        e.preventDefault()
        PostDetails()
        setDetails({
            email:"",
            fullname:"",
            message:""
        });
     }
    return(

        <div>
        <h3>Got Anything To Share?</h3>
        {IsLoading && (
        <div id="loading-screen">
          <div className="loading-circle"></div>
        </div>
      )}
        {ResponseMessage && (<div className="contact-us-pop-up-container">
        <img src="./images/checkmark.png" alt="Checkmark" className="checkmark-icon" />
        <p className="contact-us-pop-message">{ResponseMessage}</p>
           </div>)}
           {ResponseError && (<div className="contact-us-pop-up-container">
        <img src="./images/checkmark.png" alt="Checkmark" className="checkmark-icon" />
        <p className="contact-us-pop-message">{ResponseError}</p>
           </div>)}
      <form className=" d-flex flex-column" name="contact_us_form" method="POST" onSubmit={handleSubmit}>
      <InputField   required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" type="email" name="email" placeholder="Email" className="contactus_form_input" value={Details.email} onChange={handleDetails} />
      <InputField   required  pattern="[A-Za-z\s]+" type="text" name="fullname" placeholder="FullName" className="contactus_form_input" value={Details.fullname} onChange={handleDetails} />
      <TextField  required type="text" name="message" placeholder="Type Your Message" className="contactus_form_input" value={Details.message} onChange={handleDetails} /><br></br>
      <button className="contactus_btn_class news_btn_class" type="submit"><i className="fa fa-envelope-o"></i>  Connect Now</button>
      </form>
        </div>
    );
}
export default ContactUs;