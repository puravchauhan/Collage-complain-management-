using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher;

        public LoginController(ApplicationDbContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
        }

        [HttpPost]
        public async Task<IActionResult> Login(
            [FromBody] LoginRequest request)
        {
            try
            {
                // -----------------------------
                // 1. CHECK INPUT
                // -----------------------------

                if (request == null)
                {
                    return BadRequest(new
                    {
                        message = "Login data is required."
                    });
                }

                if (string.IsNullOrWhiteSpace(request.Email))
                {
                    return BadRequest(new
                    {
                        message = "Email is required."
                    });
                }

                if (string.IsNullOrWhiteSpace(request.Password))
                {
                    return BadRequest(new
                    {
                        message = "Password is required."
                    });
                }


                // -----------------------------
                // 2. CLEAN EMAIL
                // -----------------------------

                string email = request.Email
                    .Trim()
                    .ToLower();


                Console.WriteLine("--------------------------------");
                Console.WriteLine("LOGIN REQUEST");
                Console.WriteLine("Email: " + email);
                Console.WriteLine("--------------------------------");


                // -----------------------------
                // 3. FIND USER
                // -----------------------------

                var user = await _context.Users
                    .FirstOrDefaultAsync(u =>
                        u.Email.ToLower() == email);


                if (user == null)
                {
                    Console.WriteLine("USER NOT FOUND");

                    return Unauthorized(new
                    {
                        message = "Invalid email or password."
                    });
                }


                Console.WriteLine("USER FOUND");
                Console.WriteLine("Database Email: " + user.Email);
                Console.WriteLine("User ID: " + user.Id);
                Console.WriteLine("Verified: " + user.IsEmailVerified);
                Console.WriteLine("Password Hash Length: " +
                                  user.PasswordHash.Length);


                // -----------------------------
                // 4. CHECK EMAIL VERIFICATION
                // -----------------------------

                if (!user.IsEmailVerified)
                {
                    Console.WriteLine("EMAIL NOT VERIFIED");

                    return Unauthorized(new
                    {
                        message =
                            "Please verify your email before logging in."
                    });
                }


                // -----------------------------
                // 5. CHECK PASSWORD
                // -----------------------------

                var passwordResult =
                    _passwordHasher.VerifyHashedPassword(
                        user,
                        user.PasswordHash,
                        request.Password
                    );


                Console.WriteLine(
                    "PASSWORD RESULT: " +
                    passwordResult
                );


                if (passwordResult ==
                    PasswordVerificationResult.Failed)
                {
                    Console.WriteLine("PASSWORD INCORRECT");

                    return Unauthorized(new
                    {
                        message = "Invalid email or password."
                    });
                }


                // -----------------------------
                // 6. LOGIN SUCCESS
                // -----------------------------

                Console.WriteLine("LOGIN SUCCESS");


                return Ok(new
                {
                    message = "Login successful.",

                    user = new
                    {
                        id = user.Id,
                        fullName = user.FullName,
                        studentId = user.StudentId,
                        email = user.Email,
                        phone = user.Phone,
                        department = user.Department,
                        semester = user.Semester,
                        role = user.Role
                    }
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("LOGIN ERROR");
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    message = "Login failed.",
                    error = ex.Message
                });
            }
        }
    }
}