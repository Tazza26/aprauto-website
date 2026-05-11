const sgMail = require("@sendgrid/mail");

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: "admin@aprauto.com.au",
      from: "noreply@aprauto.com.au",
      subject: `New Quote Request from ${data.name}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Rego: ${data.rego}
        Vehicle: ${data.vehicle}
        Kilometers: ${data.kilometers}
        Preferred Date: ${data.preferred_date}
        Services: ${data.service.join(", ")}
        Message: ${data.message}
      `,
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    
    console.log(error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
