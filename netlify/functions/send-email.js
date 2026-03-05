const sgMail = require("@sendgrid/mail");

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: "autopts@bigpond.net.au",
      from: "noreply@aprauto.com.au",
      subject: `New Quote Request from ${data.name}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Service: ${data.service}
        Message: ${data.message}
      `,
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Email failed to send." }),
    };
  }
};
