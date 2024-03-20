using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace backend.Entities
{
    public class Creator
    {
        [Key]
        public int? CreatorID { get; set; } // PK
        public int? AccountID { get; set; }
        public int? PaypalAccountID { get; set; } // FK
        public string UserName { get; set; }
        public string?  ProfilePicture { get; set; } // Có thể 
        public string? BackgroundPicture { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email  { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public DateTime LastLogDate { get; set; }
        public bool AllowCommission { get; set; } = false;
        public string? Biography { get; set; }

        public bool? VIP { get; set; } = false;

        public int? FollowCounts { get; set; }
        public Creator()
        {
            VIP = false; // Đặt giá trị mặc định của VIP là false

            AllowCommission = false;

        }


    }
}
