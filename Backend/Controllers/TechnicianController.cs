using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TechnicianController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly PasswordHasher<Technician> _hasher =
            new PasswordHasher<Technician>();

        public TechnicianController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // 1. TECHNICIAN REGISTRATION
        // POST: api/Technician/register
        // ==========================================

        [HttpPost("register")]
        public async Task<IActionResult> Register(
            [FromBody] TechnicianRegisterRequest request)
        {
            try
            {
                if (request == null ||
                    string.IsNullOrWhiteSpace(request.Name) ||
                    string.IsNullOrWhiteSpace(request.Email) ||
                    string.IsNullOrWhiteSpace(request.Phone) ||
                    string.IsNullOrWhiteSpace(request.Password))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "All fields are required."
                    });
                }

                if (request.Name.Trim().Length < 2)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Enter a valid name."
                    });
                }

                if (request.Password.Length < 6)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Password must contain at least 6 characters."
                    });
                }

                string email = request.Email.Trim().ToLowerInvariant();

                bool emailExists = await _context.Technicians
                    .AnyAsync(t => t.Email == email);

                if (emailExists)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Email is already registered."
                    });
                }

                var technician = new Technician
                {
                    Name = request.Name.Trim(),
                    Email = email,
                    Phone = request.Phone.Trim(),
                    IsApproved = false,
                    CreatedAt = DateTime.Now
                };

                // Hash password securely
                technician.PasswordHash =
                    _hasher.HashPassword(
                        technician,
                        request.Password
                    );

                _context.Technicians.Add(technician);

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Registration successful. Please wait for admin approval."
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Technician registration failed."
                });
            }
        }


        // ==========================================
        // 2. TECHNICIAN LOGIN
        // POST: api/Technician/login
        // ==========================================

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromBody] TechnicianLoginRequest request)
        {
            try
            {
                if (request == null ||
                    string.IsNullOrWhiteSpace(request.Email) ||
                    string.IsNullOrWhiteSpace(request.Password))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Email and password are required."
                    });
                }

                string email = request.Email.Trim().ToLowerInvariant();

                var technician = await _context.Technicians
                    .FirstOrDefaultAsync(t => t.Email == email);

                if (technician == null)
                {
                    return Unauthorized(new
                    {
                        success = false,
                        message = "Incorrect email or password."
                    });
                }

                // Check Admin approval
                if (!technician.IsApproved)
                {
                    return StatusCode(403, new
                    {
                        success = false,
                        message = "Your account is waiting for admin approval."
                    });
                }

                // Verify hashed password
                var result = _hasher.VerifyHashedPassword(
                    technician,
                    technician.PasswordHash,
                    request.Password
                );

                if (result == PasswordVerificationResult.Failed)
                {
                    return Unauthorized(new
                    {
                        success = false,
                        message = "Incorrect email or password."
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Login successful.",

                    technician = new
                    {
                        technicianId = technician.TechnicianId,
                        name = technician.Name,
                        email = technician.Email,
                        phone = technician.Phone
                    }
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Technician login failed."
                });
            }
        }


        // ==========================================
        // 3. GET PENDING TECHNICIANS
        // GET: api/Technician/pending
        // ==========================================

        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingTechnicians()
        {
            try
            {
                var technicians = await _context.Technicians
                    .AsNoTracking()
                    .Where(t => !t.IsApproved)
                    .OrderByDescending(t => t.CreatedAt)
                    .Select(t => new
                    {
                        technicianId = t.TechnicianId,
                        name = t.Name,
                        email = t.Email,
                        phone = t.Phone,
                        createdAt = t.CreatedAt
                    })
                    .ToListAsync();

                return Ok(technicians);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Unable to load pending technicians."
                });
            }
        }

        // ==========================================
        // 5. GET APPROVED TECHNICIANS
        // GET: api/Technician/approved
        // ==========================================

        [HttpGet("approved")]
        public async Task<IActionResult> GetApprovedTechnicians()
        {
            try
            {
                var technicians = await _context.Technicians
                    .AsNoTracking()
                    .Where(t => t.IsApproved == true)
                    .OrderBy(t => t.Name)
                    .Select(t => new
                    {
                        technicianId = t.TechnicianId,
                        name = t.Name,
                        email = t.Email,
                        phone = t.Phone,
                        createdAt = t.CreatedAt
                    })
                    .ToListAsync();

                return Ok(technicians);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Unable to load approved technicians."
                });
            }
        }

        // ==========================================
        // 4. ADMIN APPROVES TECHNICIAN
        // PUT: api/Technician/approve/{id}
        // ==========================================

        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApproveTechnician(int id)
        {
            try
            {
                var technician = await _context.Technicians
                    .FindAsync(id);

                if (technician == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Technician not found."
                    });
                }

                if (technician.IsApproved)
                {
                    return Ok(new
                    {
                        success = true,
                        message = "Technician is already approved."
                    });
                }

                technician.IsApproved = true;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Technician approved successfully."
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Technician approval failed."
                });
            }
        }
    }


    // ==========================================
    // REGISTRATION REQUEST MODEL
    // ==========================================

    public class TechnicianRegisterRequest
    {
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Password { get; set; } = "";
    }


    // ==========================================
    // LOGIN REQUEST MODEL
    // ==========================================

    public class TechnicianLoginRequest
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }
}