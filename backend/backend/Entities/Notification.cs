namespace backend.Entities
{
    public class Notification
    {
        public int FollowID { get; set; }
        public int CreatorID { get; set; }
        public int ArtWorkID { get; set; }
        public bool View { get; set; }
    }
}
