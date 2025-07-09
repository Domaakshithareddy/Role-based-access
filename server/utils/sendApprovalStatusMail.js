const transporter=require('./mailer')

const sendApprovalStatusMail=async ({name,email,status})=>{
    const subject=status==='approved' ? 'Your Admin Request Has Been Approved' : 'Your Admin Request Has Been Rejected';
    const message=status==='approved' 
        ? `
            <p>Hi ${name},</p>
            <p>Congratulations! Your request to become an admin has been <strong>approved</strong>.</p>
            <p>You can now login with your existing credentials and access admin controls.</p>
        `
        : `
            <p>Hi ${name},</p>
            <p>Unfortunately, your request to become an admin has been <strong>rejected</strong>.</p>
            <p>You may continue using your account with regular user privileges.</p>
        `;

    await transporter.sendMail({
        from: `"Admin Access System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html: message
    });
};

module.exports=sendApprovalStatusMail;