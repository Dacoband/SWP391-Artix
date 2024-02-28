using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using backend.Entities;
using System.Data;

namespace backend.Entities
{
    public class ApplicationDbContext : DbContext
    {
        private readonly IConfiguration Configuration;

        public ApplicationDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // Các DbSet
        public DbSet<Creator> Creators { get; set; }
        public DbSet<Tags> Tags { get; set; }
        public DbSet<PaypalAccount> PayPalAccount { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Moderators> Moderators { get; set; }
        public DbSet<Artworks> Artworks { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Follow> Follows { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<ViewReport> ViewReport { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetail { get; set; }
        public DbSet<Commission> Commission { get; set; }
        public DbSet<CommissionForm> CommissionForm { get; set; }
        // Thêm DbSet cho các bảng khác nếu cần

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // Kết nối đến MySQL với chuỗi kết nối từ cài đặt ứng dụng
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Cấu hình các mối quan hệ, index, constraints nếu cần
        }
    }
}
