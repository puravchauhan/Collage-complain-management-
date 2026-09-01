using backend.Data;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly EmailService _emailService;

        public AuthController(
            ApplicationDbContext context,
            EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // ==========================================
        // REGISTER
        // ==========================================

        [HttpPost("register")]
        public async Task<IActionResult> Register(
            User request)
        {
            try
            {
                // Check email
                var existingEmail =
                    await _context.Users
                    .FirstOrDefaultAsync(
                        x => x.Email == request.Email
                    );

                if (existingEmail != null)
                {
                    return BadRequest(new
                    {
                        message = "Email already registered."
                    });
                }

                // Check Student ID
                var existingStudent =
                    await _context.Users
                    .FirstOrDefaultAsync(
                        x => x.StudentId == request.StudentId
                    );

                if (existingStudent != null)
                {
                    return BadRequest(new
                    {
                        message = "Student ID already registered."
                    });
                }

                // Password hashing
                var passwordHasher =
                    new PasswordHasher<User>();

                // Generate verification token
                string verificationToken =
                    Guid.NewGuid().ToString("N");

                // Create user
                var user = new User
                {
                    FullName = request.FullName,

                    StudentId = request.StudentId,

                    Email = request.Email,

                    Phone = request.Phone,

                    Department = request.Department,

                    Semester = request.Semester,

                    PasswordHash =
                        passwordHasher.HashPassword(
                            null!,
                            request.PasswordHash
                        ),

                    Role = "Student",

                    IsEmailVerified = false,

                    VerificationToken =
                        verificationToken,

                    VerificationTokenExpiry =
                        DateTime.UtcNow.AddHours(24),

                    CreatedAt = DateTime.UtcNow
                };

                // Save student
                _context.Users.Add(user);

                await _context.SaveChangesAsync();

                // ==========================================
                // CREATE VERIFICATION LINK
                // ==========================================

                string verificationLink =
                    $"https://localhost:7277/api/Auth/verify-email?token={verificationToken}";

                // ==========================================
                // SEND EMAIL
                // ==========================================

                try
                {
                    await _emailService.SendVerificationEmail(
                        user.Email,
                        user.FullName,
                        verificationLink
                    );
                }
                catch (Exception emailError)
                {
                    Console.WriteLine(
                        "EMAIL ERROR:"
                    );

                    Console.WriteLine(
                        emailError.ToString()
                    );

                    return Ok(new
                    {
                        message =
                            "Registration successful, but verification email could not be sent."
                    });
                }

                return Ok(new
                {
                          message =
                        "Registration successful. Please check your email to verify your account."
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(
                    ex.ToString()
                );

                return StatusCode(500, new
                {
                    message = "Registration failed.",
                    error = ex.Message
                });
            }
        }


        // ==========================================
        // VERIFY EMAIL
        // ==========================================

        [HttpGet("verify-email")]
        public async Task<IActionResult> VerifyEmail(
            string token)
        {
            try
            {
                // Find user using token
                var user =
                    await _context.Users
                    .FirstOrDefaultAsync(
                        x => x.VerificationToken == token
                    );

                if (user == null)
                {
                    return BadRequest(new
                    {
                        message =
                            "Invalid verification link."
                    });
                }

                // Check expiry
                if (
                    user.VerificationTokenExpiry == null ||
                    user.VerificationTokenExpiry <
                    DateTime.UtcNow
                )
                {
                    return BadRequest(new
                    {
                        message =
                            "Verification link has expired."
                    });
                }

                // Verify email
                user.IsEmailVerified = true;

                // Remove token
                user.VerificationToken = null;

                user.VerificationTokenExpiry = null;

                await _context.SaveChangesAsync();

                return Content(@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>

    <title>Email Verified</title>

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background: #FDF5E6;
            min-height: 100vh;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .success-box {
            width: 450px;
            max-width: 90%;
            background: #ffffff;
            padding: 45px 35px;
            text-align: center;

            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.10);
        }

        .icon {
            width: 70px;
            height: 70px;
            margin: 0 auto 20px;

            background: #11233d;
            color: white;

            border-radius: 50%;

            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 35px;
        }

        h1 {
            color: #11233d;
            font-size: 25px;
            margin-bottom: 15px;
        }

        p {
            color: #64748b;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 25px;
        }

        .login-btn {
            display: inline-block;

            padding: 13px 30px;

            background: #11233d;
            color: white;

            text-decoration: none;
            border-radius: 6px;

            font-size: 15px;
            font-weight: bold;
        }

        .login-btn:hover {
            background: #1d3557;
        }
    </style>
</head>

<body>

    <div class='success-box'>

        <div class='icon'>
            ✓
        </div>

        <h1>Email Verified Successfully!</h1>

        <p>
            Your email address has been successfully verified.
            You can now login to your College Complaint Management account.
        </p>

        <a href='http://localhost:5173/login'
           class='login-btn'>
            Go to Login
        </a>

    </div>

</body>
</html>
", "text/html");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message =
                        "Email verification failed.",

                    error =
                        ex.Message
                });
            }
        }


    }




}