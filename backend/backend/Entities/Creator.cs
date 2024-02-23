namespace backend.Entities
{
    public class Creator
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public float Followers { get; set; }
        public string Phone {  get; set; }
        public string Address { get; set; }
        public DateTime? LastLogDate { get; set; }
        public bool AllowCommission { get; set; }

    }
}
