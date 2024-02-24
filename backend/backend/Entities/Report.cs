using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Report
    {
        [Key]
        public int ReportID { get; set; }
        public int ArtWorkID { get; set; }
        public int CommentID { get; set; }
        public int CreatorID { get; set; }
    }
}
