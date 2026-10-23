
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminManagementController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminManagementController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/AdminManagement/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromBody] AdminLoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Email and password are required."
                });
            }

            var email = request.Email.Trim();

            var admin = await _context.Admins
                .FirstOrDefaultAsync(a => a.Email == email);

            // Assumes the existing database stores plain-text passwords.
            if (admin == null || admin.Password != request.Password)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "Invalid email or password."
                });
            }

            return Ok(new
            {
                success = true,
                message = "Login successful.",
                user = new
                {
                    id = admin.Id,
                    name = admin.Name,
                    email = admin.Email,
                    role = admin.Role
                }
            });
        }

        // GET: api/AdminManagement/users
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .AsNoTracking()
                .Select(u => new
                {
                    id = u.Id,
                    name = u.FullName,
                    email = u.Email
                })
                .ToListAsync();

            return Ok(users);
        }

        // DELETE: api/AdminManagement/users/5
        [HttpDelete("users/{id:int}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound(new
                {
                    success = false,
                    message = "User not found."
                });
            }

            var userComplaints = await _context.Complaints
                .Where(c => c.UserId == id)
                .ToListAsync();

            _context.Complaints.RemoveRange(userComplaints);
            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "User and their complaints deleted successfully."
            });
        }

        // GET: api/AdminManagement/complaints
        [HttpGet("complaints")]
        public async Task<IActionResult> GetComplaints()
        {
            var complaints = await _context.Complaints
                .AsNoTracking()
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new
                {
                    id = c.Id,
                    userId = c.UserId,
                    category = c.Category,
                    problem = c.Problem,
                    priority = c.Priority,
                    location = c.Location,
                    description = c.Description,
                    status = c.Status,
                    createdAt = c.CreatedAt,
                    imagePath = c.ImagePath
                })
                .ToListAsync();

            return Ok(complaints);
        }

        // DELETE: api/AdminManagement/complaints/5
        [HttpDelete("complaints/{id:int}")]
        public async Task<IActionResult> DeleteComplaint(int id)
        {
            var complaint = await _context.Complaints
                .FirstOrDefaultAsync(c => c.Id == id);

            if (complaint == null)
            {
                return NotFound(new
                {
                    success = false,
                    message = "Complaint not found."
                });
            }

            _context.Complaints.Remove(complaint);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "Complaint deleted successfully."
            });
        }

        // GET: api/AdminManagement/admins
        [HttpGet("admins")]
        public async Task<IActionResult> GetAdmins()
        {
            var admins = await _context.Admins
                .AsNoTracking()
                .Select(a => new
                {
                    id = a.Id,
                    name = a.Name,
                    email = a.Email,
                    role = a.Role
                })
                .ToListAsync();

            return Ok(admins);
        }

        // DELETE: api/AdminManagement/admins/5
        [HttpDelete("admins/{id:int}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            var admin = await _context.Admins
                .FirstOrDefaultAsync(a => a.Id == id);

            if (admin == null)
            {
                return NotFound(new
                {
                    success = false,
                    message = "Admin not found."
                });
            }

            var adminCount = await _context.Admins.CountAsync();

            if (adminCount <= 1)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "The last admin account cannot be deleted."
                });
            }

            _context.Admins.Remove(admin);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "Admin deleted successfully."
            });
        }
    }

    public class AdminLoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
