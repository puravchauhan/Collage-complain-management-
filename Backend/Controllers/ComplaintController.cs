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

                // Image upload
                if (Image != null && Image.Length > 0)
                {
                    // Create uploads folder
                    var uploadsFolder = Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "wwwroot",
                        "uploads"
                    );

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    // Create unique file name
                    var fileName = Guid.NewGuid().ToString()
                        + Path.GetExtension(Image.FileName);

                    // Complete file path
                    var filePath = Path.Combine(
                        uploadsFolder,
                        fileName
                    );

                    // Save image
                    using (var stream = new FileStream(
                        filePath,
                        FileMode.Create))
                    {
                        await Image.CopyToAsync(stream);
                    }

                    // Save image path in database
                    complaint.ImagePath = "/uploads/" + fileName;
                }

                // Default values
                complaint.Status = "Pending";
                complaint.CreatedAt = DateTime.Now;

                // Save complaint
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

        // GET: api/Complaint
        [HttpGet("student/{userId}")]
        public async Task<IActionResult> GetStudentComplaints(int userId)
        {
            try
            {
                var complaints = await _context.Complaints
                    .Where(c => c.UserId == userId)
                    .OrderByDescending(c => c.CreatedAt)
                    .ToListAsync();

                return Ok(complaints);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error loading complaints.",
                    error = ex.Message
                });
            }
        }
    }
}