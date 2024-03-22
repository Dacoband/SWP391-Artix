namespace backend.Entities
{
    public class ReplyComment
    {
        public int ReplyCommentID { get; set; }
        public int CommentID { get; set; }
        public int ReplierID { get; set; }
        public string ReplyText { get; set; }
        public DateTime DateReplied { get; set; }

        // Navigation property for the foreign key relationship
        public Comments Comments { get; set; }
    }
}
