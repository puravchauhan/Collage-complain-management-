using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddTechnicianToComplaint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Complaints_TechnicianId",
                table: "Complaints",
                column: "TechnicianId");

            migrationBuilder.AddForeignKey(
                name: "FK_Complaints_Technicians_TechnicianId",
                table: "Complaints",
                column: "TechnicianId",
                principalTable: "Technicians",
                principalColumn: "TechnicianId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Complaints_Technicians_TechnicianId",
                table: "Complaints");

            migrationBuilder.DropIndex(
                name: "IX_Complaints_TechnicianId",
                table: "Complaints");
        }
    }
}
