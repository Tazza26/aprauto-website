const {Resend} = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async function (event) {
  try {
    const data = JSON.parse(event.body);

    const services = Array.isArray(data.service)
      ? data.service.join(", ")
      : "None selected";

    const {data: emailData, error} = await resend.emails.send({
      from: "APR Bookings <noreply@aprauto.com.au>",
      to: "admin@aprauto.com.au",
      replyTo: data.email,
      subject: `New Booking Request from ${data.name}`,

      text: `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Rego: ${data.rego}
        Vehicle: ${data.vehicle}
        Kilometers: ${data.kilometers}
        Preferred Date: ${data.preferred_date}
        Services: ${services}

        Message: 
        ${data.message}
      `,
    });

    if (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error,
        }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Email sent successfully!",
        emailData,  
       }),
    };

  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Failed to send email.",
      }),
    };
  }
};
