using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ARTHS_Data.Entities
{
    public partial class ARTHS_DBContext : DbContext
    {
        public ARTHS_DBContext()
        {
        }

        public ARTHS_DBContext(DbContextOptions<ARTHS_DBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<AccountRole> AccountRoles { get; set; } = null!;
        public virtual DbSet<Cart> Carts { get; set; } = null!;
        public virtual DbSet<CartItem> CartItems { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Configuration> Configurations { get; set; } = null!;
        public virtual DbSet<CustomerAccount> CustomerAccounts { get; set; } = null!;
        public virtual DbSet<DeviceToken> DeviceTokens { get; set; } = null!;
        public virtual DbSet<Discount> Discounts { get; set; } = null!;
        public virtual DbSet<FeedbackProduct> FeedbackProducts { get; set; } = null!;
        public virtual DbSet<FeedbackStaff> FeedbackStaffs { get; set; } = null!;
        public virtual DbSet<Image> Images { get; set; } = null!;
        public virtual DbSet<MaintenanceSchedule> MaintenanceSchedules { get; set; } = null!;
        public virtual DbSet<MotobikeProduct> MotobikeProducts { get; set; } = null!;
        public virtual DbSet<MotobikeProductPrice> MotobikeProductPrices { get; set; } = null!;
        public virtual DbSet<Notification> Notifications { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public virtual DbSet<OwnerAccount> OwnerAccounts { get; set; } = null!;
        public virtual DbSet<RepairBooking> RepairBookings { get; set; } = null!;
        public virtual DbSet<RepairService> RepairServices { get; set; } = null!;
        public virtual DbSet<RevenueStore> RevenueStores { get; set; } = null!;
        public virtual DbSet<StaffAccount> StaffAccounts { get; set; } = null!;
        public virtual DbSet<TellerAccount> TellerAccounts { get; set; } = null!;
        public virtual DbSet<Vehicle> Vehicles { get; set; } = null!;
        public virtual DbSet<Warranty> Warranties { get; set; } = null!;
        public virtual DbSet<WarrantyHistory> WarrantyHistories { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                //optionsBuilder.UseSqlServer("Server=TAN-TRUNG\\HAMMER;Database=ARTHS_DB;Persist Security Info=False;User ID=sa;Password=123456;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("Account");

                entity.HasIndex(e => e.PhoneNumber, "UQ__Account__85FB4E3811606EBC")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreateAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.PasswordHash)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Account__RoleId__398D8EEE");
            });

            modelBuilder.Entity<AccountRole>(entity =>
            {
                entity.ToTable("AccountRole");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.RoleName).HasMaxLength(50);
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("Cart");

                entity.HasIndex(e => e.CustomerId, "UQ__Cart__A4AE64D91E2C3A67")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Customer)
                    .WithOne(p => p.Cart)
                    .HasForeignKey<Cart>(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Cart__CustomerId__797309D9");
            });

            modelBuilder.Entity<CartItem>(entity =>
            {
                entity.HasKey(e => new { e.CartId, e.MotobikeProductId })
                    .HasName("PK__CartItem__4B299AA309EFD99B");

                entity.ToTable("CartItem");

                entity.Property(e => e.CreateAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.CartId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CartItem__CartId__7C4F7684");

                entity.HasOne(d => d.MotobikeProduct)
                    .WithMany(p => p.CartItems)
                    .HasForeignKey(d => d.MotobikeProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CartItem__Motobi__7D439ABD");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CategoryName).HasMaxLength(100);
            });

            modelBuilder.Entity<Configuration>(entity =>
            {
                entity.ToTable("Configuration");

                entity.Property(e => e.Id)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<CustomerAccount>(entity =>
            {
                entity.HasKey(e => e.AccountId)
                    .HasName("PK__Customer__349DA5A693742607");

                entity.ToTable("CustomerAccount");

                entity.Property(e => e.AccountId).ValueGeneratedNever();

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.Avatar).IsUnicode(false);

                entity.Property(e => e.FullName).HasMaxLength(255);

                entity.Property(e => e.Gender).HasMaxLength(10);

                entity.Property(e => e.Otp)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Account)
                    .WithOne(p => p.CustomerAccount)
                    .HasForeignKey<CustomerAccount>(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CustomerA__Accou__49C3F6B7");
            });

            modelBuilder.Entity<DeviceToken>(entity =>
            {
                entity.ToTable("DeviceToken");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreateAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Token).IsUnicode(false);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.DeviceTokens)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__DeviceTok__Accou__3D5E1FD2");
            });

            modelBuilder.Entity<Discount>(entity =>
            {
                entity.ToTable("Discount");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.ImageUrl).IsUnicode(false);

                entity.Property(e => e.StartDate).HasColumnType("datetime");

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.Property(e => e.Title).HasMaxLength(255);
            });

            modelBuilder.Entity<FeedbackProduct>(entity =>
            {
                entity.ToTable("FeedbackProduct");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreateAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Title).HasMaxLength(255);

                entity.Property(e => e.UpdateAt).HasColumnType("datetime");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.FeedbackProducts)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK__FeedbackP__Custo__73BA3083");

                entity.HasOne(d => d.MotobikeProduct)
                    .WithMany(p => p.FeedbackProducts)
                    .HasForeignKey(d => d.MotobikeProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__FeedbackP__Motob__74AE54BC");
            });

            modelBuilder.Entity<FeedbackStaff>(entity =>
            {
                entity.ToTable("FeedbackStaff");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.SendDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Title).HasMaxLength(255);

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.FeedbackStaffs)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK__FeedbackS__Custo__4CA06362");

                entity.HasOne(d => d.Staff)
                    .WithMany(p => p.FeedbackStaffs)
                    .HasForeignKey(d => d.StaffId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__FeedbackS__Staff__4D94879B");
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.ToTable("Image");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.ImageUrl).IsUnicode(false);

                entity.HasOne(d => d.MotobikeProduct)
                    .WithMany(p => p.Images)
                    .HasForeignKey(d => d.MotobikeProductId)
                    .HasConstraintName("FK__Image__MotobikeP__6B24EA82");

                entity.HasOne(d => d.RepairService)
                    .WithMany(p => p.Images)
                    .HasForeignKey(d => d.RepairServiceId)
                    .HasConstraintName("FK__Image__RepairSer__6C190EBB");
            });

            modelBuilder.Entity<MaintenanceSchedule>(entity =>
            {
                entity.ToTable("MaintenanceSchedule");

                entity.HasIndex(e => e.OrderDetailId, "UQ__Maintena__D3B9D36DC0466C73")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.NextMaintenanceDate).HasColumnType("datetime");

                entity.Property(e => e.ReminderDate).HasColumnType("datetime");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.MaintenanceSchedules)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Maintenan__Custo__14270015");

                entity.HasOne(d => d.OrderDetail)
                    .WithOne(p => p.MaintenanceSchedule)
                    .HasForeignKey<MaintenanceSchedule>(d => d.OrderDetailId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Maintenan__Order__1332DBDC");
            });

            modelBuilder.Entity<MotobikeProduct>(entity =>
            {
                entity.ToTable("MotobikeProduct");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreateAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.Property(e => e.UpdateAt).HasColumnType("datetime");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.MotobikeProducts)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__MotobikeP__Categ__6383C8BA");

                entity.HasOne(d => d.Discount)
                    .WithMany(p => p.MotobikeProducts)
                    .HasForeignKey(d => d.DiscountId)
                    .HasConstraintName("FK__MotobikeP__Disco__619B8048");

                entity.HasOne(d => d.Warranty)
                    .WithMany(p => p.MotobikeProducts)
                    .HasForeignKey(d => d.WarrantyId)
                    .HasConstraintName("FK__MotobikeP__Warra__628FA481");

                entity.HasMany(d => d.Vehicles)
                    .WithMany(p => p.MotobikeProducts)
                    .UsingEntity<Dictionary<string, object>>(
                        "ProductVehicleType",
                        l => l.HasOne<Vehicle>().WithMany().HasForeignKey("VehicleId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__ProductVe__Vehic__70DDC3D8"),
                        r => r.HasOne<MotobikeProduct>().WithMany().HasForeignKey("MotobikeProductId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__ProductVe__Motob__6FE99F9F"),
                        j =>
                        {
                            j.HasKey("MotobikeProductId", "VehicleId").HasName("PK__ProductV__9D226409F95CE51E");

                            j.ToTable("ProductVehicleType");
                        });
            });

            modelBuilder.Entity<MotobikeProductPrice>(entity =>
            {
                entity.ToTable("MotobikeProductPrice");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreateAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DateApply).HasColumnType("datetime");

                entity.HasOne(d => d.MotobikeProduct)
                    .WithMany(p => p.MotobikeProductPrices)
                    .HasForeignKey(d => d.MotobikeProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__MotobikeP__Motob__6754599E");
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.ToTable("Notification");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Link).HasMaxLength(255);

                entity.Property(e => e.SendDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Title).HasMaxLength(255);

                entity.Property(e => e.Type).HasMaxLength(255);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Notifications)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Notificat__Accou__5165187F");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Order");

                entity.Property(e => e.Id)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.CancellationDate).HasColumnType("datetime");

                entity.Property(e => e.CustomerName).HasMaxLength(255);

                entity.Property(e => e.CustomerPhoneNumber)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.LicensePlate)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OrderDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.OrderType).HasMaxLength(100);

                entity.Property(e => e.PaymentMethod).HasMaxLength(50);

                entity.Property(e => e.ShippingCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK__Order__CustomerI__01142BA1");

                entity.HasOne(d => d.Staff)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.StaffId)
                    .HasConstraintName("FK__Order__StaffId__02FC7413");

                entity.HasOne(d => d.Teller)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.TellerId)
                    .HasConstraintName("FK__Order__TellerId__02084FDA");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.ToTable("OrderDetail");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreateAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.OrderId)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.WarrantyEndDate).HasColumnType("datetime");

                entity.Property(e => e.WarrantyStartDate).HasColumnType("datetime");

                entity.HasOne(d => d.Discount)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.DiscountId)
                    .HasConstraintName("FK__OrderDeta__Disco__09A971A2");

                entity.HasOne(d => d.MotobikeProduct)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.MotobikeProductId)
                    .HasConstraintName("FK__OrderDeta__Motob__07C12930");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__OrderDeta__Order__06CD04F7");

                entity.HasOne(d => d.RepairService)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.RepairServiceId)
                    .HasConstraintName("FK__OrderDeta__Repai__08B54D69");
            });

            modelBuilder.Entity<OwnerAccount>(entity =>
            {
                entity.HasKey(e => e.AccountId)
                    .HasName("PK__OwnerAcc__349DA5A69F7FBF37");

                entity.ToTable("OwnerAccount");

                entity.Property(e => e.AccountId).ValueGeneratedNever();

                entity.Property(e => e.Avatar).IsUnicode(false);

                entity.Property(e => e.FullName).HasMaxLength(255);

                entity.Property(e => e.Gender).HasMaxLength(10);

                entity.HasOne(d => d.Account)
                    .WithOne(p => p.OwnerAccount)
                    .HasForeignKey<OwnerAccount>(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__OwnerAcco__Accou__412EB0B6");
            });

            modelBuilder.Entity<RepairBooking>(entity =>
            {
                entity.ToTable("RepairBooking");

                entity.HasIndex(e => e.OrderId, "UQ__RepairBo__C3905BCE795BAC2A")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CancellationDate).HasColumnType("datetime");

                entity.Property(e => e.CreateAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DateBook).HasColumnType("datetime");

                entity.Property(e => e.OrderId)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.RepairBookings)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__RepairBoo__Custo__1CBC4616");

                entity.HasOne(d => d.Order)
                    .WithOne(p => p.RepairBooking)
                    .HasForeignKey<RepairBooking>(d => d.OrderId)
                    .HasConstraintName("FK__RepairBoo__Order__1EA48E88");

                entity.HasOne(d => d.Staff)
                    .WithMany(p => p.RepairBookings)
                    .HasForeignKey(d => d.StaffId)
                    .HasConstraintName("FK__RepairBoo__Staff__1DB06A4F");
            });

            modelBuilder.Entity<RepairService>(entity =>
            {
                entity.ToTable("RepairService");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreateAt)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.HasOne(d => d.Discount)
                    .WithMany(p => p.RepairServices)
                    .HasForeignKey(d => d.DiscountId)
                    .HasConstraintName("FK__RepairSer__Disco__5DCAEF64");
            });

            modelBuilder.Entity<RevenueStore>(entity =>
            {
                entity.ToTable("RevenueStore");

                entity.Property(e => e.Id)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.OrderId)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentMethod).HasMaxLength(50);

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.Property(e => e.TransactionDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Type).HasMaxLength(255);

                entity.Property(e => e.UpdateAt).HasColumnType("datetime");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.RevenueStores)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK__RevenueSt__Order__17F790F9");
            });

            modelBuilder.Entity<StaffAccount>(entity =>
            {
                entity.HasKey(e => e.AccountId)
                    .HasName("PK__StaffAcc__349DA5A6065F37C4");

                entity.ToTable("StaffAccount");

                entity.Property(e => e.AccountId).ValueGeneratedNever();

                entity.Property(e => e.Avatar).IsUnicode(false);

                entity.Property(e => e.FullName).HasMaxLength(255);

                entity.Property(e => e.Gender).HasMaxLength(10);

                entity.HasOne(d => d.Account)
                    .WithOne(p => p.StaffAccount)
                    .HasForeignKey<StaffAccount>(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__StaffAcco__Accou__440B1D61");
            });

            modelBuilder.Entity<TellerAccount>(entity =>
            {
                entity.HasKey(e => e.AccountId)
                    .HasName("PK__TellerAc__349DA5A6F82024D7");

                entity.ToTable("TellerAccount");

                entity.Property(e => e.AccountId).ValueGeneratedNever();

                entity.Property(e => e.Avatar).IsUnicode(false);

                entity.Property(e => e.FullName).HasMaxLength(255);

                entity.Property(e => e.Gender).HasMaxLength(10);

                entity.HasOne(d => d.Account)
                    .WithOne(p => p.TellerAccount)
                    .HasForeignKey<TellerAccount>(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TellerAcc__Accou__46E78A0C");
            });

            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.ToTable("Vehicle");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.VehicleName).HasMaxLength(100);
            });

            modelBuilder.Entity<Warranty>(entity =>
            {
                entity.ToTable("Warranty");

                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<WarrantyHistory>(entity =>
            {
                entity.ToTable("WarrantyHistory");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.RepairDate).HasColumnType("datetime");

                entity.Property(e => e.Status).HasMaxLength(100);

                entity.HasOne(d => d.HandledByNavigation)
                    .WithMany(p => p.WarrantyHistories)
                    .HasForeignKey(d => d.HandledBy)
                    .HasConstraintName("FK__WarrantyH__Handl__0F624AF8");

                entity.HasOne(d => d.OrderDetail)
                    .WithMany(p => p.WarrantyHistories)
                    .HasForeignKey(d => d.OrderDetailId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__WarrantyH__Order__0E6E26BF");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
