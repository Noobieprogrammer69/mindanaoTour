const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
        user: "jover8500@gmail.com",
        pass: "miglfniyskwjcjqq"
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendBookingInformation = async (to, bookingDetails, tour) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
            subject: `Your Tour Booking: ${tour.title}`,
            text: `Dear ${bookingDetails.firstName} ${bookingDetails.lastName},

                    Thank you for booking the ${tour.title} tour with us!

                    We are excited to have you on this journey. Below are your booking details:
                    - Tour: ${tour.title}
                    - First Name: ${bookingDetails.firstName}
                    - Last Name: ${bookingDetails.lastName}
                    - Email: ${bookingDetails.email}
                    - Country: ${bookingDetails.country}
                    - Address: ${bookingDetails.streetAddress}, ${bookingDetails.city}, ${bookingDetails.state}, ${bookingDetails.postalCode}

                    Please ensure to check your email regularly for any updates regarding your tour.

                    Thank you for choosing our services. We hope you have a fantastic and safe experience!

                    Best regards,
                    The Tour Company Team`
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
      }
}

module.exports = { sendBookingInformation }