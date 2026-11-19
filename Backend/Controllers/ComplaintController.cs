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

        // ==========================================
        // 1. CREATE COMPLAINT
        // POST: api/Complaint
        // ==========================================

        [HttpPost]
        public async Task<IActionResult> CreateComplaint(
            [FromForm] Complaint complaint,
            IFormFile? Image)
        {
            try
            {
                if (complaint.UserId <= 0)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Please login before submitting a complaint."
                    });
                }

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

                // Upload complaint image
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

                complaint.Status = "Pending";
                complaint.TechnicianId = null;
                complaint.CreatedAt = DateTime.Now;

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
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Error saving complaint.",
                    error = ex.Message
                });
            }
        }


        // ==========================================
        // 2. GET STUDENT COMPLAINTS
        // GET: api/Complaint/student/{userId}
        // ==========================================

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
                    message = "Error loading student complaints."
                });
            }
        }


        // ==========================================
        // 3. TRACK COMPLAINT
        // GET: api/Complaint/track/CMP-2026-007
        // ==========================================

        [HttpGet("track/{complaintNumber}")]
        public async Task<IActionResult> TrackComplaint(
            string complaintNumber)
        {
            try
            {
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
                        imagePath = c.ImagePath,
                        technicianId = c.TechnicianId
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
                    message = "Error tracking complaint."
                });
            }
        }


        // ==========================================
        // 4. GET ALL COMPLAINTS
        // GET: api/Complaint/all
        // ==========================================

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
                        technicianId = c.TechnicianId,
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
                    message = "Error loading all complaints."
                });
            }
        }


        // ==========================================
        // 5. GET TECHNICIAN ASSIGNED COMPLAINTS
        // GET: api/Complaint/technician/{technicianId}
        // ==========================================

        [HttpGet("technician/{technicianId}")]
        public async Task<IActionResult> GetTechnicianComplaints(
            int technicianId)
        {
            try
            {
                var technicianExists = await _context.Technicians
                    .AnyAsync(t =>
                        t.TechnicianId == technicianId &&
                        t.IsApproved);

                if (!technicianExists)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Approved technician not found."
                    });
                }

                var complaints = await _context.Complaints
                    .AsNoTracking()
                    .Where(c => c.TechnicianId == technicianId)
                    .OrderByDescending(c => c.CreatedAt)
                    .Select(c => new
                    {
                        id = c.Id,
                        title = c.Problem,
                        category = c.Category,
                        priority = c.Priority,
                        location = c.Location,
                        description = c.Description,
                        status = c.Status,
                        createdAt = c.CreatedAt
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
                    message = "Unable to load assigned complaints."
                });
            }
        }


        // ==========================================
        // 6. ASSIGN TECHNICIAN TO COMPLAINT
        // PUT: api/Complaint/{id}/assign
        // ==========================================

        [HttpPut("{id}/assign")]
        public async Task<IActionResult> AssignTechnician(
            int id,
            [FromBody] AssignTechnicianRequest request)
        {
            try
            {
                if (request == null || request.TechnicianId <= 0)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Valid technician ID is required."
                    });
                }

                var complaint = await _context.Complaints
                    .FindAsync(id);

                if (complaint == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Complaint not found."
                    });
                }

                // Only approved technicians can be assigned
                var technician = await _context.Technicians
                    .FirstOrDefaultAsync(t =>
                        t.TechnicianId == request.TechnicianId &&
                        t.IsApproved);

                if (technician == null)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Technician not found or not approved."
                    });
                }

                complaint.TechnicianId = technician.TechnicianId;
                complaint.Status = "Assigned";

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Technician assigned successfully.",
                    technicianId = technician.TechnicianId,
                    technicianName = technician.Name,
                    complaintId = complaint.Id
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Unable to assign technician."
                });
            }
        }


        // ==========================================
        // 7. UPDATE COMPLAINT STATUS
        // PUT: api/Complaint/{id}/status
        // ==========================================

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateComplaintStatus(
            int id,
            [FromBody] UpdateComplaintStatusRequest request)
        {
            try
            {
                if (request == null ||
                    request.TechnicianId <= 0 ||
                    string.IsNullOrWhiteSpace(request.Status))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Technician ID and status are required."
                    });
                }

                var complaint = await _context.Complaints
                    .FindAsync(id);

                if (complaint == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Complaint not found."
                    });
                }

                // Check that complaint belongs to this technician
                if (complaint.TechnicianId != request.TechnicianId)
                {
                    return Forbid();
                }

                // Check technician approval
                var approved = await _context.Technicians
                    .AnyAsync(t =>
                        t.TechnicianId == request.TechnicianId &&
                        t.IsApproved);

                if (!approved)
                {
                    return Forbid();
                }

                if (request.Status != "In Progress" &&
                    request.Status != "Resolved")
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Only In Progress or Resolved status is allowed."
                    });
                }

                complaint.Status = request.Status;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Complaint status updated successfully.",
                    complaintId = complaint.Id,
                    status = complaint.Status
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Unable to update complaint status."
                });
            }
        }
    }


    // ==========================================
    // REQUEST MODELS
    // ==========================================

    public class AssignTechnicianRequest
    {
        public int TechnicianId { get; set; }
    }

    public class UpdateComplaintStatusRequest
    {
        public int TechnicianId { get; set; }

        public string Status { get; set; } = "";
    }
}