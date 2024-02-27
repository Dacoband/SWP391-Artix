using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class OrderDetail
    {
        [Key]
        public int OrderDetailID { get; set; }
        public int OrderID { get; set; }
        public int ArtWorkID { get; set; }
        public DateTime DateOfPurchase { get; set; }
        public double Price { get; set; }

    }
}
