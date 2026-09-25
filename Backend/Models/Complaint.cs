namespace backend.Models
{
    public class Complaint
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Category { get; set; } = "";

        public string Problem { get; set; } = "";

        public string Priority { get; set; } = "";

        public string Location { get; set; } = "";

        public string Description { get; set; } = "";

        public string? ImagePath { get; set; }

        public string Status { get; set; } = "Pending";

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}