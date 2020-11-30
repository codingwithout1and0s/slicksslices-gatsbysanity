const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `
    <div>
    <h2>Your Recent ORder for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 minutes.</p>
    <ul>
    ${order
      .map(
        (item) => `<li>
    <img src="${item.thumbail}" alt="${item.name}" />
    ${item.size} ${item.name} - ${item.price}
    </li>`
      )
      .join('')}
    </ul>
    <p>Your total is ${total} due at pickup.</p>
    </div>
  `;
}

// Create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  await wait(5000);
  const body = JSON.parse(event.body);

  // Check if user filled out honeypot/mapleSyrup
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boop beep bop zzzzstt good bye ERR 34234',
      }),
    };
  }

  // validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // Make sure there are items in the order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `There are 0 items in your order!`,
      }),
    };
  }

  // send the email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
