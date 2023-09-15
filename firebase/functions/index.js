const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

if (process.env.FUNCTIONS_EMULATOR) {
    const functionsEmulator = require("firebase-functions/lib/emulator");
    functionsEmulator.connectFunctionsEmulator(functions, "localhost", 5001);
}

const sgMail = require("@sendgrid/mail");
const sgClient = require("@sendgrid/client");
sgMail.setApiKey(functions.config().api.key.sendgrid);
sgClient.setApiKey(functions.config().api.key.sendgrid);

const cors = require("cors")({
    origin: "http://localhost:3000",
    credentials: true,
});

exports.ContactUsForm = functions.https.onRequest(async (req,res)=>{
    cors(req,res,async() =>{
  if(req.method === "POST"){
    const{email,fullname,message}=req.body;
   
   const msg ={
    to:"lokeshahir@poodles.in",
    from: { email: functions.config().sender.email, name: fullname },
    subject:"Contact Form Submission",
    text: `A user has submitted the contact form on your website.\n\nEmail: ${email}\nMessage: ${message}`,
   }
   try{
    await sgMail.send(msg)
    console.log('Email sent');
    res.status(200).send({message:"Thank you for contacting us! We will be in touch soon."});
   }
   catch(error){
    console.error(error);
    res.status(500).send('An error occurred while sending your message. Please try again later.');
   }
  }
    })
})

exports.NewsLetterForm = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        if (req.method === "POST") {
            const { email } = req.body;
            console.log(email);
            const listId = await GetListId("Newsletter_Subscribers");
            console.log(listId);
            try {
                await AddContact(listId, email);
                await SendEmail(email);
                res.send({ message: "Subscribed to the newsletters" });
            }
            catch (err) {
                console.log(err);
                res.send({ message: `${err}` });
            }
        }
        else {
            res.status(405).send({ message: "Method Not Allowed!" });
        }
    })
})

async function GetListId(listName) {
    const request = {
        url: `v3/marketing/lists`,
        method: "GET",
    }
    const response = await sgClient.request(request);
    const allLists = response[1].result;
    return allLists.find(x => x.name === listName).id;
}
async function AddContact(listId, email) {
    const data = {
        list_ids: [listId],
        contacts: [{ email }]

    };
    const request = {
        url: `/v3/marketing/contacts`,
        method: "PUT",
        body: data
    }
    console.log(request);
    return sgClient.request(request);
}

async function SendEmail(email) {
    const msg = {
        to: email,
        from: { email: functions.config().sender.email, name: 'Poodles' },
        templateId:'d-0fe15bdd13ff459d8f63008a6dd4ce63',
        dynamicTemplateData: {
        username:email
        },
        subject: `Poodles Newsletter`,
        html: `hello ${email} <br> thank you for subscribing to the newsletter`
    }
    try {
        await sgMail.send(msg)
        console.log("message sent");
        res.status(200).send("Thank You For Subscribing To The Newsletter!")
    }
    catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while sending your message Please Try Again!");
    }
}
exports.AdoptionConfirmation = functions.https.onRequest(async (req,res)=>{
    cors(req,res,async ()=>{
        if(req.method === "POST"){
            const{...adoptionData}=req.body;
                const { adoptionid,
                    petname,
                    description,
                    fullname,
                    ngoname,
                    age,
                    email,
                    ngoId,
                    mobile,
                    postalcode,
                    address,
                    ownership,
                    petexperience,
                    petId,
                    profilepic,
                    adoptionstatus,
                    createdAt,
                    ngoemail,}= adoptionData;
                    const maxResendAttempts = 2;
                    let resendAttempts = 0;
            try{  
                const sendEmails = async()=>{
                    const usermsg = {
                        to: email,
                from: { email: functions.config().sender.email, name: 'Poodles' },
                templateId:'d-a8aad167881c4c4abbb5452cae6e9630',
                dynamicTemplateData: {
                    fullname:fullname,
                    adoptionid:adoptionid,
                    petname:petname,
                    petprofile:profilepic,
                    petdescription: description,
                    petage:age,
                    adoptiondate:createdAt,
                    useraddress:address,
                    adoptionstatus:adoptionstatus,
                },
                    }
                    const ngomsg = {
                        to: ngoemail,
                  from: { email: functions.config().sender.email, name: 'Poodles' },
                templateId:'d-7be3870396c24acf95784664256a6f00',
                dynamicTemplateData: {
                    fullname:fullname,
                    adoptionid:adoptionid,
                    petname:petname,
                    petprofile:profilepic,
                    petdescription: description,
                    petage:age,
                    useraddress:address,
                    adoptionstatus:adoptionstatus,
                    usermobile:mobile,
                    useremail:email,
                    petId:petId,
                    adoptiondate:createdAt,
                    ngoname:ngoname,
                },
                    }

                    await sgMail.send(usermsg);
                    await sgMail.send(ngomsg);
                   res.status(200).json(adoptionData);
                }
               const handleEmailError = async(error)=>{
                    if(resendAttempts < maxResendAttempts){
                        resendAttempts++;
                        await sendEmails();
                    }else{
                        res.status(500).json("Failed to send adoption confirmation emails.");
                    }
               }
               try {
                await sendEmails().catch(handleEmailError);
            } catch (error) {
                console.log(error);
                res.status(500).json("An error occurred while sending adoption confirmation emails");
            }
            }
            catch(error){
                console.log(error);
                res.status(500).json("An error occurred while sending adoption confirmation emails");
            }
        }
    })
})