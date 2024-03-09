using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Entities
{
    public class ArtworkTag
    {
<<<<<<< HEAD
        public int ArtworkID { get; set; }
        public Artworks Artwork { get; set; }
        public int TagID { get; set; }
        public Tags Tag { get; set; }
=======

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ArtworkTagID { get; set; } // Khóa chính

        public int ArtworkID { get; set; } // Khóa ngoại
        public int TagID { get; set; } // Khóa ngoại

        


>>>>>>> Volka
    }
}
