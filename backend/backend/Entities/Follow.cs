using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Follow
    {
        [Key]
        public int FollowID { get; set; } //Primary Key 
        public int FollowerID { get; set; }
        public int CreatorID { get; set; }


    }
}
