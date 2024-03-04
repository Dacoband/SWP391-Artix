using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    public class Artworks
    {
        [Key]
        public int ArtworkID { get; set; } // PK
        public int CreatorID { get; set; } // FK
        public int? TagID { get; set; } // FK
        public string  ArtworkName { get; set; } // FK
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public int Likes { get; set; }
        public bool Purchasable { get; set; }
        public double Price { get; set; }
        public IFormFile ImageFile { get; set; } // Thêm cột ImageFile kiểu BLOB
        

    }
}
