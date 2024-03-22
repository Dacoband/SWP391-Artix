using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class CommissionForm
    {
        [Key]
        public int CommissionFormID { get; set; }
        public int CommissionID { get; set; } // PK
        public int ReceiverID { get; set; } // FK
        public int RequestorID { get; set; } // FK
        public string Description { get; set; }
        public Boolean?  Accept  { get; set; }
        public int? Progress { get; set; }
    }
}
