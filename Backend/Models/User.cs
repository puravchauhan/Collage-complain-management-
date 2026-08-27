namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }

        public string FullName { get; set; } = "";

        public string StudentId { get; set; } = "";

        public string Email { get; set; } = "";

        public string Phone { get; set; } = "";

        public string Department { get; set; } = "";

        public string Semester { get; set; } = "";

        public string PasswordHash { get; set; } = "";

        public string Role { get; set; } = "Student";

        // Email verification
        public bool IsEmailVerified { get; set; } = false;

        public string? VerificationToken { get; set; }

        public DateTime? VerificationTokenExpiry { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}