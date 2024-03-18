using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Notification
    {
        [Key]
        public int NotificationID { get; set; }
        public int FollowID { get; set; }
        public int CreatorID { get; set; }
        public int ArtWorkID { get; set; }
        public bool View { get; set; }
    }
}
