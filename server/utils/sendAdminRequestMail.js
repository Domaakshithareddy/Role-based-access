const transporter = require('./mailer');

const sendAdminRequestMail = async ({ name, email, _id }) => {
  if (!process.env.ADMIN_EMAIL) {
    throw new Error('ADMIN_EMAIL not defined in .env');
  }

  await transporter.sendMail({
    from: `"Admin Access System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: 'Admin Access Request',
    html: `
      <h2>Admin Role Requested</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>User ID:</strong> ${_id}</p>
      <p>This user was saved as <code>role: 'user'</code>. Approve manually in MongoDB if valid.</p>
    `
  });
};

module.exports = sendAdminRequestMail;
