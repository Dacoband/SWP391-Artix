using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace backend.Entities
{
    public class Creator
    {
        [Key]
        public int? CreatorID { get; set; } // PK
        public int? PaypalAccount { get; set; } // FK
        public string UserName { get; set; }
        public int? FollowerID { get; set; } // FK
        public IFormFile ProfilePicture { get; set; } // Có thể 
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public DateTime LastLogDate { get; set; }
        public bool AllowCommission { get; set; }

    }
}
