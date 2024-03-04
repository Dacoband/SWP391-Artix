using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Tags
    {
        [Key]
        public int TagID { get; set; }
        public string TagName { get; set; }
        public List<ArtworkTag> ArtworkTags { get; set; }
    }
}
