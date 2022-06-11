const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user:process.env.nodemailerFromEmail,
        pass:process.env.nodemailerFromPassword
    }
})

// REGISTRATION
exports.sendRegistrationEmail = async (email, username) => {
    try {
        const registrationEmailMessage = {
            from:process.env.nodemailerFromEmail,
            to: email.toString(),
            subject:'Registration Completed',
            text:`Thank you for registering, ${username}.\nRegards,\nAbhinav Parashar`
        }
        await transporter.sendMail(registrationEmailMessage, function(err,info){
            if(err){
                return err
            }
            return 
        })
    } catch (error) {
        return error
    }
}