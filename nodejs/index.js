const admin = require('firebase-admin');
const express = require('express');
const app = express();

var serviceAccount = require("./blooddonor2-d30d1-firebase-adminsdk-nf6k0-c38ca8c9f3.json");

app.use(express.json())

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.post('/send-notification', (req, res) => {
    console.log(req.body);
    const message = {
        notification: {
            title: "Blood Request",
            body: "Neema Khati has sent you a blood request"
        },
        token: req.body.token
    }
    
    admin.messaging().send(message).then(res => {
        console.log("Send Success")
    }).catch(err => {
        console.log(err);
    })
})

app.listen(3000, () => {
    console.log('Server Running')
})