using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Tags
    {
        [Key]
        public int TagID { get; set; }
        public string TagName { get; set; }
        public ICollection<ArtworkTag> ArtworkTag { get; set; }
    }
}
