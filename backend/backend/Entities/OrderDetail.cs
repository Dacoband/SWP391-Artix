namespace backend.Entities
{
    public class OrderDetail
    {
        public int OrderID { get; set; }
        public int ArtWorkID { get; set; }
        public DateTime DateOfPurchase { get; set; }
        public double Price { get; set; }

    }
}
