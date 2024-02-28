using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class ViewReport
    {
        [Key]
        public int ViewReportID { get; set; }
        public int ModeratorID { get; set; }
        public int ReportID { get; set; }
    }
}
