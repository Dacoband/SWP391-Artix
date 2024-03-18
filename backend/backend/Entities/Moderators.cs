using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Moderators
    {
        [Key]
        public int ModeratorID { get; set; }
        public int ReportID { get; set; }
        public int AccountID { get; set; }
    }
}
