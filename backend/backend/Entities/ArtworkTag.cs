using System.ComponentModel.DataAnnotations;
namespace backend.Entities
{
    public class ArtworkTag
    {
        [Key]
        public int ArtworkID { get; set; }

        [Key]
        public int TagID { get; set; }
        
        
    }
}
