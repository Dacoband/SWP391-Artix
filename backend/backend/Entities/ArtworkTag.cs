using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Entities
{
    public class ArtworkTag
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ArtworkTagID { get; set; } // Khóa chính

        public int ArtworkID { get; set; } // Khóa ngoại
        public int TagID { get; set; } // Khóa ngoại

        


    }
}
