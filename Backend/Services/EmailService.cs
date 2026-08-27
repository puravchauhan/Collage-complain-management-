using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace backend.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendVerificationEmail(
            string studentEmail,
            string studentName,
            string verificationLink)
        {
            string senderEmail =
                _configuration["EmailSettings:SenderEmail"]
                ?? throw new Exception("Sender email is missing.");

            string senderPassword =
                _configuration["EmailSettings:SenderPassword"]
                ?? throw new Exception("Sender password is missing.");

            if (string.IsNullOrWhiteSpace(studentEmail))
                throw new Exception("Student email is empty.");

            var message = new MimeMessage();

            message.From.Add(
                new MailboxAddress(
                    "College Complaint Management",
                    senderEmail
                )
            );

            message.To.Add(
                new MailboxAddress(
                    studentName,
                    studentEmail
                )
            );

            message.Subject =
                "Verify Your College Complaint Management Account";

            message.Body = new TextPart("html")
            {
                Text = $@"
                       <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        </head>

        <body style='margin:0; padding:0; background:#f4f6f9;
                     font-family:Arial, Helvetica, sans-serif;'>

        <table width='100%' cellpadding='0' cellspacing='0'
               style='padding:40px 15px; background:#f4f6f9;'>
        <tr>
        <td align='center'>

        <table width='600' cellpadding='0' cellspacing='0'
               style='max-width:600px; width:100%;
                      background:#ffffff;
                      border-radius:12px;
                      overflow:hidden;
                      box-shadow:0 4px 18px rgba(0,0,0,0.08);'>

            <!-- HEADER -->
            <tr>
                <td align='center'
                    style='background:#11233d; padding:30px 20px;'>

                    <div style='font-size:26px;
                                font-weight:bold;
                                color:#ffffff;'>
                        College Complaint Management
                    </div>

                    <div style='margin-top:8px;
                                font-size:14px;
                                color:#cbd5e1;'>
                        Your voice matters. We're here to listen.
                    </div>

                </td>
            </tr>

            <!-- CONTENT -->
            <tr>
                <td style='padding:40px;'>

                    <h2 style='margin:0 0 20px;
                               color:#11233d;
                               font-size:24px;'>
                        Welcome, {studentName}! 👋
                    </h2>

                    <p style='font-size:16px;
                              line-height:1.7;
                              color:#334155;'>
                        Thank you for creating your account with
                        <strong>College Complaint Management</strong>.
                    </p>

                    <p style='font-size:16px;
                              line-height:1.7;
                              color:#334155;'>
                        To complete your registration and keep your account secure,
                        please verify your email address by clicking the button below.
                    </p>

                    <!-- BUTTON -->
                    <div style='text-align:center; margin:30px 0;'>

                        <a href='{verificationLink}'
                           style='display:inline-block;
                                  padding:14px 32px;
                                  background:#11233d;
                                  color:#ffffff;
                                  text-decoration:none;
                                  border-radius:6px;
                                  font-size:15px;
                                  font-weight:bold;'>
                            VERIFY MY EMAIL
                        </a>

                    </div>

                    <!-- EXPIRY -->
                    <div style='background:#f1f5f9;
                                border-left:4px solid #11233d;
                                padding:15px;
                                border-radius:5px;
                                color:#475569;
                                font-size:14px;
                                line-height:1.6;'>

                        <strong>Important:</strong>
                        This verification link will expire in
                        <strong>24 hours</strong>.

                    </div>

                    <p style='margin-top:25px;
                              font-size:14px;
                              line-height:1.6;
                              color:#64748b;'>
                        If you did not create this account, you can safely ignore
                        this email. No further action is required.
                    </p>

                </td>
            </tr>

            <!-- FOOTER -->
            <tr>
                <td style='background:#f8fafc;
                           padding:25px 40px;
                           border-top:1px solid #e2e8f0;'>

                    <p style='margin:0;
                              font-size:14px;
                              color:#475569;'>
                        Regards,
                    </p>

                    <p style='margin:6px 0 0;
                              font-size:14px;
                              font-weight:bold;
                              color:#11233d;'>
                        College Complaint Management Team
                    </p>

                    <p style='margin:15px 0 0;
                              font-size:12px;
                              color:#94a3b8;'>
                        This is an automated email. Please do not reply to this message.
                    </p>

                </td>
            </tr>

        </table>

        <p style='margin-top:20px;
                  font-size:12px;
                  color:#94a3b8;'>
            © 2026 College Complaint Management. All rights reserved.
        </p>

        </td>
        </tr>
        </table>

        </body>
        </html>
                "
            };

            using var smtp = new SmtpClient();

            try
            {
                Console.WriteLine("Connecting to Gmail...");

                await smtp.ConnectAsync(
                    "smtp.gmail.com",
                    587,
                    SecureSocketOptions.StartTls
                );

                Console.WriteLine("Connected to Gmail.");

                Console.WriteLine(
                    $"Authenticating sender: {senderEmail}"
                );

                await smtp.AuthenticateAsync(
                    senderEmail,
                    senderPassword
                );

                Console.WriteLine("Gmail authentication successful.");

                await smtp.SendAsync(message);

                Console.WriteLine(
                    $"Email sent successfully to {studentEmail}"
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine("========== EMAIL ERROR ==========");
                Console.WriteLine(ex.ToString());
                Console.WriteLine("=================================");

                throw;
            }
            finally
            {
                if (smtp.IsConnected)
                {
                    await smtp.DisconnectAsync(true);
                }
            }
        }
    }
}