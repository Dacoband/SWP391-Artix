using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class PaypalAccount
    {
        [Key]
        public int PayPalAccountID { get; set; }
        public string QR { get; set; }
    }
}
