
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] ContactMessage message)
        {
            try
            {
                if (message == null)
                {
                    return BadRequest(new
                    {
                        message = "Invalid request."
                    });
                }

                if (string.IsNullOrWhiteSpace(message.Name) ||
                    string.IsNullOrWhiteSpace(message.Email) ||
                    string.IsNullOrWhiteSpace(message.Subject) ||
                    string.IsNullOrWhiteSpace(message.Message))
                {
                    return BadRequest(new
                    {
                        message = "All fields are required."
                    });
                }

                message.Id = 0;
                message.CreatedAt = DateTime.UtcNow;

                _context.ContactMessages.Add(message);

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    message = "Your message has been sent successfully."
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("CONTACT ERROR:");
                Console.WriteLine(ex.ToString());

                return StatusCode(500, new
                {
                    success = false,
                    message = "Error saving contact message.",
                    error = ex.Message
                });
            }
        }
    }
}

