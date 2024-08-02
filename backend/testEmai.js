require('dotenv').config();
const { sendBookingInformation } = require("./services/emailService")

sendBookingInformation('joververgara1@gmail.com', { test: 'Test booking details' })
  .then(() => console.log('Test email sent successfully'))
  .catch(error => console.error('Error sending test email:', error));