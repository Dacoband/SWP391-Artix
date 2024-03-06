

using System.ComponentModel.DataAnnotations;

namespace backend.Entities 
{
    public class Account
    {
        [Key]
        public int AccountID { get; set; } // PK
        public int RoleID { get; set; } // FK
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
    }
}
