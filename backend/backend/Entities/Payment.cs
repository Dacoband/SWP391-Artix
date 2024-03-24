using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Payment
    {
        [Key]
        
            public int PaymentID { get; set; }
            public string QrCode { get; set; }
            public int? AccountID { get; set; }
        

    }
}
