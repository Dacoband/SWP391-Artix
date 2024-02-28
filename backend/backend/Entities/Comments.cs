using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Comments
    {
        [Key]
        public int CommentID { get; set; }
        public int CreatorID { get; set; }
        public int ArtWorkID { get; set; }
        public string CommentText { get; set; }
        public DateTime DateCreated { get; set; }
        public Artworks Artworks { get; set; }
    }
}
