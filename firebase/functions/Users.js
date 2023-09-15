const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require("cors")({
    origin: "https://poodles-8da8a.web.app",
    credentials: true,
});
exports.Login = functions.https.onRequest( async (req,res) =>{
    cors(req,res,async ()=>{
        if(req.method === "POST"){

        }
    })
})
exports.signup = functions.https.onRequest(async (req,res) =>{
    cors(req,res,async()=>{
        if(req.method === "POST"){
            
        }
    })
})