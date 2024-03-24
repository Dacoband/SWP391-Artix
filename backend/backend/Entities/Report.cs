using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Report
    {
        [Key]
        public int ReportID { get; set; }
        public int ReporterID { get; set; }
        public int ReportedCreatorID { get; set; }
        public string Description { get; set; }
    }
}
