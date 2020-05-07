//For this to work npm install twilio first
//This is for SMS notifications
const accountSid = 'AC2b81209f000de3f1ff317ae46a0ec21c'; //This is Justin's account id
const authToken = '7003301b1b83045df904d43f81b75495'; //This is Justin's authentication token

const client = require('twilio')(accountSid, authToken);

client.messages.create({
        body: 'Alert! Your child has been misbehaving, please check on them immediately. Thank you',
        from: '+12015845237', //This is the phone number that I bought from twilio using the free trial thing
        to: '+16048318237' //This is my number, we will change it to the nubmer that the user inputs once our firebase is working properly
}).then(message=> console.log(message.sid));

//Further testing will be done once Firebase is set up

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '', //An email
        pass: '' //The password for that email
    }
});

var mailOptions = {
    from: 'justinjayxie@gmail.com',
    to: 'justinjayxie@gmail.com',
    subject: 'Alert! Your child has been misbehaving, please check on them immediately. Thank you',
    text: 'Alert! Your child has been misbehaving, please check on them immediately. Thank you.'
};

transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
        console.log(error); 
    } else {
        console.log('Email sent');
    }
});