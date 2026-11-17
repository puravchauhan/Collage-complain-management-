using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComplaintController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ComplaintController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Complaint
        // Submit a new complaint
        [HttpPost]
        public async Task<IActionResult> CreateComplaint(
            [FromForm] Complaint complaint,
            IFormFile? Image)
        {
            try
            {
                // Check User ID
                if (complaint.UserId <= 0)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Please login before submitting a complaint."
                    });
                }

                // Check required fields
                if (string.IsNullOrWhiteSpace(complaint.Category) ||
                    string.IsNullOrWhiteSpace(complaint.Problem) ||
                    string.IsNullOrWhiteSpace(complaint.Priority) ||
                    string.IsNullOrWhiteSpace(complaint.Location) ||
                    string.IsNullOrWhiteSpace(complaint.Description))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "All fields are required."
                    });
                }

                // Upload image if provided
                if (Image != null && Image.Length > 0)
                {
                    var uploadsFolder = Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "wwwroot",
                        "uploads"
                    );

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var fileName = Guid.NewGuid().ToString()
                        + Path.GetExtension(Image.FileName);

                    var filePath = Path.Combine(
                        uploadsFolder,
                        fileName
                    );

                    using (var stream = new FileStream(
                        filePath,
                        FileMode.Create))
                    {
                        await Image.CopyToAsync(stream);
                    }

                    complaint.ImagePath = "/uploads/" + fileName;
                }

                // Set default values
                complaint.Status = "Pending";
                complaint.CreatedAt = DateTime.Now;

                // Save complaint to database
                _context.Complaints.Add(complaint);

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Complaint submitted successfully.",
                    complaintId = complaint.Id
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("COMPLAINT ERROR:");
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Error saving complaint.",
                    error = ex.Message
                });
            }
        }

        // GET: api/Complaint/student/{userId}
        // Get complaints belonging to a specific student
        [HttpGet("student/{userId}")]
        public async Task<IActionResult> GetStudentComplaints(int userId)
        {
            try
            {
                var complaints = await _context.Complaints
                    .AsNoTracking()
                    .Where(c => c.UserId == userId)
                    .OrderByDescending(c => c.CreatedAt)
                    .ToListAsync();

                return Ok(complaints);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Error loading student complaints.",
                    error = ex.Message
                });
            }
        }



        // GET: api/Complaint/track/CMP-2026-007
        [HttpGet("track/{complaintNumber}")]
        public async Task<IActionResult> TrackComplaint(string complaintNumber)
        {
            try
            {
                // Check complaint number format: CMP-YYYY-XXX
                var parts = complaintNumber.Split('-');

                if (parts.Length != 3 ||
                    parts[0] != "CMP" ||
                    !int.TryParse(parts[1], out int year) ||
                    !int.TryParse(parts[2], out int number))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Invalid complaint ID format. Use CMP-2026-007."
                    });
                }

                var complaint = await _context.Complaints
                    .AsNoTracking()
                    .Where(c =>
                        c.Id == number &&
                        c.CreatedAt.Year == year)
                    .Select(c => new
                    {
                        complaintId = "CMP-" +
                            c.CreatedAt.Year + "-" +
                            c.Id.ToString("D3"),

                        id = c.Id,
                        title = c.Problem,
                        category = c.Category,
                        priority = c.Priority,
                        location = c.Location,
                        description = c.Description,
                        status = c.Status,
                        createdAt = c.CreatedAt,
                        imagePath = c.ImagePath
                    })
                    .FirstOrDefaultAsync();

                if (complaint == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Complaint not found. Please check your complaint ID."
                    });
                }

                return Ok(new
                {
                    success = true,
                    complaint
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Error tracking complaint.",
                    error = ex.Message
                });
            }
        }


        // GET: api/Complaint/all
        // Get all complaints for the admin dashboard
        [HttpGet("all")]
        public async Task<IActionResult> GetAllComplaints()
        {
            try
            {
                var complaints = await _context.Complaints
                    .AsNoTracking()
                    .OrderByDescending(c => c.CreatedAt)
                    .Select(c => new
                    {
                        id = c.Id,
                        category = c.Category,
                        title = c.Problem,
                        priority = c.Priority,
                        location = c.Location,
                        description = c.Description,
                        status = c.Status,
                        date = c.CreatedAt,
                        userId = c.UserId,
                        imagePath = c.ImagePath
                    })
                    .ToListAsync();

                return Ok(complaints);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Error loading all complaints.",
                    error = ex.Message
                });
            }
        }
    }
}