const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const {OAuth2} = google.auth;
const OUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVICE_CLIENT_ID ,
    MAILING_SERVICE_CLIENT_SECRET ,
    MAILING_SERVICE_REFRESH_TOKEN ,
    SENDER_EMAIL_ADRESS
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID ,
    MAILING_SERVICE_CLIENT_SECRET ,
    MAILING_SERVICE_REFRESH_TOKEN ,
    OUTH_PLAYGROUND
)

const SendEmail = (to , html) => {
    oauth2Client.setCredentials({
        refresh_token : MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken();
    
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail' ,
        auth : {
            type : 'OAuth2',
            user :  SENDER_EMAIL_ADRESS,    
            clientId : MAILING_SERVICE_CLIENT_ID ,
            clientSecret : MAILING_SERVICE_CLIENT_SECRET ,
            refreshToken : MAILING_SERVICE_REFRESH_TOKEN ,
            accessToken
        }
    })

    const mailOptions = {
        from : SENDER_EMAIL_ADRESS ,
        to: to,
        subject : "Welcome in FundaPitch" ,
        html : `
            ${html}
        `
    }

    smtpTransport.sendMail(mailOptions , (err , infor)=>{
        if(err) return err;
        return infor
    })
}

module.exports = SendEmail;