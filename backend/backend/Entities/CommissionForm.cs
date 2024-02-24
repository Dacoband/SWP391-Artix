namespace backend.Entities
{
    public class CommissionForm
    {
        public int CommissionID { get; set; } // PK
        public int ReceiverID { get; set; } // FK
        public int RequestorID { get; set; } // FK
        public string Description { get; set; }
    }
}
