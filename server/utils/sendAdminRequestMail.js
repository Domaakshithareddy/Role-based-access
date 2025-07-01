const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const sendAdminRequestMail = async (user) => {
  try {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = {
      to: [{ email: process.env.ADMIN_EMAIL_TO }],
      sender: { name: "RBAC App", email: "90ee79001@smtp-brevo.com" },
      subject: "New Admin Access Request",
      htmlContent: `<p>User <strong>${user.name}</strong> with email <strong>${user.email}</strong> requested admin access.</p><p>MongoDB ID: <code>${user._id}</code></p>`,
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent to admin:", response.messageId || response);
  } catch (error) {
    console.error("Brevo API error:", error.response?.body || error.message);
  }
};

module.exports = sendAdminRequestMail;
