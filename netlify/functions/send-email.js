const sgMail = require("@sendgrid/mail");

exports.handler = async function (event) {
  try {
    const data = JSON.parse(event.body);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const services = Array.isArray(data.service)
      ? data.service.join(", ")
      : "None selected";

    const msg = {
      to: "admin@aprauto.com.au",
      from: "noreply@aprauto.com.au",
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
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Email sent successfully!",
       }),
    };

  } catch (error) {
    console.error("SENDGRID ERROR:", error);
    console.error("SENDGRID RESPONSE:", error.response?.body);

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Failed to send email.",
      }),
    };
  }
};
