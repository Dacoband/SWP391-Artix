using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Roles
    {
        [Key]
        public int RoleID { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
    }
}
