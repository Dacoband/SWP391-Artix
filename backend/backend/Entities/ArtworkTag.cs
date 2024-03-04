namespace backend.Entities
{
    public class ArtworkTag
    {
        public int ArtworkID { get; set; }
        public Artworks Artwork { get; set; }

        public int TagID { get; set; }
        public Tags Tag { get; set; }
    }
}
