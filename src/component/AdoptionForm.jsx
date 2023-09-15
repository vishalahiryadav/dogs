import React, { useState, useEffect } from "react"
import InputField from "./InputField"
import { db, push, dbRef, set, get } from "../firebase.js";

function AdoptionForm({ age, petname, description, ngoId, User, showAdoptionForm, setshowAdoptionForm, userId, petId, profilepic }) {
  const [ngoData, setNgoData] = useState({});
  const [IsLoading, SetIsLoading] = useState(false)
  const [ResponseError, SetResponseError] = useState("");
  const [ResponseMessage, SetResponseMesage] = useState("");
  useEffect(() => {

    const fetchNgoData = async () => {
      const ngoRef = dbRef(db, `ngos/${ngoId}`)
      const snapshot = await get(ngoRef);
      const snapshotData = snapshot.val();
      setNgoData(snapshotData)
    }
    fetchNgoData()

  }, [ngoId]);

  const [Details, setDetails] = useState({
    fullname: "",
    mobile: "",
    postalcode: "",
    address: "",
    ownership: "",
    petexperience: ""
  })
  function handleDetails(event) {
    const InputName = event.target.name;
    const NewValue = event.target.value;
    setDetails((prevValue) => {
      return {
        ...prevValue,
        [InputName]: NewValue
      };
    })

  }

  const PostDetails = async (err) => {
    const { fullname, mobile, postalcode, address, ownership, petexperience } = Details;
    const email = User.email;
    const ngoemail = ngoData.email;
    const ngoname = ngoData.ngoname;
    SetIsLoading(true);
    try {
      if (User) {

        const newRecordRef = push(dbRef(db, 'adoptions'));
        const petRef = dbRef(db, `pets/${petId}/status`)
        const newRecordKey = newRecordRef.key;
        const adoptionData = {
          adoptionid: Math.floor(100000 + Math.random() * 900000),
          petname,
          description,
          fullname,
          email,
          ngoId,
          age,
          mobile,
          postalcode,
          address,
          ownership,
          petexperience,
          userId: userId,
          petId: petId,
          profilepic,
          ngoemail,
          ngoname,
          adoptionstatus: "pending",
          createdAt: new Date(),
        }
        const promises = [
          set(newRecordRef, adoptionData),
          set(petRef, "OnHold", { merge: true })
        ];
        try {
          await Promise.all(promises).then(() => {
            console.log("New Pet Adoption And Status Update Successful!");

          }).then(async () => {
            await fetch(` https://us-central1-poodles-8da8a.cloudfunctions.net/AdoptionConfirmation`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ ...adoptionData })
            }).then((response) => {
              if (!response.ok) {
                throw new Error("network response was not ok!");
              }
              return response.json()
            }).then((data) => {
              SetResponseMesage("Thank You For Your Adoption!We Will Send You An Email With Adoption Deatils.");
              setTimeout(() => {
                SetResponseMesage(null);
              }, 4000);
            })
          })
        } catch (error) {
          SetResponseError("There Was An Error While Processing Your Adoption Request! Please Try Again.");
          setTimeout(() => {
            SetResponseError(null);
          }, 4000)
        }
      }
    }
    catch (error) {
      SetResponseError("There is something Wrong!Please Try Again");
      setTimeout(() => {
        SetResponseError(null);
      }, 3000)
    }

  }
  async function handleSubmit(e) {
    e.preventDefault()
    PostDetails()
    setTimeout(() => {
      SetIsLoading(false)
      setDetails({
        fullname: "",
        mobile: "",
        address: "",
        ownership: "",
        petexperience: ""

      })
      setshowAdoptionForm(false)
    }, 4000)

  }
  return (<div>
    {IsLoading && (
      <div id="loading-screen">
        <div className="loading-circle"></div>
      </div>
    )}
    {ResponseMessage && (
      <div className="modal message-popup-model">
        <div className="message-popup-model-content">
          <br></br><h3>Awesome</h3>
          <p className="message-text">{'\u{1F389}'} Congratulations! <br></br><br></br>{ResponseMessage}</p>
        </div>
      </div>
    )}
    {ResponseError && (
      <div className="modal message-popup-model">
        <div className="message-popup-model-content error-popup-model-content">
          <h3>Oh ho!</h3>
          <p className="message-text"> {'\u{1F61E}'} Sorry! <br></br><br></br>{ResponseError}</p>
        </div>
      </div>
    )}
    <div className="d-flex justify-content-center align-items-center">
      <div className="adoption-form-container">
        <h3 className="mt-4" style={{ "color": "white" }}>Bring Home A New Friend</h3>
        <button type="button" className="adoption-form-close-btn" onClick={() => { setshowAdoptionForm(!showAdoptionForm) }}><i class="fa fa-times"></i></button>
        <form name="pet-adoption-form" method="POST" onSubmit={handleSubmit}>
          <InputField required pattern="[A-Za-z\s]+" type="text" name="fullname" placeholder=" Fullname " className="signup_form_input" value={Details.fullname} onChange={handleDetails} />
          <InputField required pattern="[0-9]{10}" type="text" name="mobile" placeholder=" Mobile " className="signup_form_input" value={Details.mobile} onChange={handleDetails} />
          <InputField required pattern="[0-9]{6}" type="text" name="postalcode" placeholder="Postal Code" className="signup_form_input" value={Details.postalcode} onChange={handleDetails} />
          <InputField required type="text" name="address" placeholder="Address" className="signup_form_input" value={Details.address} onChange={handleDetails} /><br></br>

          <div className="radio-container">
            <label className="radio-label" htmlFor="ownership">Have you owned a pet before?</label>
            <div>
              <input type="radio" id="yes" name="ownership" className="signup_form_input" value="yes" checked={Details.ownership === "yes"} onChange={handleDetails} />
              <label htmlFor="yes">Yes</label>
            </div>
            <div>
              <input type="radio" id="no" name="ownership" className="signup_form_input" value="no" checked={Details.ownership === "no"} onChange={handleDetails} />
              <label htmlFor="no">No</label>
            </div>
          </div>

          <div className="radio-container">
            <label className="radio-label" htmlFor="petexperience">How would you rate your experience with pets?</label>
            <div>
              <input type="radio" id="Beginner" name="petexperience" className="signup_form_input" value="Beginner" checked={Details.petexperience === "Beginner"} onChange={handleDetails} />
              <label htmlFor="Beginner">Beginner</label>
            </div>
            <div>
              <input type="radio" id="Intermediate" name="petexperience" className="signup_form_input" value="Intermediate" checked={Details.petexperience === "Intermediate"} onChange={handleDetails} />
              <label htmlFor="Intermediate">Intermediate</label>
            </div>
            <div>
              <input type="radio" id="Advanced" name="petexperience" className="signup_form_input" value="Advanced" checked={Details.petexperience === "Advanced"} onChange={handleDetails} />
              <label htmlFor="Advanced">Advanced</label>
            </div>
          </div>

          <button className="adoption_form_btn_class mt-5" type="submit">Adopt Now    <i className="fa fa-heart"></i></button>

        </form>
      </div>
    </div>
  </div>)
}
export default AdoptionForm;