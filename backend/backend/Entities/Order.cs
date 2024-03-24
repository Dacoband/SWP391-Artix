using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    public class Order
    {
        [Key]
        public int OrderID { get; set; }
        public int CreatorID { get; set; }
        public Boolean Confirmation  { get; set; }
    }
}
