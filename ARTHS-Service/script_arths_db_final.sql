USE master
GO

DROP DATABASE IF EXISTS ARTHS_DB
GO

CREATE DATABASE ARTHS_DB
GO

USE ARTHS_DB
GO

--Table role
DROP TABLE IF EXISTS AccountRole;
GO
CREATE TABLE AccountRole(
	Id uniqueidentifier primary key NOT NULL,
	RoleName nvarchar(50) NOT NULL
);
GO

--Table account
DROP TABLE IF EXISTS Account;
GO
CREATE TABLE Account(
	Id uniqueidentifier primary key NOT NULL,
	RoleId uniqueidentifier foreign key references AccountRole(Id) NOT NULL,
	PhoneNumber varchar(30) unique NOT NULL,
	PasswordHash varchar(255) NOT NULL,
	Status nvarchar(100) NOT NULL,
	CreateAt datetime NOT NULL default getdate()
);
GO

--Table device token
DROP TABLE IF EXISTS DeviceToken;
GO
CREATE TABLE DeviceToken(
	Id uniqueidentifier primary key NOT NULL,
	AccountId uniqueidentifier foreign key references Account(Id) NOT NULL,
	Token varchar(max),
	CreateAt datetime NOT NULL default getdate()
);
GO


--Table owner
DROP TABLE IF EXISTS OwnerAccount;
GO
CREATE TABLE OwnerAccount(
	AccountId uniqueidentifier foreign key references Account(Id) NOT NULL,
	FullName nvarchar(255) NOT NULL,
	Gender nvarchar(10) NOT NULL, --"Nam", "Nữ", "Khác",
	Avatar varchar(max),
	primary key(AccountId)
);
GO

--Table staff
DROP TABLE IF EXISTS StaffAccount;
GO
CREATE TABLE StaffAccount(
	AccountId uniqueidentifier foreign key references Account(Id) NOT NULL,
	FullName nvarchar(255) NOT NULL,
	Gender nvarchar(10) NOT NULL, --"Nam", "Nữ", "Khác",
	Avatar varchar(max),
	primary key(AccountId)
);
GO

--Table teller
DROP TABLE IF EXISTS TellerAccount;
GO
CREATE TABLE TellerAccount(
	AccountId uniqueidentifier foreign key references Account(Id) NOT NULL,
	FullName nvarchar(255) NOT NULL,
	Gender nvarchar(10) NOT NULL, --"Nam", "Nữ", "Khác",
	Avatar varchar(max),
	primary key(AccountId)
);
GO

--Table customer
DROP TABLE IF EXISTS CustomerAccount;
GO
CREATE TABLE CustomerAccount(
	AccountId uniqueidentifier foreign key references Account(Id) NOT NULL,
	FullName nvarchar(255) NOT NULL,
	Gender nvarchar(10) NOT NULL, --"Nam", "Nữ", "Khác",
	Avatar varchar(max),
	Address nvarchar(255) NOT NULL,
	Otp varchar(10) NULL,
	primary key(AccountId)
);
GO

--Table feedback staff
DROP TABLE IF EXISTS FeedbackStaff;
GO
CREATE TABLE FeedbackStaff(
	Id uniqueidentifier primary key NOT NULL,
	CustomerId uniqueidentifier foreign key references CustomerAccount(AccountId),
	StaffId uniqueidentifier foreign key references StaffAccount(AccountId) NOT NULL,
	Title nvarchar(255),
	Content nvarchar(max) NOT NULL,
	SendDate datetime NOT NULL default getdate()
);
GO

--Table notification
DROP TABLE IF EXISTS [Notification];
GO
CREATE TABLE [Notification](
	Id uniqueidentifier primary key NOT NULL,
	AccountId uniqueidentifier foreign key references Account(Id) NOT NULL,
	Title nvarchar(255) NOT NULL,
	Body nvarchar(max) NOT NULL,
	Type nvarchar(255),
	Link nvarchar(255),
	IsRead bit DEFAULT 0 NOT NULL,
	SendDate datetime NOT NULL default getdate()
);
GO

--Table category
DROP TABLE IF EXISTS Category;
GO
CREATE TABLE Category(
	Id uniqueidentifier primary key NOT NULL,
	CategoryName nvarchar(100) NOT NULL,
);
GO

--Table vehicle
DROP TABLE IF EXISTS Vehicle;
GO
CREATE TABLE Vehicle(
	Id uniqueidentifier primary key NOT NULL,
	VehicleName nvarchar(100) NOT NULL,
);
GO

--Table warranty (Bảo hành)
DROP TABLE IF EXISTS Warranty;
GO
CREATE TABLE Warranty(
	Id uniqueidentifier primary key NOT NULL,
	Duration int NOT NULL,		--số tháng bảo hành
	Description nvarchar(max) NOT NULL
);
GO

--Table discount
DROP TABLE IF EXISTS Discount;
GO
CREATE TABLE Discount(
	Id uniqueidentifier primary key NOT NULL,
	Title nvarchar(255) NOT NULL,
	DiscountAmount int NOT NULL,	-- phần trăm giảm giá
	StartDate datetime NOT NULL,
	EndDate datetime NOT NULL,
	ImageUrl varchar(max) NOT NULL,
	Description nvarchar(max) NOT NULL,
	Status nvarchar(100) NOT NULL
);
GO

--Table repair service
DROP TABLE IF EXISTS RepairService;
GO
CREATE TABLE RepairService(
	Id uniqueidentifier primary key NOT NULL,
	Name nvarchar(255) NOT NULL,
	WarrantyDuration int NOT NULL,
	DiscountId uniqueidentifier foreign key references Discount(Id),
	Duration int NOT NULL,
	ReminderInterval int NULL,
	Price int NOT NULL,
	Description nvarchar(max) NOT NULL,
	Status nvarchar(100) NOT NULL,
	CreateAt datetime NOT NULL default getdate()
);
GO


--Table product
DROP TABLE IF EXISTS MotobikeProduct;
GO
CREATE TABLE MotobikeProduct(
	Id uniqueidentifier primary key NOT NULL,
	DiscountId uniqueidentifier foreign key references Discount(Id),
	WarrantyId uniqueidentifier foreign key references Warranty(Id),
	CategoryId uniqueidentifier foreign key references Category(Id),
	Name nvarchar(255) NOT NULL,
	PriceCurrent int NOT NULL,
	InstallationFee int NOT NULL,
	Quantity int NOT NULL,
	Description nvarchar(max) NOT NULL,
	Status nvarchar(100) NOT NULL,
	UpdateAt datetime,
	CreateAt datetime NOT NULL default getdate()
);
GO

--Table product price
DROP TABLE IF EXISTS MotobikeProductPrice;
GO
CREATE TABLE MotobikeProductPrice(
	Id uniqueidentifier primary key NOT NULL,
	MotobikeProductId uniqueidentifier foreign key references MotobikeProduct(Id) NOT NULL,
	DateApply datetime NOT NULL,
	PriceCurrent int NOT NULL,
	CreateAt datetime NOT NULL default getdate()
);
GO

--Table product image
DROP TABLE IF EXISTS [Image];
GO
CREATE TABLE [Image](
	Id uniqueidentifier primary key NOT NULL,
	MotobikeProductId uniqueidentifier foreign key references MotobikeProduct(Id),
	RepairServiceId uniqueidentifier foreign key references RepairService(Id) ,
	Thumbnail bit NOT NULL default 0,
	ImageUrl varchar(max) NOT NULL
);
GO


--Table product vehicle type
DROP TABLE IF EXISTS ProductVehicleType;
GO
CREATE TABLE ProductVehicleType (
    MotobikeProductId uniqueidentifier foreign key references MotobikeProduct(Id) NOT NULL,
    VehicleId uniqueidentifier foreign key references Vehicle(Id) NOT NULL,
	Primary key (MotobikeProductId, VehicleId)
);
GO


--Table feedback product
DROP TABLE IF EXISTS FeedbackProduct;
GO
CREATE TABLE FeedbackProduct(
	Id uniqueidentifier primary key NOT NULL,
	CustomerId uniqueidentifier foreign key references CustomerAccount(AccountId),
	MotobikeProductId uniqueidentifier foreign key references MotobikeProduct(Id) NOT NULL,
	Title nvarchar(255),
	Rate int NOT NULL,
	Content nvarchar(max) NOT NULL,
	UpdateAt datetime,
	CreateAt datetime NOT NULL default getdate()
);
GO

--Table cart
DROP TABLE IF EXISTS Cart;
GO
CREATE TABLE Cart (
    Id uniqueidentifier primary key NOT NULL,
	CustomerId uniqueidentifier unique foreign key references CustomerAccount(AccountId) NOT NULL
);
GO

--Table cart Item
DROP TABLE IF EXISTS CartItem;
GO
CREATE TABLE CartItem (
	CartId uniqueidentifier foreign key references Cart(Id) NOT NULL,
	MotobikeProductId uniqueidentifier foreign key references MotobikeProduct(Id) NOT NULL,
	Quantity int NOT NULL,
	CreateAt datetime NOT NULL default getdate(),
	Primary key (CartId, MotobikeProductId)
);
GO


-- Bảng Order mới tích hợp cả đơn hàng online và tại cửa hàng
DROP TABLE IF EXISTS [Order];
GO
CREATE TABLE [Order](
	Id varchar(255) primary key NOT NULL,
	CustomerId uniqueidentifier foreign key references CustomerAccount(AccountId) NULL, 
	TellerId uniqueidentifier foreign key references TellerAccount(AccountId) NULL, 
	StaffId uniqueidentifier foreign key references StaffAccount(AccountId) NULL, 
	ShippingCode varchar(100) NULL, 
	ShippingMoney int NULL, 
	CustomerPhoneNumber varchar(30) NOT NULL, 
	CustomerName nvarchar(255) NULL, 
	Address nvarchar(255) NULL, 
	PaymentMethod nvarchar(50) NULL, 
	Status nvarchar(100) NOT NULL, 
	TotalAmount int NOT NULL, 
	CancellationReason nvarchar(max) NULL, 
	CancellationDate datetime NULL, 
	LicensePlate varchar(50) NULL, 
	OrderType nvarchar(100) NOT NULL, -- Loại đơn hàng: "Online", "InStore"
	OrderDate datetime NOT NULL default getdate(),
);
GO

-- Bảng OrderDetail mới cho cả đơn hàng online và tại cửa hàng
DROP TABLE IF EXISTS OrderDetail;
GO
CREATE TABLE OrderDetail(
	Id uniqueidentifier primary key NOT NULL, -- ID duy nhất cho mỗi chi tiết đơn hàng
	OrderId varchar(255) foreign key references [Order](Id) NOT NULL, 
	MotobikeProductId uniqueidentifier foreign key references MotobikeProduct(Id) NULL,
	RepairServiceId uniqueidentifier foreign key references RepairService(Id) NULL, 
	DiscountId uniqueidentifier foreign key references Discount(Id) NULL,
	Quantity int NOT NULL, -- Số lượng sản phẩm/dịch vụ
	Price int NOT NULL, -- Giá của sản phẩm/dịch vụ
	InstUsed bit NOT NULL DEFAULT 0,  
	SubTotalAmount int NOT NULL, -- Tổng giá (số lượng x giá)
	WarrantyStartDate datetime NULL, -- Thời gian bắt đầu bảo hành, áp dụng cho sản phẩm có bảo hành
	WarrantyEndDate datetime NULL, -- Thời gian kết thúc bảo hành, áp dụng cho sản phẩm có bảo hành
	CreateAt datetime NOT NULL default getdate(), -- Ngày tạo chi tiết đơn hàng
);
GO

-- Bảng bảo hành sản phẩm
DROP TABLE IF EXISTS WarrantyHistory;
GO
CREATE TABLE WarrantyHistory(
	Id uniqueidentifier primary key NOT NULL,
	OrderDetailId uniqueidentifier foreign key references OrderDetail(Id) NOT NULL,
	RepairDate datetime NOT NULL,
	ProductQuantity int NOT NULL,
	RepairDetails nvarchar(max) NULL, -- Mô tả chi tiết sửa chữa
	HandledBy uniqueidentifier foreign key references StaffAccount(AccountId) NULL,
	TotalAmount int NULL,
	Status nvarchar(100) NOT NULL, 
);
GO


-- Bảng lưu thông tin cho lịch bảo dưỡng tiếp theo
DROP TABLE IF EXISTS MaintenanceSchedule;
GO
CREATE TABLE MaintenanceSchedule(
	Id uniqueidentifier primary key NOT NULL,
	OrderDetailId uniqueidentifier unique foreign key references OrderDetail(Id) NOT NULL,
	CustomerId uniqueidentifier foreign key references CustomerAccount(AccountId) NOT NULL, 
	NextMaintenanceDate datetime NOT NULL,
	ReminderDate datetime NOT NULL,
	RemiderSend bit NOT NULL DEFAULT 0
);
GO



--Table RevenueStore
DROP TABLE IF EXISTS RevenueStore;
GO
CREATE TABLE RevenueStore(
	Id varchar(100) primary key NOT NULL,
	OrderId varchar(255) foreign key references [Order](Id),
	TotalAmount int NOT NULL,
	Type nvarchar(255) NOT NULL,
	PaymentMethod nvarchar(50) NOT NULL,
	Status nvarchar(100) NOT NULL,
	UpdateAt datetime,
	TransactionDate datetime NOT NULL default getdate()
);
GO


--Table booking
DROP TABLE IF EXISTS RepairBooking;
GO
CREATE TABLE RepairBooking(
	Id uniqueidentifier primary key NOT NULL,
	CustomerId uniqueidentifier foreign key references CustomerAccount(AccountId) NOT NULL,
	StaffId uniqueidentifier foreign key references StaffAccount(AccountId),
	OrderId varchar(255) foreign key references [Order](Id),
	DateBook datetime NOT NULL,
	Description nvarchar(max) NOT NULL,
	CancellationReason nvarchar(max),
	CancellationDate datetime,
	Status nvarchar(100) NOT NULL,
	CreateAt datetime NOT NULL default getdate()
);
GO

DROP TABLE IF EXISTS [Configuration];
CREATE TABLE [Configuration] (
	Id varchar(50) primary key NOT NULL,
    TotalStaff INT NOT NULL,
    WorkHours INT NOT NULL,
    ServiceTime INT NOT NULL,
    NonBookingPercentage INT NOT NULL,
    ShippingMoney int NOT NULL
);
GO

-- Tạo trigger cho bảng Discount
CREATE TRIGGER trg_Discount_StatusUpdate
ON Discount
AFTER UPDATE
AS
BEGIN
    IF UPDATE(Status)  -- Kiểm tra xem trường Status đã được cập nhật hay không
    BEGIN
	-- Cập nhật trạng thái Discount khi EndDate hết hạn
        UPDATE Discount
        SET Status = 'Discontinued'
        FROM Discount AS d
        INNER JOIN inserted AS i ON d.Id = i.Id
        WHERE d.EndDate <= GETDATE() AND i.Status <> 'Discontinued';

        -- Cập nhật MotobikeProduct khi trạng thái Discount thay đổi
        UPDATE MotobikeProduct
        SET DiscountId = NULL
        FROM MotobikeProduct AS mp
        INNER JOIN Discount AS d ON mp.DiscountId = d.Id
        WHERE d.Status = 'Discontinued';

		-- Cập nhật RepairService khi trạng thái Discount thay đổi
		UPDATE RepairService
		SET DiscountId = NULL
		FROM RepairService AS rs
        INNER JOIN Discount AS d ON rs.DiscountId = d.Id
        WHERE d.Status = 'Discontinued';
    END
END;
GO

--Trigger for configuration
CREATE TRIGGER UpdateTotalStaff
ON StaffAccount
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @TotalStaff INT;

    -- Calculate the total staff excluding those with status 'Không hoạt động'
    SELECT @TotalStaff = COUNT(*) 
    FROM StaffAccount sa
    JOIN Account a ON sa.AccountId = a.Id
    WHERE a.Status <> N'Không hoạt động';

    -- Update the TotalStaff in [Configuration] table
    UPDATE [Configuration] 
    SET TotalStaff = @TotalStaff
    WHERE Id = 'config'; -- Replace 'your_configuration_id' with the actual ID value

END;




-- Data
INSERT [dbo].[Discount] ([Id], [Title], [DiscountAmount], [StartDate], [EndDate], [ImageUrl], [Description], [Status]) VALUES (N'94a18909-5598-4fdd-962b-a5be46bae754', N'Khuyến mãi bạt ngàn, giảm giá sập sàn', 20, CAST(N'2023-11-28T00:00:00.000' AS DateTime), CAST(N'2024-01-24T00:00:00.000' AS DateTime), N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F94a18909-5598-4fdd-962b-a5be46bae754?alt=media', N'<p>🎉 <span style="color: var(--tw-prose-bold);">KHUYẾN MÃI BẠT NGÀN - GIẢM GIÁ SẬP SÀN!</span> 🎉</p><p>Mùa Thu Đông này, <strong>Thanh Huy Motorbike</strong> hân hạnh mang đến chương trình khuyến mãi "Bạt Ngàn - Giảm Giá Sập Sàn" dành cho những khách hàng đam mê và cần thiết cho cuộc sống năng động. Hãy sẵn sàng đón nhận ưu đãi sốc này!</p><p>🌟 <span style="color: var(--tw-prose-bold);">ƯU ĐÃI NỔI BẬT:</span></p><ol><li><span style="color: var(--tw-prose-bold);">Giảm Giá Khủng</span>: Đến [Tỷ lệ giảm giá]% cho mọi đơn đặt hàng bạt ngàn trong suốt thời gian khuyến mãi. Giá sập sàn, chưa bao giờ lại rẻ đến thế!</li><li><span style="color: var(--tw-prose-bold);">Bạt Ngàn Đa Dạng</span>: Thỏa sức lựa chọn từ nhiều mẫu bạt ngàn chất lượng cao, chống thấm nước, chống nắng và chống tia UV.</li><li><span style="color: var(--tw-prose-bold);">Giao Hàng Tận Nơi</span>: Miễn phí giao hàng cho đơn hàng trên 1 triệu. Có thể đến nhận hàng ngay tại cửa nhà, tiết kiệm thời gian và công sức của bạn.</li></ol><p><br></p><p><br></p><p>🏃 <span style="color: var(--tw-prose-bold);">HÃY ĐẾN NGAY </span><strong style="color: var(--tw-prose-bold);">THANH HUY MOTORBIKE</strong><span style="color: var(--tw-prose-bold);"> - SỞ HỮU BẠT NGÀN VỚI GIÁ VÔ CÙNG HẤP DẪN!</span> 🏃</p><p><br></p><p>#KhuyenMaiBạtNgàn #GiamGiaSapSan #BaoVeCuocSong</p>', N'Applying')
INSERT [dbo].[Discount] ([Id], [Title], [DiscountAmount], [StartDate], [EndDate], [ImageUrl], [Description], [Status]) VALUES (N'2f5831e2-ecf1-4d5d-87ac-a7adcf066a47', N'Khuyến mãi Thu Đông', 30, CAST(N'2023-11-28T00:00:00.000' AS DateTime), CAST(N'2023-12-30T00:00:00.000' AS DateTime), N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F2f5831e2-ecf1-4d5d-87ac-a7adcf066a47?alt=media', N'<p>🍁 <span style="color: var(--tw-prose-bold);">KHUYẾN MÃI THU ĐÔNG - ẤM ÁP TRONG MỖI CHI TIẾT XE!</span> 🍁</p><p>Chào mừng mùa Thu Đông se lạnh, <strong>Thanh Huy Motorbike Shop</strong> xin gửi đến quý khách hàng chương trình "Khuyến Mãi Thu Đông" hấp dẫn nhất trong năm! Hãy cùng chúng tôi nâng cao trải nghiệm lái xe của bạn với những linh kiện chất lượng và giá trị.</p><p>🚀 <span style="color: var(--tw-prose-bold);">ƯU ĐÃI ĐẶC BIỆT:</span></p><ol><li><span style="color: var(--tw-prose-bold);">Giảm giá lên đến 30%</span>: Đặc biệt cho hàng loạt linh kiện chống lạnh, bảo vệ xe và tăng hiệu suất động cơ.</li><li><span style="color: var(--tw-prose-bold);">Combo Tiết Kiệm</span>: Mua càng nhiều, giảm giá càng lớn! Ghé thăm cửa hàng để khám phá các combo giá trị.</li><li><span style="color: var(--tw-prose-bold);">Giao Hàng Miễn Phí</span>: Cho mọi đơn hàng trên 1 triệu đồng.</li></ol><p><span style="color: rgb(55, 65, 81);">📆 </span><span style="color: var(--tw-prose-bold);">THỜI GIAN ÁP DỤNG:</span></p><p><span style="color: rgb(55, 65, 81);">Chương trình bắt đầu từ </span>28-11-2023<span style="color: rgb(55, 65, 81);"> và kéo dài cho đến </span>27-12-2023<span style="color: rgb(55, 65, 81);">. Đừng bỏ lỡ cơ hội sở hữu những sản phẩm chất lượng với giá ưu đãi!</span></p>', N'Applying')
INSERT [dbo].[Discount] ([Id], [Title], [DiscountAmount], [StartDate], [EndDate], [ImageUrl], [Description], [Status]) VALUES (N'f183c05a-e7de-4d98-9af0-af7e5acf9751', N'Bùng nổ khuyến mại, sức mua dịp Black Friday vẫn thấp', 60, CAST(N'2023-12-04T00:00:00.000' AS DateTime), CAST(N'2023-12-30T00:00:00.000' AS DateTime), N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Ff183c05a-e7de-4d98-9af0-af7e5acf9751?alt=media', N'<p>🌟 <span style="color: var(--tw-prose-bold);">Black Friday Hấp Dẫn Tại Cửa Hàng Thanh Huy! 🌟</span></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Chào mừng đợt SALE lớn nhất trong năm! 🎉 Cùng Cửa Hàng Thanh Huy, chúng tôi mang đến cho bạn những ưu đãi không thể tin được trong ngày Black Friday!</span></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">🚀 </span><span style="color: var(--tw-prose-bold);">Ưu Đãi Nổi Bật:</span></p><ul><li>Giảm giá sốc cho hàng ngàn sản phẩm hot nhất!</li><li>Miễn phí vận chuyển cho các đơn hàng lớn giá trị trên 1 triệu.</li></ul><p>🛍️ <span style="color: var(--tw-prose-bold);">Chất Lượng Đỉnh Cao:</span></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Chúng tôi cam kết cung cấp những sản phẩm chất lượng, từ thời trang đến công nghệ, đáp ứng mọi nhu cầu của bạn.</span></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">⏰ </span><span style="color: var(--tw-prose-bold);">Thời Gian Hữu Hạn:</span></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Chương trình chỉ diễn ra trong một khoản thời gian nhất định. Đừng bỏ lỡ cơ hội săn sale và đồng thời làm mới con xe của các bạn!</span></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">🌐 </span><span style="color: var(--tw-prose-bold);">Mua Sắm Trực Tuyến:</span></p><p><span style="background-color: transparent; color: rgb(0, 0, 0);">Không muốn đứng xếp hàng? Mua sắm thoải mái ngay trên app của chúng tôi và nhận ngay những ưu đãi tuyệt vời!</span></p><p><span style="color: var(--tw-prose-bold);">Chỉ có tại Cửa Hàng Thanh Huy - Nơi Niềm Tin và Sự Hài Lòng Bắt Đầu!</span></p><h2><span style="background-color: transparent; color: rgb(0, 0, 0);">📅 </span><span style="color: var(--tw-prose-bold);">Ngày Black Friday - Hãy Đặt Lịch Ngay!</span></h2>', N'Applying')
GO

INSERT [dbo].[RepairService] ([Id], [Name], [WarrantyDuration], [DiscountId], [Duration], [ReminderInterval], [Price], [Description], [Status], [CreateAt]) VALUES (N'e0fcf573-4320-4558-9282-09c2b56717a6', N'Vệ sinh nồi xe tay ga Honda, Yamaha', 0, NULL, 90, 12, 100000, N'<ul><li>Vệ sinh nồi xe tay ga là việc bảo dưỡng cơ bản giúp làm sạch những bụi bẩn được hình thành từ quá trình vận hành xe ga trong thời gian dài.</li></ul><p>- Vệ sinh nồi xe ga Honda, Yamaha giúp khắc phục một số lỗi do bộ nồi dơ như: Xe đi không êm, không bốc, ì máy, hao xăng, rung đầu khi lên ga ...</p><p>- Vệ sinh nồi tay ga sẽ làm sạch và kiểm tra được những chi tiết hư hỏng để hạn những tổn thất chi phí về về sau.</p><p>- Vệ sinh nồi xe tay ga Honda Air Blade, SH, SH350i, SH Mode, Vision, Lead, PCX, Vario, Click, Yamaha NVX, Janus, Nouvo, Freggo S, Grande, Latte, Luvias...</p><p><br></p>', N'Đang hoạt động', CAST(N'2023-10-05T03:19:34.167' AS DateTime))
INSERT [dbo].[RepairService] ([Id], [Name], [WarrantyDuration], [DiscountId], [Duration], [ReminderInterval], [Price], [Description], [Status], [CreateAt]) VALUES (N'e2d8889c-4fc4-4d9b-897b-1b231c64549f', N'Gói bảo dưỡng xe số, xe côn tay', 3, NULL, 60, 5, 125000, N'<ul><li>Bảo dưỡng xe máy số, xe côn tay định kỳ giúp tăng độ bền, loại bỏ sớm nguy cơ gây hỏng hóc nghiêm trọng.</li></ul><p>Xe máy số, xe côn tay thường xuất hiện một số hiện tượng như: Lọc gió bám bụi, kim phun dơ, bố thắng mòn, nhông sên dĩa bẩn,…..sau thời gian sử dụng sẽ khiến xe ngày một hao xăng, giảm công suất, tăng tốc kém, rung hú, tắt máy,… Nếu để lâu dài sẽ ảnh hưởng đến các chi tiết bộ phân liên quan, xuống máy, hư hao,…. tốn rất nhiều chi phí sửa chữa.</p><p><strong>Quy trình dịch vụ bảo dưỡng xe số, xe côn tay tại Thanh Huy Motorbike:</strong></p><ol><li>Vệ sinh nhông sên dĩa (xe số)</li><li>Vệ sinh kim phun xăng</li><li>Kiểm tra điện, đèn, còi</li><li>Kiểm tra hệ thống phanh trước/sau</li><li>Kiểm tra &amp; bơm vỏ xe trước/sau</li><li>Kiểm tra bình acquy</li><li>Kiểm tra lọc gió/bugi</li><li>Kiểm tra phuộc trước/sau</li><li>kiểm tra acquy</li><li>Xịt dung dịch RP7: Tay thắng, chân chống công tắc, ống ga,...</li></ol><p><br></p><ul><li><span style="color: rgb(85, 85, 85); background-color: rgb(255, 255, 255);">Hãy luôn chăm sóc, kiểm tra bảo dưỡng định kỳ để chiếc xe máy, xe côn tay&nbsp;của bạn được vận hành êm ái, bền bỉ và an toàn nhất theo thời gian.</span></li></ul><p class="ql-align-center"><br></p>', N'Đang hoạt động', CAST(N'2023-10-05T05:25:03.740' AS DateTime))
INSERT [dbo].[RepairService] ([Id], [Name], [WarrantyDuration], [DiscountId], [Duration], [ReminderInterval], [Price], [Description], [Status], [CreateAt]) VALUES (N'3281a3eb-34e3-44f3-9cbc-1c06a80e328a', N'Gói bảo dưỡng xe tay ga', 3, NULL, 90, 5, 150000, N'<ul><li>Bảo dưỡng xe tay ga định kỳ giúp tăng độ bền, loại bỏ sớm nguy cơ gây hỏng hóc nghiêm trọng.</li></ul><p>Xe tay ga thường xuất hiện một số hiện tượng như: Lọc gió bám bụi, kim phun dơ, bố thắng mòn, bố nồi dơ…..sau thời gian sử dụng sẽ khiến xe ngày một hao xăng, giảm công suất, tăng tốc kém, rung hú, tắt máy,… Nếu để lâu dài sẽ ảnh hưởng đến các chi tiết bộ phân liên quan, xuống máy, hư hao,…. tốn rất nhiều chi phí sửa chữa.</p><p><strong>Quy trình dịch vụ bảo dưỡng xe tay ga tại Thanh Huy Motorbike:</strong></p><p>1. Vệ sinh nồi</p><p>2. Vệ sinh kim phun xăng</p><p>3. Kiểm tra điện, đèn, còi</p><p>4. Kiểm tra hệ thống phanh trước/sau</p><p>5. Kiểm tra &amp; bơm vỏ xe trước/sau</p><p>6. Kiểm tra nước mát</p><p>7. Kiểm tra lọc gió/bugi</p><p>8. Kiểm tra phuộc trước/sau</p><p>9. kiểm tra acquy</p><p>10. Xịt dung dịch RP7: Tay thắng, chân chống công tắc, ống ga,...</p><p><span style="background-color: rgb(255, 255, 255); color: rgb(85, 85, 85);">Hãy luôn chăm sóc, kiểm tra bảo dưỡng định kỳ để chiếc xe máy, xe côn tay&nbsp;của bạn được vận hành êm ái, bền bỉ và an toàn nhất theo thời gian.</span></p><p class="ql-align-center"><br></p>', N'Đang hoạt động', CAST(N'2023-10-05T05:25:03.740' AS DateTime))
INSERT [dbo].[RepairService] ([Id], [Name], [WarrantyDuration], [DiscountId], [Duration], [ReminderInterval], [Price], [Description], [Status], [CreateAt]) VALUES (N'cbf36cb2-fd06-4d4c-b3f4-1f759165a2dd', N'Dịch vụ rửa xe', 0, NULL, 15, NULL, 30000, N'<ul><li>Chiếc xe nhìn bề ngoài bóng loáng, sáng và sạch chưa vẫn chưa thể được gọi là siêu sạch. Xe được gọi là siêu sạch khi phần bên ngoài và bên trong xe đều sạch sẽ, các chi tiết máy nằm phía trong cũng được vệ sinh hoàn chỉnh và dịch vụ rửa xe máy siêu sạch tại <strong>ThanhHuyStore</strong> đảm bảo đáp ứng cho bạn điều đó.</li></ul>', N'Đang hoạt động', CAST(N'2023-11-09T07:29:08.323' AS DateTime))
INSERT [dbo].[RepairService] ([Id], [Name], [WarrantyDuration], [DiscountId], [Duration], [ReminderInterval], [Price], [Description], [Status], [CreateAt]) VALUES (N'1a1b148e-bc6d-4485-a417-26a694413140', N'Vệ sinh họng xăng cho xe Honda, Yamaha', 0, NULL, 60, 6, 200000, N'<ul><li><strong style="color: rgb(102, 102, 102);">Vệ sinh họng xăng và kim phun xăng</strong><span style="color: rgb(102, 102, 102);">&nbsp;là việc bảo dưỡng định kỳ giúp làm sạch những bụi bẩn, tạp chất được hình thành từ quá trình xe vận hành động trong thời gian dài.</span></li><li><strong style="color: rgb(102, 102, 102);">Vệ sinh họng xăng và kim phun xăng</strong><span style="color: rgb(102, 102, 102);">&nbsp;giúp khắc phục một số hiện tương như xe chạy không bốc, không vọt, y máy, Garanty không đều, hụp ga, dễ bị tắt máy, tiêu tốn nhiên liệu.</span></li><li><span style="color: rgb(102, 102, 102);">Dịch vụ Vệ sinh họng xăng và kim phun xăng điện tử Fi cho các dòng xe Honda, Yamaha.</span></li></ul>', N'Đang hoạt động', CAST(N'2023-10-05T05:25:03.740' AS DateTime))
INSERT [dbo].[RepairService] ([Id], [Name], [WarrantyDuration], [DiscountId], [Duration], [ReminderInterval], [Price], [Description], [Status], [CreateAt]) VALUES (N'fa0c001b-4ec0-40c5-b36e-2818649cab24', N'Vệ sinh, làm nhẹ dây ga, dây côn', 0, N'2f5831e2-ecf1-4d5d-87ac-a7adcf066a47', 60, 6, 150000, N'<ul><li>Dây ga, dây côn xe máy sau một thời gian sử dụng sẽ dần bị xuống cấp và cần được người dùng vệ sinh, làm mới lại để có thể sử dụng được một cách trơn tru mượt mà. Khiến xe khởi động dễ trượt côn, truyền lực bị giảm sút. Đồng thời khiến xe tiêu tốn nhiều nhiên liệu hơn, gây ảnh hưởng rất nhiều đến khả năng kiểm soát lái của người dùng.</li><li>Nên kiểm tra vệ sinh dây ga, dây côn tay định kỳ - thời gian lý tưởng là sau 8.000 - 10.000 km và nên thay dây ga xe máy 20.000 km/lần. Dây ga, dây côn xe máy dành cho các dòng xe Honda, Yamaha.</li></ul>', N'Đang hoạt động', CAST(N'2023-10-05T05:25:03.740' AS DateTime))
INSERT [dbo].[RepairService] ([Id], [Name], [WarrantyDuration], [DiscountId], [Duration], [ReminderInterval], [Price], [Description], [Status], [CreateAt]) VALUES (N'ca9eeb5b-5f99-4f3d-807f-5f71ed013d59', N'Vệ sinh heo dầu cho xe 1 thắng đĩa', 0, N'2f5831e2-ecf1-4d5d-87ac-a7adcf066a47', 30, 6, 150000, N'<p>Vệ sinh heo dầu cho xe 1 thắng đĩa giúp xe khắc phục những hiện tượng:</p><p>  - Bóp tay thắng cảm giác nặng, sượng, bị khựt khựt từng nấc, không trơn tru.</p><p>  - Bóp bị rít hoặc sâu, thắng gắt không dịu, heo dầu bị cứng, kẹt,...</p><p>Nếu di chuyển sẽ gây ra các hiện tượng: thắng không ăn gây nguy hiểm, dễ xóc thắng dễ té, không xử lý được các tình huống phát sinh,...</p><p>Dịch vụ Vệ sinh heo dầu cho xe 1 thắng đĩa dành cho các dòng xe Honda, Yamaha.</p><p><br></p>', N'Đang hoạt động', CAST(N'2023-10-05T05:25:03.740' AS DateTime))
INSERT [dbo].[RepairService] ([Id], [Name], [WarrantyDuration], [DiscountId], [Duration], [ReminderInterval], [Price], [Description], [Status], [CreateAt]) VALUES (N'298a3d10-614f-4d19-b193-63317b5c60ab', N'Vệ sinh heo dầu cho xe 2 thắng đĩa', 0, NULL, 90, 6, 200000, N'<p>Vệ sinh heo dầu cho xe 2 thắng đĩa giúp xe khắc phục những hiện tượng:</p><p>- Bóp tay thắng cảm giác nặng, sượng, bị khựt khựt từng nấc, không trơn tru.</p><p>- Bóp bị rít hoặc sâu, thắng gắt không dịu, heo dầu bị cứng, kẹt,...</p><p>Nếu di chuyển sẽ gây ra các hiện tượng: thắng không ăn gây nguy hiểm, dễ xóc thắng dễ té, không xử lý được các tình huống phát sinh,...</p><p>Dịch vụ Vệ sinh heo dầu cho xe 2 thắng đĩa dành cho các dòng xe Honda, Yamaha.</p><p><br></p>', N'Đang hoạt động', CAST(N'2023-10-05T05:25:03.740' AS DateTime))
INSERT [dbo].[RepairService] ([Id], [Name], [WarrantyDuration], [DiscountId], [Duration], [ReminderInterval], [Price], [Description], [Status], [CreateAt]) VALUES (N'e7e3a283-c377-44cc-bd57-8a555dc93882', N'Dịch vụ vệ sinh nhông sên dĩa', 0, NULL, 30, 3, 60000, N'<p>Dịch vụ vệ sinh nhông sên dĩa là việc bảo dưỡng định kỳ giúp làm sạch những bụi bẩn, tạp chất bám trên nhông sên dĩa xe máy khi vận hành trong thời gian dài</p><p>Dịch vụ vệ sinh nhông sên dĩa bằng dung dịch Goracing giúp xe số, xe côn tay vận hành êm ái, mượt mà gia tăng được tuổi thọ NSD của xe.</p><p>Dịch vụ Vệ sinh nhông sên dĩa bằng dung dịch Goracing cho các loại xe máy số, xe côn tay Honda, Yamaha, Suzuki: Exciter 150, Exciter 155, Winner 150, Winner X, Sonic 150, Satria, Raider 150, Wave, Futute, Sirius, Jupiter....</p><p><br></p>', N'Đang hoạt động', CAST(N'2023-10-05T05:25:03.740' AS DateTime))
INSERT [dbo].[RepairService] ([Id], [Name], [WarrantyDuration], [DiscountId], [Duration], [ReminderInterval], [Price], [Description], [Status], [CreateAt]) VALUES (N'd31d4c92-27e7-430c-bd5f-93c3bdd0d43b', N'Vệ sinh kim phun xăng điện tử Fi', 0, N'f183c05a-e7de-4d98-9af0-af7e5acf9751', 30, 3, 90000, N'<ul><li>Vệ sinh kim phun xăng điện tử <strong>Fi</strong> là việc bảo dưỡng định kỳ giúp làm sạch những bụi bẩn, tạp chất được hình thành, làm bẩn hệ thống phun xăng điện tử FI xe máy trong thời gian dài.</li><li>Vệ sinh kim phun xăng Fi giúp xe máy tăng tốc mượt mà, tiết kiệm được nhiên liệu, gia tăng được tuổi thọ của động cơ.</li><li>Dịch vụ Vệ sinh kim phun xăng điện tử Fi cho các loại xe máy Honda, Yamaha: Exciter 150, Winner 150, Winner X, Air Blade, Vario, Click, SH, SH Mode, Vision, Lead, PCX, NVX, Janus,....</li></ul><p><br></p>', N'Đang hoạt động', CAST(N'2023-10-05T05:25:03.740' AS DateTime))
INSERT [dbo].[RepairService] ([Id], [Name], [WarrantyDuration], [DiscountId], [Duration], [ReminderInterval], [Price], [Description], [Status], [CreateAt]) VALUES (N'55f153b4-5cc5-4aca-9932-a29e5eacf77c', N'Vệ sinh họng xăng và kim phun xăng', 0, N'f183c05a-e7de-4d98-9af0-af7e5acf9751', 60, 3, 250000, N'<p>Vệ sinh họng xăng và kim phun xăng là việc bảo dưỡng định kỳ giúp làm sạch những bụi bẩn, tạp chất được hình thành từ quá trình xe vận hành động trong thời gian dài.</p><p>Vệ sinh họng xăng và kim phun xăng giúp khắc phục một số hiện tương như xe chạy không bốc, không vọt, y máy, <strong>Garanty </strong>không đều, hụp ga, dễ bị tắt máy, tiêu tốn nhiên liệu).</p><p>Dịch vụ Vệ sinh họng xăng và kim phun xăng điện tử Fi cho các dòng xe Honda, Yamaha.</p><p><br></p>', N'Đang hoạt động', CAST(N'2023-10-05T05:25:03.740' AS DateTime))
GO

INSERT [dbo].[Category] ([Id], [CategoryName]) VALUES (N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'đồ chơi xe máy')
INSERT [dbo].[Category] ([Id], [CategoryName]) VALUES (N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'phụ kiện thay thế')
INSERT [dbo].[Category] ([Id], [CategoryName]) VALUES (N'6aa4a7de-eea1-4a0b-a536-c86cc0698448', N'dầu nhớt')
INSERT [dbo].[Category] ([Id], [CategoryName]) VALUES (N'0879c2e4-a35c-42d0-96dd-ef0f8bf9a71b', N'vỏ xe máy')
GO

INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'9bdafe62-392f-4821-a3a5-0f24a09f4c06', 14, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'3a32e8e0-950a-4fe9-9554-150475fe7caa', 33, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'd8aa9717-d68b-4609-9200-19dd2ef9c48c', 28, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'6f2cdf3d-ae6e-4e85-9c29-1d5acffcb41a', 16, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'6ad4f460-1cb0-4afe-b23a-21cc1d318d3f', 24, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'1f3eb278-eded-4097-83d6-21df5cee2fdb', 17, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'249b1a2f-6b5b-4b38-bc80-398d8e93d192', 12, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'18b6fa89-5916-4258-9598-44cb2a8ea5c2', 26, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'a8945ee2-6a3d-479f-95c8-4634fd49ce96', 22, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'89856c40-6d5d-414f-aa01-47ad46813dee', 20, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'58f05f25-1a20-4d14-ad87-49bc58036c60', 27, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'ad94699f-b54b-4f00-9af8-5246d77600a3', 19, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'afc2aff6-09c2-4294-8bed-5ad07762f34a', 1, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'4c814586-cbce-4c27-a06b-5cd5172b067c', 8, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'b2b0949c-2756-4c40-ad1b-5e5ccd188f72', 34, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'f90911fb-6df9-49ed-9dc4-66572d9742c2', 3, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'49d9f051-5725-4f28-8d4a-69d6e0925395', 11, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'fe2a1349-6ce7-4632-9a8d-76d8caf0a145', 29, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'371eac99-a305-4b35-9d22-777c47177729', 13, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'02282489-d9f0-4862-8084-79241bed665f', 35, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'1797d1d2-e2bf-40ae-9729-8509095f83cb', 5, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'87c65adc-9c04-4617-a78f-86162246f9f7', 15, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'e5181374-dda9-43bb-9a20-99207439c318', 10, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'66a7feb6-76a0-492e-909a-99e21fe230c6', 32, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'9dcad924-6a27-4773-9def-9da0786cb941', 36, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'545221c1-600b-49c2-be88-a0e3c1db3f0b', 31, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'7af3a524-e1f7-4be0-b457-a11d2052570a', 25, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'97abbac4-a2c5-4da9-850a-a6c577f33afb', 30, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'56cc9f5b-694b-4f7c-9099-a8e91a30273b', 18, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'3158e6f3-ee35-4839-8380-aaa83f3aa6ff', 7, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'5f99d125-9569-4561-8a37-b1110800160c', 4, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'37093484-d234-43ba-a9a6-b2b2c6202942', 23, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'65efc6d0-cb4f-4ec5-b73a-c6d270767d89', 21, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'65b2de35-397c-45d7-8d3e-cbf02722e5e8', 2, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'80281aba-f050-478b-b3a6-cdaf3caf88e0', 6, N'Tháng')
INSERT [dbo].[Warranty] ([Id], [Duration], [Description]) VALUES (N'7c9bdfa1-e2df-4c8a-912b-d58ea8c87951', 9, N'Tháng')
GO

INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'9a4165da-7c4f-47b6-802e-08683d87c21d', NULL, NULL, N'0879c2e4-a35c-42d0-96dd-ef0f8bf9a71b', N'Vỏ xe Dunlop D102A size 130/70-17', 1120000, 10000, 50, N'Vỏ xe Dunlop D102A size 130/70-17 không ruột dành cho bánh sau đi size to Winner 150, Exciter 150 hoặc FZ150i, vỏ Dunlop là thương hiệu nổi tiếng với chất lượng tuyệt vời, đảm bảo cho xe bám đường rất tốt. Vỏ xe Dunlop D102A size 130/70-17 chính hãng Dunlop, made in Indonesia.', N'Đang hoạt động', CAST(N'2023-10-15T05:06:43.023' AS DateTime), CAST(N'2023-10-05T08:46:34.790' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'dbba0a8c-b3d2-44fb-b5db-0a401b9429d8', NULL, NULL, N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Đèn led 2 tầng cho LEAD 2022 - 2023 (Jack led) chính hãng ZHI.PAT', 1200000, 30000, 100, N'Đèn led 2 tầng cho LEAD 2022 - 2023 (Jack led) chính hãng ZHI.PAT, thiết kế hiện đại, thời trang, thay đổi diện mạo hoàn toàn mới mẻ. Hệ thống chóa 2 tầng sử dụng công nghệ LED Lighting trang bị 6 bóng led siêu sáng với ánh trắng pha vàng bám đường. Không gây chóa mắt người đối diện khi di chuyển trên đường. Đèn led 2 tầng cho LEAD 2022 - 2023 (Jack led) bảo hành 12 tháng chính hãng. Với 2 màu: Đen khói, Si Bạc.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T14:21:30.233' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'05eae696-5b61-441f-b423-0cacc320a877', N'f183c05a-e7de-4d98-9af0-af7e5acf9751', NULL, N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Gù Carbon fiber chống rung, đầm tay lái cho AB 160, Vario 160', 350000, 0, 100, N'Gù Carbon fiber chống rung, đầm tay lái cho AB 160, Vario 160', N'Đang hoạt động', NULL, CAST(N'2023-10-06T14:26:31.173' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'517bbfd8-bdf0-490a-ab39-14cbfb726314', N'2f5831e2-ecf1-4d5d-87ac-a7adcf066a47', NULL, N'0879c2e4-a35c-42d0-96dd-ef0f8bf9a71b', N'Lốp Trước Dunlop D102A (70/90-17)', 610000, 15000, 100, N'Lốp Dunlop D102A 70/90-17 - 120/70-17 dành cho xe Winner 150 V1, Winner X, Exciter 150, Exciter 155... các đời. với thiết kế gai đặc biệt, cao su khá tốt, bám đường cực tốt khi vào cua và thoát nước cực tốt trên đường ướt, độ mài mòn cực thấp giúp lốp rất bền, sử dụng rất lâu và cũng chống ăn đinh rất tốt. Vỏ xe Dunlop D102A 70/90-17 - 120/70-17 được sản xuất tại Indonesia.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T09:33:07.170' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'f183c05a-e7de-4d98-9af0-af7e5acf9751', NULL, N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Cùm tăng tốc Domino 2 dây ga trên màu đen chính hãng', 1300000, 30000, 100, N'Cùm tăng tốc Domino 2 dây ga trên màu đen chính hãng, giúp hành trình vặn ga nhanh hơn, giúp xe tăng tốc nhanh hơn như đúng tên gọi của nó. Cùm ga tăng Domino đang là sản phẩm rất được ưu chuộng bởi anh em Biker bởi tính năng cũng như thẩm mỹ của nó. Cùm ga tăng Domino 2 dây ga trên chính hãng được sản xuất tại Italy, gắn được tất cả dòng xe.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T14:44:34.997' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'2f5831e2-ecf1-4d5d-87ac-a7adcf066a47', NULL, N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Bao tay Daytona Octa chính hãng', 400000, 0, 99, N'Bao tay Daytona Octa hàng chính hãng, thiết kế đơn giản có logo Daytona cùng các đường sóng dọc chia bao tay thành nhiều khối nổi bật tạo điểm nhấn trên bao tay, dành cho khách hàng nào thích sự đơn giản nhưng chất lượng, cao su chống trơn trượt cực tốt, nhất là cho các bạn có mồ hôi tay nhiều. Bao tay Daytona Octa gắn được tất cả các loại xe, được sản xuất tại Nhật, thương hiệu Daytona rất nổi tiếng trong việc sản xuất phụ tùng xe máy.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T14:34:05.373' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', NULL, NULL, N'6aa4a7de-eea1-4a0b-a536-c86cc0698448', N'Nhớt Liqui Moly 4T Synth 10W40 Street Race', 350000, 0, 100, N'Dầu nhớt động cơ Liqui Moly 4T Synth 10W40 Street Race đạt hiệu suất cao đươc tổng hợp hoàn toàn. Đảm bảo hiệu suất tối đa và bảo vệ động cơ trong mọi điều kiện hoạt động. Bôi trơn tối ưu,làm sạch động cơ, ma sát tuyệt vời. Tạo ra sự khác biệt lớn khi lái xe. Thử nghiệm trên động cơ với bộ chuyển đổi xúc tác. Nhớt Liqui Moly 4T Synth 10W40 Street Race có những tính năng như: Độ sạch động cơ vượt trội, đảm bảo tiêu thụ dầu thấp, bảo vệ chống mài mòn cao, tăng hiệu quả bôi trơn. Nhớt Liqui Moly 4T Synth 10W40 Street Race dùng được cho tất cả loại xe PKL và xe số.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T13:08:21.017' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'8be691d2-6758-4d88-9a60-2beeacf9032e', NULL, NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Phuộc Nitron Bình Dầu chính hãng Việt Nam cho Vario, Click mẫu mới', 2900000, 15000, 99, N'Phuộc Nitron chính hãng Việt Nam, thương hiệu phuộc mới tại Việt Nam đang rất được ưa chuộng trên thị trường đồ chơi xe máy với ưu điểm thiết kế đẹp mắt, tỉ mỉ từng chi tiết đồng thời độ nhún rất mượt mà, êm ái và đặc biệt giá cả vô cùng hợp lí. Phuộc Nitron bình dầu chính hãng Việt Nam cho Vario, Click được thiết kế bình dầu cùng full chức năng tăng chỉnh độ nhún, độ đàn hồi phuộc nên phù hợp cho nhiều Biker có thể đi đường xấu đẹp hay chở nặng nhẹ tuỳ ý. Phuộc Nitron Bình Dầu chính hãng Việt Nam cho Vario, Click cao 330mm, phuộc được bảo hành 12 tháng 1 đổi 1 chính hãng Nitron Việt Nam.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T09:02:46.100' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'94a18909-5598-4fdd-962b-a5be46bae754', NULL, N'6aa4a7de-eea1-4a0b-a536-c86cc0698448', N'Nhớt Motul H-Tech 100 4T 10W40', 260000, 0, 100, N'Motul H-Tech 100 4T 10W40 nhớt xe số chất lượng cao, bôi trơn động cơ xe hiệu quả giúp động cơ xe vận hành êm ái và bảo vệ động cơ tốt nhất, bền bỉ nhất theo thời gian. Nhớt được nhiều tập đoàn xe máy uy tín như Honda, Yamaha, ... khuyên dùng', N'Đang hoạt động', NULL, CAST(N'2023-10-05T08:22:44.923' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'f183c05a-e7de-4d98-9af0-af7e5acf9751', NULL, N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Kính Rizoma vuông mode chân kính mẫu mới', 150000, 0, 100, N'Kính Rizoma vuông mode chân kính mẫu mới làm bằng nhôm sắc nét, kiểu dáng khá độc đáo, lên xe nhìn gọn nhưng vẫn có thể quan sát rất rõ tình hình phía sau, đảm bảo an toàn, rất thẩm mỹ. Kính Rizoma vuông mode chân kính mẫu mới có thể gắn đước tất cả các loại xe 2 bánh. Với 2 màu: Bạc, đen.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T14:42:29.090' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'2f5831e2-ecf1-4d5d-87ac-a7adcf066a47', NULL, N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Bao tay Barracuda chính hãng mẫu mới gai kim cương', 350000, 0, 100, N'Bao tay Barracuda chính hãng mẫu mới gai kim cương xịn xò, thiết kế khá tinh tế, êm tay nguyên khối bằng cao su. Bao tay Barracuda chính hãng gai kim cương có thể gắn được cho tất cả các dòng xe. Bao tay Barracuda thương hiệu Italy được nhập chính hãng từ Taiwan.', N'Đang hoạt động', CAST(N'2023-10-19T04:19:31.860' AS DateTime), CAST(N'2023-10-06T14:35:40.607' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'117227fb-4a0b-4d2d-a8c9-47024fec40bf', NULL, NULL, N'0879c2e4-a35c-42d0-96dd-ef0f8bf9a71b', N'Vỏ Michelin City Extra 110/70-12', 945000, 20000, 50, N'Vỏ Michelin City Extra 110/70-12, thiết kế dành cho các cung đường ẩm ướt. Sản phẩm được lấy công nghệ từ vỏ dòng vỏ Pilot Road 4 và Road 5 các dòng xe PKL của Michelin. Vỏ Michelin City Extra 110/70-12 có độ ổn định và khả năng xử lý nước trên đường tuyệt vời nhờ các rãnh gai nhỏ trên bề mặt vỏ, rãnh gai nhỏ tiếp xúc với mặt đường ướt và xé ra 2 bên trong lúc vận hành, giúp xe không trơn trượt một cách hiệu quả. Với 3 lớp bố được gia cường để tăng khả năng chống đinh, chống đâm thủng. Vỏ Michelin City Extra 110/70-12 gắn được xe Vespa Sprint, Primavera, Honda MSX, Yamaha Grande... được sản xuất tại Indonesia.', N'Đang hoạt động', NULL, CAST(N'2023-10-05T08:51:57.777' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'f183c05a-e7de-4d98-9af0-af7e5acf9751', NULL, N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Gù nặng inox chống rung, đầm tay lái cho các dòng xe', 150000, 0, 80, N'Gù dài inox nặng cực chất, chống rung, đầm tay lái. Thiết kế chắc chắn, nặng hơn nhiều so với gù zin, chất liệu inox chống trầy, sáng bóng theo thời gian. Gù dài inox có thể gắn vừa tất cả các loại xe.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T14:40:34.093' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', NULL, NULL, N'6aa4a7de-eea1-4a0b-a536-c86cc0698448', N'Nhớt Repsol Smarter Scooter 4T 5W-40 0,8L', 180000, 0, 100, N'Nhớt Repsol Smarter Scooter 4T 5W-40 0,8L, bảo vệ động cơ vượt trội, ổn định về độ nhớt, chống sự mài mòn trong điều kiện động cơ hoạt động trong quãng đường dài và liên tục. - Dầu tổng hợp hoàn toàn (Full Synthentic). - Tiêu chuẩn: API SN, JASO MA2.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T13:15:26.697' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', NULL, NULL, N'6aa4a7de-eea1-4a0b-a536-c86cc0698448', N'Nhớt Liqui Molygen Scooter 10W40', 300000, 0, 100, N'Liqui Moly Molygen Scooter 10W40, sản phẩm nhớt dành riêng cho xe tay ga hiện đại rất chất lượng và được ưa chuộng trên nhiều nước bởi tín năng bảo vệ động cơ cực tốt. Sản xuất đặc biệt dành cho các dòng xe tay ga hiện đại hiện nay trên thị trường Việt Nam. - Nhớt xe tay ga mang công thức tổng hợp đặc biệt. - Cấp nhớt: API SN+, Jaso MB', N'Đang hoạt động', NULL, CAST(N'2023-10-06T12:57:42.217' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'e94b1dbc-cf97-4f98-bbc2-6b07b4a1948c', NULL, NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Phuộc RCB C Series ty vàng chính hãng cho Yamaha Sirius, Jupiter', 2020000, 15000, 100, N'- Phuộc RCB C Series ty vàng cho Sirius, Jupiter thiết kế mới vô cùng sắc xảo cùng với ty phuộc được mạ vàng tạo điểm nhấn, loxo phuộc to, chắc chắn, có chế độ tăng chỉnh loxo nặng nhẹ phù hợp với trọng tải cũng như cung đường mình vận hành. - Phuộc sau RCB C Series ty vàng cho Sirius, Jupiter là Hàng chính hãng Racing Boy bảo hành 12 tháng. - Phuộc RCB C Series ty vàng chính hãng gắn được cho Sirius, Jupiter...với chiều cao 275mm bằng với phuộc zin.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T09:06:00.370' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'90a50eac-7623-450c-90d9-708b9d35bf9f', NULL, NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Dĩa Recto 40T chính hãng cho Yamaha Sirius Fi', 190000, 20000, 98, N'Dĩa Recto 40T hàng chính hãng dành cho Yamaha Sirius Fi. Sản phẩm đang được rất nhiều Biker ưa chuộng với chất lượng tuyệt vời, đồ bền cao, vận hành êm ái. Ngoài ra thiết kế cũng khá ấn tượng. Dĩa Recto 40T cho Yamaha Sirius Fi là hàng chính hãng Thái Lan gắn vừa khít như zin cho Sirius Fi.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T03:24:29.403' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'69cb2891-4b1f-4360-b154-730e62cc20c6', NULL, NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Lọc gió zin cho Yamaha Nouvo 4', 85000, 20000, 100, N'Lọc gió zin cho Yamaha Nouvo 4. Theo khuyến cáo của hãng, không vệ sinh lọc gió zin mà nên thay thế định kỳ sau mỗi 8.000 - 10.000 km tùy điều kiện vận hành. Việc thay lọc gió đúng định kỳ sẽ giúp động cơ luôn vận hành trong tình trạng tốt, ổn định nhất.', N'Đang hoạt động', CAST(N'2023-10-06T09:18:10.200' AS DateTime), CAST(N'2023-10-06T07:23:20.387' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', NULL, NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Lọc gió trụ K&N 1280', 1050000, 20000, 100, N'Lọc gió trụ K&N 1280 tăng lưu lượng gió nạp vào bình xăng, cải thiện hiệu suất hòa trộn nhiên liệu, giúp xe hoạt động mạnh mẽ hơn. Xuất xứ: K&N - Mỹ Loại bình xăng áp dụng: Các loại bình có họng xăng từ 28 trở xuống', N'Đang hoạt động', CAST(N'2023-10-06T09:18:41.033' AS DateTime), CAST(N'2023-10-06T07:57:26.910' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'2c291c00-4cbb-4859-a667-870eac4ff447', N'2f5831e2-ecf1-4d5d-87ac-a7adcf066a47', NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Bố thắng đùm sau Vespa chính hãng', 175000, 15000, 100, N'Bố thắng đùm sau Vespa chính hãng cho các dòng xe i-get mới... Bố thắng đùm sau Vespa có độ cứng vững cao, chịu được lực phanh lớn, đảm bảo phanh hiệu quả và không gây bó kẹt, chống bào mòn, không gây tiếng kêu. Bố thắng đùm sau Vespa với độ bám tốt, lực bám đồng đều ở bề mặt đáp ứng rất tốt cho mọi điều kiện vận hành của xe. Đặc biệt là xe di chuyển ở các thành phố lớn, khi lên ga xuống ga và phanh nhiều nhiệt sinh ra lớn dẫn đến má bị mài mòn rất nhanh.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T07:44:34.747' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'6ec0109b-13f8-44b2-afba-890faacfe6c4', N'f183c05a-e7de-4d98-9af0-af7e5acf9751', NULL, N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Đèn LED 2 tầng cho Wave RSX 110 Fi 2014 - 2023 chính hãng Zhi.Pat', 1180000, 30000, 97, N'Đèn LED 2 tầng Zhi.Pat cho Wave RSX 110 Fi 2014 - 2023 phiên bản Sportline Ultimate là sự kết hợp hoàn hảo giữa yếu tố thể thao, năng động và tiện lợi trong sử dụng. Những đường nét góc cạnh không chỉ tôn lên vẻ sắc sảo mà còn tạo ra nét cá tính riêng của xe. - Với 2 màu: Đen Khói & Si Bạc. Phối đèn định vị: Cam, Xanh, Đỏ. - Chính hãng Zhi.Pat Bảo hành 12 tháng 1 đổi 1.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T14:58:30.093' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'f183c05a-e7de-4d98-9af0-af7e5acf9751', NULL, N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Cục Chớp Xinhan', 25000, 10000, 70, N'Cục Chớp Xinhan Điện Tử. - Điện áp hoạt động: DC12V - Công suất: 21w x 2 - Trọng lượng: 25g - Tương thích với đèn Led, dùng để thay thế cục chớp zin khi thay bóng dây tóc bằng bóng led. - Có nút điều chỉnh tốc độ nháy: từ 30-200 lần/ phút', N'Đang hoạt động', NULL, CAST(N'2023-10-06T14:37:28.420' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'd77dfc4d-3549-41da-a568-8ccb8e6eadec', NULL, NULL, N'0879c2e4-a35c-42d0-96dd-ef0f8bf9a71b', N'Vỏ Michelin City Grip 2 size 110/80-14', 1085000, 20000, 100, N'Vỏ Michelin City Grip 2 rất phù hợp với điều kiện ở Việt Nam bởi thiết kế nhiều rảnh gai sâu, ở phiên bản City Grip 2 này được cải tiển thêm nhiều chấm gai nhỏ, dài giúp thoáng nước cực tốt mà độ bền vẫn giữ được lâu. Vỏ Michelin City Grip 2 110/80-14 được sản xuất tại Châu Âu, với nhiều rãnh nhỏ trên bề mặt lốp sẽ đảm bảo việc di chuyển ở đường trơn, ôm cua gấp được an toàn hơn. Vỏ Michelin City Grip 2 size 110/80-14 dành cho xe Yamaha NVX...', N'Đang hoạt động', NULL, CAST(N'2023-10-06T09:16:39.597' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'83d51422-5756-4490-a774-8eec37a0ac49', NULL, NULL, N'6aa4a7de-eea1-4a0b-a536-c86cc0698448', N'Nhớt Shell Advance Ultra 10W40 1L', 260000, 0, 100, N'Nhớt Shell Advance Ultra 10W40 1L nhớt cao cấp dành cho xe côn tay và xe mô tô 4 thì đời mới hiện nay. Bảo vệ tối ưu và khả năng vận hành đáng tin cậy, tăng độ ổn định trượt cao giúp giảm rung động và giảm tiếng ồn. - Dầu nhớt tổng hợp 100%. - Tiêu chuẩn: API SM, JASO MA2', N'Đang hoạt động', NULL, CAST(N'2023-10-05T08:39:06.960' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'697d7a94-d584-4328-b170-90734611c5fe', N'94a18909-5598-4fdd-962b-a5be46bae754', NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Bộ nhông sên dĩa Light cho Yamaha Sirius/Jupiter xăng cơ', 400000, 20000, 99, N'Bộ nhông sên dĩa Light dành cho Yamaha Sirius, Jupiter xăng cơ với Sên vàng Light 428HS 104 mắc 10ly, nhông dĩa 15 - 36 được làm bằng thép bền bỉ theo thời gian, sên được mạ vàng theo công nghệ xi mạ tiên tiến thế hệ mới, thương hiệu Light Speed Racing xuất xứ từ Việt Nam được coi là nơi cung cấp sản phẩm chất lượng với giá thành hợp lí.', N'Đang hoạt động', CAST(N'2023-10-05T06:28:53.467' AS DateTime), CAST(N'2023-10-05T06:26:09.870' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'fa425ec8-9ef0-48c8-a950-9b1ffe7bddb3', NULL, NULL, N'0879c2e4-a35c-42d0-96dd-ef0f8bf9a71b', N'Lốp Sau Dunlop D102A (70/90-17)', 1060000, 20000, 100, N'Lốp Dunlop D102A 70/90-17 - 120/70-17 dành cho xe Winner 150 V1, Winner X, Exciter 150, Exciter 155... các đời. với thiết kế gai đặc biệt, cao su khá tốt, bám đường cực tốt khi vào cua và thoát nước cực tốt trên đường ướt, độ mài mòn cực thấp giúp lốp rất bền, sử dụng rất lâu và cũng chống ăn đinh rất tốt. Vỏ xe Dunlop D102A 70/90-17 - 120/70-17 được sản xuất tại Indonesia.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T09:33:51.343' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'f183c05a-e7de-4d98-9af0-af7e5acf9751', NULL, N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Kính H2C tròn', 220000, 0, 100, N'Kính H2C tròn hàng gia công làm bằng nhôm sắc nét, kiểu dáng khá độc đáo, lên xe nhìn gọn nhưng vẫn có thể quan sát rất rõ tình hình phía sau, đảm bảo an toàn. Kính H2C đã được mode chân lại, nhìn rất thẩm mỹ Kính H2C tròn có thể gắn đước tất cả các loại xe 2 bánh.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T14:52:15.313' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'61fe54d1-102e-40af-b124-a6157d1f5095', NULL, NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Bộ nhông sên dĩa X1R cho Winner (122L)', 380000, 20000, 100, N'Bộ nhông sên dĩa X1R Đen cho Winner bằng thép với hoa văn cắt CNC, đảm bảo được độ cứng và độ bền, độ đồng tâm của sản phẩm. Với 3 bước gia công trên bề mặt: Xi chrome - phủ đồng thật - xi màu đảm bảo không phai màu đồng thời gia tăng khả năng chống ăn mòn oxi hóa nâng cao giá trị sử dụng cho sản phẩm. Bộ nhông sên dĩa X1R cho Winner thông số: 428-15T-44T-122L', N'Đang hoạt động', NULL, CAST(N'2023-10-06T03:20:34.943' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'44279e1f-dc22-4a81-adee-a6bd351cb98c', NULL, NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Lọc gió zin SH Mode 125 (2020 - 2022)', 125000, 20000, 100, N'Lọc gió zin SH Mode 125 (2020 - 2022) Theo khuyến cáo của hãng, không vệ sinh lọc gió zin mà nên thay thế định kỳ sau mỗi 8.000 - 10.000 km tùy điều kiện vận hành. Việc thay lọc gió đúng định kỳ sẽ giúp động cơ luôn vận hành trong tình trạng tốt, ổn định nhất.', N'Đang hoạt động', CAST(N'2023-10-06T09:19:09.230' AS DateTime), CAST(N'2023-10-06T07:30:45.640' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', NULL, NULL, N'6aa4a7de-eea1-4a0b-a536-c86cc0698448', N'Nhớt Motul Scooter Power LE 5W40 0.8L', 165000, 0, 100, N'Motul Scooter Power LE 5W40 0.8L nhớt xe tay ga đời mới của tập đoàn nhớt Motul. Nhớt kiểm soát tốt cặn trong piston, chống mài mòn, chống ăn mòn cực kỳ hiệu quả với khả năng tẩy rửa tuyệt hảo giúp động cơ luôn được giữ sạch. - Dầu nhớt tổng hợp 100%. - Tiêu chuẩn: API SN, JASO MB.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T12:46:51.053' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'11b1a93f-1b1d-4d61-acf5-ad4b723889a4', N'94a18909-5598-4fdd-962b-a5be46bae754', NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Bộ nhông sên dĩa X1R cho Exciter 150 (122L, Vàng)', 380000, 20000, 100, N'Bộ nhông sên dĩa X1R Đen cho Exciter 150 bằng thép với hoa văn cắt CNC, đảm bảo được độ cứng và độ bền, độ đồng tâm của sản phẩm. Bộ nhông sên dĩa X1R cho Exciter 150 thông số: 428-42T-14T-122L (Đen). - Nhông dĩa X-steel với chất liệu được làm bằng chất thép chuẩn được nhập khẩu từ Nhật Bản và tiêu chuẩn sản xuất được kiểm định chất lượng hàng đầu Châu Á. - Sên X1R có độ dày mắt sên cao (1.85-2.03mm). Sở hữu những mắt xích được nối lại với nhau một cách thấm mỹ cực chắc chắn, không rò rỉ, đảm bảo tuổi thọ màu sắc một khi gắn lên xe trông thật sang trọng góp phần làm nổi bật cả dàn chân. - Với 3 bước gia công trên bề mặt độc đáo: Xi chrome - phủ đồng thật - xi màu đảm bảo không phai màu đồng thời gia tăng khả năng chống ăn mòn oxi hóa nâng cao giá trị sử dụng cho sản phẩm.', N'Đang hoạt động', CAST(N'2023-10-05T06:18:56.813' AS DateTime), CAST(N'2023-10-05T06:10:42.640' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'4a63603c-aea3-42e5-89c6-aeef5a132743', NULL, NULL, N'0879c2e4-a35c-42d0-96dd-ef0f8bf9a71b', N'Lốp Sau Michelin City Extra (90/90-14)', 686000, 20000, 100, N'Lốp Michelin City Extra 80/90-14 - 90/90-14 dành cho xe Air Blade, Vision, Vario, Click Thái, Genio, Beat...các đời. Vỏ Michelin City Extra, một sản phẩm mới của thương hiệu nổi tiếng Michelin, thiết kế dành cho các cung đường ẩm ướt. Sản phẩm được lấy công nghệ từ vỏ dòng vỏ Pilot Road 4 và Road 5 các dòng xe PKL của Michelin. Vỏ Michelin City Extra 80/90-14 - 90/90-14 có độ ổn định và khả năng xử lý nước trên đường tuyệt vời nhờ các rãnh gai nhỏ trên bề mặt vỏ, rãnh gai nhỏ tiếp xúc với mặt đường ướt và xé ra 2 bên trong lúc vận hành, giúp xe không trơn trượt một cách hiệu quả. Công nghệ mật độ cao được hỗ trợ bởi 3 lớp bố được gia cường để tăng khả năng chống đinh, chống đâm thủng. Vỏ Michelin City Extra chính hãng được sản xuất tại Indonesia.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T09:28:25.510' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'7d08f9f3-0c77-464a-83a9-b425b4dbf20d', N'f183c05a-e7de-4d98-9af0-af7e5acf9751', N'249b1a2f-6b5b-4b38-bc80-398d8e93d192', N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Bộ công tắc đèn Sunfa cho Future', 250000, 10000, 86, N'Bộ công tắc đèn Sunfa cho Future, gắn trực tiếp và nút pha cos (passing) rất tiện dụng, full bộ gắn không cần phải khoét dàn nhựa hoặc chế cháo. Bộ công tắc đèn Sunfa cho Future phù hợp cho khách không thích mở đèn trời sáng hoặc tạm tắt khi vào đường nhỏ đông người tránh chiếu đèn vào mặt người khác. Bảo hành 12 tháng 1 đổi 1. Sản phẩm chưa bao gồm công lắp đặt.', N'Đang hoạt động', CAST(N'2023-11-14T22:53:11.107' AS DateTime), CAST(N'2023-10-06T15:01:04.917' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'0f6e7327-31c2-49f8-a55d-bad962c61dc1', NULL, N'afc2aff6-09c2-4294-8bed-5ad07762f34a', N'6aa4a7de-eea1-4a0b-a536-c86cc0698448', N'Nhớt Máy AirBlack', 120000, 20000, 0, N'<p><span style="color: rgb(33, 37, 41);">Tùy theo từng dòng xe, chúng ta sẽ chọn&nbsp;</span><a href="https://daucongnghiep.vn/bang-gia-nhot-xe-may-cao-cap-chuan-dai-ly-ppdate/" rel="noopener noreferrer" target="_blank" style="color: rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1));"><strong>các loại nhớt xe máy</strong></a><span style="color: rgb(33, 37, 41);">&nbsp;sao cho phù hợp. Bên cạnh đó, bạn còn có thể tùy chọn theo thương hiệu nhớt với mức giá vừa túi tiền. Nếu bạn vẫn còn phân vân không biết nên chọn nhớt xe máy nào là tốt nhất thì hãy theo dõi hết bài viết này. Qua đó còn giúp bạn tìm được nơi bán nhớt chất lượng với giá phải chăng.</span></p>', N'Hết hàng', NULL, CAST(N'2023-11-27T12:17:57.827' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'99f1dc5f-c056-46b5-922f-bd9642d6ecdd', NULL, NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Mâm RCB 6 cây chính hãng bản 1.6 cho Honda Winner', 3400000, 20000, 100, N'Mâm RCB chính hãng 6 cây 2 đĩa bản nhỏ 1.6-1.6 dành cho Honda Winner, bản mâm nhỏ, làm xe thanh thoát hơn, phù hợp cho Biker thích đi xe nhỏ gọn. Mâm RCB Winner kích thước bản mâm bánh trước 1.6 và bánh sau 1.6. Mâm RCB 6 cây hàng chính hãng RCB gắn vừa Honda Winner, Winner X mà không cần chế cháo thêm.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T09:10:38.637' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'54428065-01a5-4b6a-bee9-ca32afbe5b61', NULL, NULL, N'6aa4a7de-eea1-4a0b-a536-c86cc0698448', N'Nhớt ENI I-Ride Scooter MA2 5W40 (1.2L)', 315000, 0, 99, N'Nhớt ENI I-Ride Scooter MA2 5W40 (1.2L) có khả năng chịu nhiệt và chống lại sự mài mòn, giúp bảo vệ động cơ và tăng tuổi thọ của xe tay ga. - Nhớt tổng hợp toàn phần (Fully Synthetic) - Cấp nhớt: JASO MA2 | API SN - Thời gian đi: 2.500 - 3.000 Km.', N'Đang hoạt động', NULL, CAST(N'2023-10-05T07:55:43.160' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'1bfeb98f-9641-47a7-bc07-ca71c1d10f3c', N'2f5831e2-ecf1-4d5d-87ac-a7adcf066a47', NULL, N'0879c2e4-a35c-42d0-96dd-ef0f8bf9a71b', N'Lốp Trước Michelin City Extra (80/90-14 - 90/90-14)', 594000, 20000, 100, N'Lốp Michelin City Extra 80/90-14 - 90/90-14 dành cho xe Air Blade, Vision, Vario, Click Thái, Genio, Beat...các đời. Vỏ Michelin City Extra, một sản phẩm mới của thương hiệu nổi tiếng Michelin, thiết kế dành cho các cung đường ẩm ướt. Sản phẩm được lấy công nghệ từ vỏ dòng vỏ Pilot Road 4 và Road 5 các dòng xe PKL của Michelin. Vỏ Michelin City Extra 80/90-14 - 90/90-14 có độ ổn định và khả năng xử lý nước trên đường tuyệt vời nhờ các rãnh gai nhỏ trên bề mặt vỏ, rãnh gai nhỏ tiếp xúc với mặt đường ướt và xé ra 2 bên trong lúc vận hành, giúp xe không trơn trượt một cách hiệu quả. Công nghệ mật độ cao được hỗ trợ bởi 3 lớp bố được gia cường để tăng khả năng chống đinh, chống đâm thủng. Vỏ Michelin City Extra chính hãng được sản xuất tại Indonesia.', N'Đang hoạt động', CAST(N'2023-10-06T09:28:41.673' AS DateTime), CAST(N'2023-10-06T09:25:48.980' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'd5c5ee91-cd4a-4f95-b835-cfc918ced4af', NULL, N'afc2aff6-09c2-4294-8bed-5ad07762f34a', N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Cặp kính Exciter 2018', 90000, 10000, 100, N'<p>🕶️ <span style="color: var(--tw-prose-bold);">Cặp Kính Exciter 2018 - Sự Kết Hợp Hoàn Hảo Giữa Phong Cách và Chất Lượng!</span></p><p>🌈 <span style="color: var(--tw-prose-bold);">Đa Dạng Màu Sắc:</span></p><p>Exciter 2018 mang đến cho bạn sự lựa chọn đa dạng với nhiều màu sắc phong phú. Từ sắc đen sang trọng cho đến những tông màu nổi bật, bạn có thể dễ dàng tìm thấy cặp kính phản ánh phong cách riêng của mình.</p><p>🔥 <span style="color: var(--tw-prose-bold);">Chất Liệu Cao Cấp:</span></p><p>Với chất liệu nhẹ nhàng nhưng cực kỳ bền bỉ, Exciter 2018 không chỉ làm nổi bật khuôn mặt của bạn mà còn đảm bảo thoải mái trong suốt thời gian sử dụng.</p><p>👓 <span style="color: var(--tw-prose-bold);">Thiết Kế Độc Đáo:</span></p><p>Thiết kế hiện đại và độc đáo giúp Exciter 2018 trở thành điểm nhấn thu hút mọi ánh nhìn. Không chỉ là một cặp kính bảo vệ mắt, mà còn là phần không thể thiếu của bức tranh phong cách của bạn.</p><p><br></p><p>📦 <span style="color: var(--tw-prose-bold);">Giao Hàng Nhanh Chóng:</span></p><p>Đặt hàng ngay hôm nay. Chúng tôi cam kết giao hàng nhanh chóng và đảm bảo hài lòng của bạn.</p><p>💯<span style="color: var(--tw-prose-bold);">Chọn Phong Cách, Chọn Chất Lượng!</span></p><p>Mua ngay để trải nghiệm sự khác biệt! 🛍️</p>', N'Đang hoạt động', CAST(N'2023-12-09T23:31:43.350' AS DateTime), CAST(N'2023-11-09T07:05:01.300' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', NULL, NULL, N'6aa4a7de-eea1-4a0b-a536-c86cc0698448', N'Nhớt Fuchs Silkolene Pro 4 10W40 XP', 275000, 0, 100, N'Phụ tùng xe máy Nhớt xe máy Fuchs Nhớt Fuchs Silkolene Pro 4 10W40 XP Nhớt Fuchs Silkolene Pro 4 10W40 XP Mã SP: 390000   Nhớt Fuchs Silkolene Pro 4 10W40 XP lvới đặc tính chạy êm mát máy, phù hợp với tất cả các loại xe số và xe tay côn hiện nay. - Dầu nhớt tổng hợp toàn phần 100% Full Synthetic - API SN, Jaso: MA2 - Nhớt Fuchs Silkolene Pro 4 10W40 XP sản xuất tại Anh.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T13:06:02.297' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'94a18909-5598-4fdd-962b-a5be46bae754', NULL, N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Nắp nhớt inox Salaya cho các dòng xe Honda, Yamaha', 75000, 0, 100, N'Nắp nhớt inox Salaya cho Honda, Yamaha, thiết kế inox rất chắc chắn, sáng bóng theo thời gian, giá thành hợp lí, dùng để thay thế nắp nhớt zin cũ kỹ hoặc làm món phụ tùng trang trì cực chất. Nắp nhớt inox Salaya cho có thể gắn vừa các dòng xe Honda, Yamaha.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T14:39:07.717' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'8934f72b-b8df-4d45-bad0-dc7b22cf452d', N'2f5831e2-ecf1-4d5d-87ac-a7adcf066a47', NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Bố thắng đĩa AB 110 Fi/ 125, Lead', 145000, 20000, 100, N'Bố thắng đĩa AB 110 Fi/ 125, Lead, Vision, Vario, Click... Bố thắng Honda có độ cứng vững cao, chịu được lực phanh lớn, đảm bảo phanh hiệu quả và không gây bó kẹt. Chống bào mòn, không gây tiếng kêu. Với độ bám tốt, lực bám đồng đều ở bề mặt đáp ứng rất tốt cho mọi điều kiện vận hành của xe. Đặc biệt là xe di chuyển ở các thành phố lớn, khi lên ga xuống ga và phanh nhiều nhiệt sinh ra lớn dẫn đến má phanh đĩa bị mài mòn rất nhanh.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T07:40:21.367' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'b5ccf74e-c207-47fe-8693-dcd85ce55df4', N'94a18909-5598-4fdd-962b-a5be46bae754', NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Lọc gió K&N HA-1416 chính hãng cho Winner, Sonic', 125000, 30000, 100, N'Lọc gió K&N HA-1416 cho Winner, Sonic vừa lọc tốt, vừa tăng lưu lượng gió nạp, giúp động cơ tăng tốc rất hiệu quả, giúp máy vận hành nhẹ nhàng rõ rệt, bởi nó luôn đảm bảo tỷ lệ gió/ xăng ổn định, nhất là khi tăng tốc và chạy đường trường. Lọc gió K&N là loại lọc vĩnh cữu, có thể dễ dàng vệ sinh sử dụng lại Lọc gió K&N HA-1416 hàng chính hãng K&N USA. Lọc gió K&N HA-1416 dùng cho Sonic, Winner 150, Winner X gắn như zin.', N'Đang hoạt động', NULL, CAST(N'2023-10-04T13:29:19.690' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'618ec696-75dc-4988-ba05-deab133e340b', N'94a18909-5598-4fdd-962b-a5be46bae754', NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Sên RK vàng đen 428SB - 124L chính hãng', 550000, 20000, 100, N'Sên RK vàng đen 428SB - 124L, hàng chính hãng thương hiệu RK chuyên sản xuất sên cho các dòng xe PKL, xe đua...số 1 Nhật Bản. Sên RK vàng đen 428SB - 124L là loại sên 9ly không phốt, dài 124 mắc, sên có lớp mạ vàng phối đen 2 màu rất đẹp, độc lạ, nhìn nổi bật đồng thời màu sắc cũng được giữ rất dài lâu so với loại sên thường. Sên RK vàng đen 428SB - 124L chính hãng được sản xuất tại Nhật gắn được nhiều loại xe số.', N'Đang hoạt động', NULL, CAST(N'2023-10-05T06:40:28.890' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'5c51a96c-390d-40ee-9f64-ef315eef4977', N'f183c05a-e7de-4d98-9af0-af7e5acf9751', NULL, N'b6d56b80-8195-46c7-8159-2d4ead32bf0f', N'Tay thắng zin bên trái cho AB, Click (màu bạc)', 90000, 15000, 89, N'Tay thắng zin bên trái cho AB, Click (màu bạc) hàng chính hãng Honda thay thế cho xe bị trầy hoặc gãy tay thắng zin theo xe.', N'Đang hoạt động', NULL, CAST(N'2023-10-06T14:55:47.277' AS DateTime))
INSERT [dbo].[MotobikeProduct] ([Id], [DiscountId], [WarrantyId], [CategoryId], [Name], [PriceCurrent], [InstallationFee], [Quantity], [Description], [Status], [UpdateAt], [CreateAt]) VALUES (N'24392438-89aa-4f53-bf4a-f688f65059d2', NULL, NULL, N'7dd697f0-fa0c-4206-a3ae-3bb15735c0d2', N'Phuộc RCB MB2 ty vàng chính hãng cho Wave, Dream, Future', 2850000, 15000, 100, N'Phuộc RCB MB2 ty vàng chính hãng bình dầu cho Wave, Dream, Future, Blade...mẫu mới với thiết kế kiểu dáng đẹp, trẻ trung,với ty phuộc được mạ vàng rất độc đáo. Racingboy MB2 chính hãng có chân phuộc làm bằng sắt rất cứng cáp, an toàn hơn khi vận hành Phuộc RCB MB2 ty vàng hàng chính hãng RacingBoy. Thời gian bảo hành : 12 tháng. Phuộc RCB MB2 cao 335mm gắn được cho Wave, Dream, Future, Blade...', N'Đang hoạt động', NULL, CAST(N'2023-10-06T08:59:00.747' AS DateTime))
GO

INSERT [dbo].[AccountRole] ([Id], [RoleName]) VALUES (N'99adcb57-3d49-4c02-9a4f-28202d956a96', N'Staff')
INSERT [dbo].[AccountRole] ([Id], [RoleName]) VALUES (N'a076b5e3-9cea-4774-bb54-3a64c292c992', N'Owner')
INSERT [dbo].[AccountRole] ([Id], [RoleName]) VALUES (N'e80baaec-1f78-455c-86c4-aa82a81bad34', N'Admin')
INSERT [dbo].[AccountRole] ([Id], [RoleName]) VALUES (N'b2590c50-0226-4603-a531-b538db72f66c', N'Teller')
INSERT [dbo].[AccountRole] ([Id], [RoleName]) VALUES (N'415fdd1c-d403-4192-bf94-d1519f5ec5eb', N'Customer')
GO

INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'c4c04746-b16e-439e-a0de-03edad0b13b2', N'99adcb57-3d49-4c02-9a4f-28202d956a96', N'0394429653', N'$2a$11$H08nJ1pBSumFFHd8xynuGO/RanE.mxePcIi92JV0ZEL9cnzRKfDXu', N'Đang hoạt động', CAST(N'2023-11-28T08:00:17.430' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'bf15cb35-e214-4f3c-b437-059cdd31d703', N'99adcb57-3d49-4c02-9a4f-28202d956a96', N'0983200340', N'$2a$11$08cIk28sKJH7sO1TT2yfa.WWMdjl091HufWAsufIXYyTdxLyhdUpa', N'Đang hoạt động', CAST(N'2023-11-13T06:02:13.457' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'95657f1e-a308-4bd7-a27d-0b3ec512514d', N'e80baaec-1f78-455c-86c4-aa82a81bad34', N'arths.admin', N'$2a$11$0mBweHUycazTnZbrV4Grp.aAT7HwLgdFvUpNKSVgLz5DuZh3kP9tq', N'Đang hoạt động', CAST(N'2023-11-26T07:37:13.087' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'13a98567-6cd6-4d2a-b7e1-35b3a98881e8', N'415fdd1c-d403-4192-bf94-d1519f5ec5eb', N'0972707132', N'$2a$11$mL3ADrKSC0Fv2uAoyOlITuBB4/JgfI6MRmQ.WOqBY42ipf6wojQyS', N'Đang hoạt động', CAST(N'2023-11-26T04:23:03.160' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'6b345ba2-4068-4bc1-8f5a-42427cfe4b98', N'99adcb57-3d49-4c02-9a4f-28202d956a96', N'0385497047', N'$2a$11$R3n3kICwgW.JBYvRxrgFRu5ts01V4R/O7uhZKo6nCEm1v3qrpu2x2', N'Đang hoạt động', CAST(N'2023-10-04T13:31:36.600' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'c9b5df48-4f3f-4028-b69e-4fc59a5dcf58', N'a076b5e3-9cea-4774-bb54-3a64c292c992', N'0969920894', N'$2a$11$cKIcsmSJR6tohdmw9Zwa6uktInApBufsQe/a8RxJviTvS.slwQa1.', N'Đang hoạt động', CAST(N'2023-10-04T13:03:31.513' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'fe3ac8f8-a097-4a49-bf34-6c6b166630a9', N'415fdd1c-d403-4192-bf94-d1519f5ec5eb', N'0767835868', N'$2a$11$0xr80JYzm7vQbxuQjHKvKedOJliAXJoFVbb5ZHcIlT6yKO3ueouwK', N'Đang hoạt động', CAST(N'2023-10-07T14:12:53.050' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'bae141ba-3ad3-4dd2-90f2-6d3237addfbe', N'99adcb57-3d49-4c02-9a4f-28202d956a96', N'0972707123', N'$2a$11$bUS5Ldf5pihI4BtRBcmzGO1Domt0NKilb/6G49i/PimRGqQjmDNgi', N'Đang hoạt động', CAST(N'2023-10-23T09:02:35.557' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'8f973ad2-670e-4cbc-bcf9-784efcc65514', N'415fdd1c-d403-4192-bf94-d1519f5ec5eb', N'0868558709', N'$2a$11$nE3PqaVia.iwPPuDA4VNd./t.GwpUxbBU5NQW3ZQvoHsKTgubfCD6', N'Đang hoạt động', CAST(N'2023-11-15T23:55:04.713' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'95212238-59f8-4638-a2a8-7967532fbd66', N'99adcb57-3d49-4c02-9a4f-28202d956a96', N'0867205842', N'$2a$11$RsAFpUfOeg692q35KXBcCe7AkypMA.zrmRsXlWRPAqDGIWEl6cONq', N'Đang hoạt động', CAST(N'2023-11-18T11:01:27.953' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'85b504a8-3b4b-4dc6-9710-9f8d3db62f5e', N'99adcb57-3d49-4c02-9a4f-28202d956a96', N'0973706123', N'$2a$11$GKTB7m1mT8E97dDG5CGwXeSW45DCMB5byUy2A7MmfM5D7R8sJpBy.', N'Đang hoạt động', CAST(N'2023-10-23T09:03:18.250' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'ce837f5a-4cd3-4251-9270-ae23c4a188d5', N'99adcb57-3d49-4c02-9a4f-28202d956a96', N'01663578554', N'$2a$11$LynRTH7s6pF.fm8HVdAnHu4FyywgUZHYUYSwbVyt4CbPv2eI8r7jK', N'Đang hoạt động', CAST(N'2023-10-23T09:01:45.153' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'79b2ceaa-87a6-4a4b-b7a6-bfbd20d0a105', N'415fdd1c-d403-4192-bf94-d1519f5ec5eb', N'0936886831', N'$2a$11$1Mcg2Hh3djbtOgOsPTGP3ORAPWihTzMk1359ap2P3rdh3MXvhEYke', N'Đang hoạt động', CAST(N'2023-11-27T10:54:33.090' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'0dbc753e-3960-4cb8-b37e-ccb8c7458584', N'99adcb57-3d49-4c02-9a4f-28202d956a96', N'0933247893', N'$2a$11$AThZ46z2JckYhBLLwQ41t.yzLto.Ps6OhpnJvFaCLCYL0uwyh11YW', N'Đang hoạt động', CAST(N'2023-11-26T14:44:01.987' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'5c3e69f2-1eb0-415b-a5e6-d2a43dd6ae30', N'415fdd1c-d403-4192-bf94-d1519f5ec5eb', N'0327841354', N'$2a$11$bQO3KXSKt9KkHdy7vH8RxePvzXtSeAyIAZuj.V8u2Dq/Eoiy0PRqG', N'Đang hoạt động', CAST(N'2023-10-25T09:48:25.540' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', N'415fdd1c-d403-4192-bf94-d1519f5ec5eb', N'0937709179', N'$2a$11$ewxicNKZ6/TqhXplfeaAVuHwT.jGntmXdQ13eDcKAKHInA9pg9AjO', N'Đang hoạt động', CAST(N'2023-10-17T12:48:01.980' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'c9f9aa03-ced9-445a-b545-e35c54116399', N'99adcb57-3d49-4c02-9a4f-28202d956a96', N'0342002339', N'$2a$11$wJSbSryH25wNNTdPGCbdqea9Vhl3cb50c6bHeFDrb4cRj2lGmn9Mi', N'Đang hoạt động', CAST(N'2023-11-28T08:00:57.123' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'a8596a65-25ef-4fd3-9c54-ea43c2ea50bf', N'b2590c50-0226-4603-a531-b538db72f66c', N'0908255450', N'$2a$11$RZm0/Xw/Zr45xQSVKP8uAOBLzvthlTdCe2Jq1ji99P168j498th..', N'Đang hoạt động', CAST(N'2023-10-23T03:11:23.530' AS DateTime))
INSERT [dbo].[Account] ([Id], [RoleId], [PhoneNumber], [PasswordHash], [Status], [CreateAt]) VALUES (N'535f7a78-2351-4a4a-abb4-fdbf07eb24d5', N'b2590c50-0226-4603-a531-b538db72f66c', N'0987654321', N'$2a$11$4eQyuqIYdZOvarinZ6F6su/Z63My53hV9noCWezArY2oOxHesd1.G', N'Đang hoạt động', CAST(N'2023-10-04T13:32:08.187' AS DateTime))
GO

INSERT [dbo].[StaffAccount] ([AccountId], [FullName], [Gender], [Avatar]) VALUES (N'c4c04746-b16e-439e-a0de-03edad0b13b2', N'Nguyễn Hữu Thắng', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f')
INSERT [dbo].[StaffAccount] ([AccountId], [FullName], [Gender], [Avatar]) VALUES (N'bf15cb35-e214-4f3c-b437-059cdd31d703', N'BHT Nghĩa', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f')
INSERT [dbo].[StaffAccount] ([AccountId], [FullName], [Gender], [Avatar]) VALUES (N'6b345ba2-4068-4bc1-8f5a-42427cfe4b98', N'Trần Văn Tuệ', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f')
INSERT [dbo].[StaffAccount] ([AccountId], [FullName], [Gender], [Avatar]) VALUES (N'bae141ba-3ad3-4dd2-90f2-6d3237addfbe', N'Lê Thanh Tùng', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f')
INSERT [dbo].[StaffAccount] ([AccountId], [FullName], [Gender], [Avatar]) VALUES (N'95212238-59f8-4638-a2a8-7967532fbd66', N'Thái Văn Cường', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f')
INSERT [dbo].[StaffAccount] ([AccountId], [FullName], [Gender], [Avatar]) VALUES (N'85b504a8-3b4b-4dc6-9710-9f8d3db62f5e', N'Nguyễn Đức Anh', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f')
INSERT [dbo].[StaffAccount] ([AccountId], [FullName], [Gender], [Avatar]) VALUES (N'ce837f5a-4cd3-4251-9270-ae23c4a188d5', N'Hoàng Văn Huy', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f')
INSERT [dbo].[StaffAccount] ([AccountId], [FullName], [Gender], [Avatar]) VALUES (N'0dbc753e-3960-4cb8-b37e-ccb8c7458584', N'Tấn Trung', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F0dbc753e-3960-4cb8-b37e-ccb8c7458584?alt=media')
INSERT [dbo].[StaffAccount] ([AccountId], [FullName], [Gender], [Avatar]) VALUES (N'c9f9aa03-ced9-445a-b545-e35c54116399', N'Lương Minh Huy', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f')
GO

INSERT [dbo].[TellerAccount] ([AccountId], [FullName], [Gender], [Avatar]) VALUES (N'a8596a65-25ef-4fd3-9c54-ea43c2ea50bf', N'Thanh Trúc', N'Nữ', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f')
INSERT [dbo].[TellerAccount] ([AccountId], [FullName], [Gender], [Avatar]) VALUES (N'535f7a78-2351-4a4a-abb4-fdbf07eb24d5', N'Trang Nguyễn', N'Nữ', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f')
GO

INSERT [dbo].[OwnerAccount] ([AccountId], [FullName], [Gender], [Avatar]) VALUES (N'95657f1e-a308-4bd7-a27d-0b3ec512514d', N'ADMIN', N'ADMIN', NULL)
INSERT [dbo].[OwnerAccount] ([AccountId], [FullName], [Gender], [Avatar]) VALUES (N'c9b5df48-4f3f-4028-b69e-4fc59a5dcf58', N'Nguyễn Tấn Trung', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fc9b5df48-4f3f-4028-b69e-4fc59a5dcf58?alt=media')
GO

INSERT [dbo].[CustomerAccount] ([AccountId], [FullName], [Gender], [Avatar], [Address], [Otp]) VALUES (N'13a98567-6cd6-4d2a-b7e1-35b3a98881e8', N'Nghĩa Bùi ', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f', N'73 phạm văn chiêu , Phường 14, Quận Gò Vấp, Thành phố Hồ Chí Minh', N'251463')
INSERT [dbo].[CustomerAccount] ([AccountId], [FullName], [Gender], [Avatar], [Address], [Otp]) VALUES (N'fe3ac8f8-a097-4a49-bf34-6c6b166630a9', N'Lương Quan Thắng', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Ffe3ac8f8-a097-4a49-bf34-6c6b166630a9?alt=media', N'123, Xã Hùng Tiến, Huyện Kim Bôi, Tỉnh Hoà Bình', N'478563')
INSERT [dbo].[CustomerAccount] ([AccountId], [FullName], [Gender], [Avatar], [Address], [Otp]) VALUES (N'8f973ad2-670e-4cbc-bcf9-784efcc65514', N'Truong03', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f', N'73 Phạm Văn Chiêu, Phường 14, Quận Gò Vấp, Thành Phố Hồ Chí Minh', N'774412')
INSERT [dbo].[CustomerAccount] ([AccountId], [FullName], [Gender], [Avatar], [Address], [Otp]) VALUES (N'79b2ceaa-87a6-4a4b-b7a6-bfbd20d0a105', N'Sozux1', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f', N'12, Xã Bản Cầm, Huyện Bảo Thắng, Tỉnh Lào Cai', N'985476')
INSERT [dbo].[CustomerAccount] ([AccountId], [FullName], [Gender], [Avatar], [Address], [Otp]) VALUES (N'5c3e69f2-1eb0-415b-a5e6-d2a43dd6ae30', N'Hoàng Thành Nam', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1144760.png?alt=media&token=5c9e6261-0e51-4f04-85c2-e91e002e242f', N'73 Phạm Văn Chiêu, Phường 14, Quận Gò Vấp, Thành Phố Hồ Chí Minh', N'259687')
INSERT [dbo].[CustomerAccount] ([AccountId], [FullName], [Gender], [Avatar], [Address], [Otp]) VALUES (N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', N'Trung Customer', N'Nam', N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1b9712a4-4a3a-4322-ade9-d35ef2059ce7?alt=media', N'445 khu phố 8, Phường Tương Bình Hiệp, Thành phố Thủ Dầu Một, Tỉnh Bình Dương', N'114532')
GO

INSERT [dbo].[Cart] ([Id], [CustomerId]) VALUES (N'93777227-3f70-4683-9ed0-eb62db5622de', N'13a98567-6cd6-4d2a-b7e1-35b3a98881e8')
INSERT [dbo].[Cart] ([Id], [CustomerId]) VALUES (N'a8097777-0941-41ec-8f4e-39161e3d8773', N'fe3ac8f8-a097-4a49-bf34-6c6b166630a9')
INSERT [dbo].[Cart] ([Id], [CustomerId]) VALUES (N'eabea605-c460-4503-9e9b-162cc03bf079', N'8f973ad2-670e-4cbc-bcf9-784efcc65514')
INSERT [dbo].[Cart] ([Id], [CustomerId]) VALUES (N'4cb7f544-6fe3-482c-b27c-f2083ebc9243', N'79b2ceaa-87a6-4a4b-b7a6-bfbd20d0a105')
INSERT [dbo].[Cart] ([Id], [CustomerId]) VALUES (N'323471f9-33a8-402e-9829-960c0f517b91', N'5c3e69f2-1eb0-415b-a5e6-d2a43dd6ae30')
INSERT [dbo].[Cart] ([Id], [CustomerId]) VALUES (N'7d667b60-9216-4bda-9301-f382c22b9c3e', N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7')
GO

INSERT [dbo].[Order] ([Id], [CustomerId], [TellerId], [StaffId], [ShippingCode], [ShippingMoney], [CustomerPhoneNumber], [CustomerName], [Address], [PaymentMethod], [Status], [TotalAmount], [CancellationReason], [CancellationDate], [LicensePlate], [OrderType], [OrderDate]) VALUES (N'OR10E6A3E4', NULL, N'535f7a78-2351-4a4a-abb4-fdbf07eb24d5', N'bf15cb35-e214-4f3c-b437-059cdd31d703', NULL, NULL, N'0745645645', N'Trung01', NULL, NULL, N'Chờ xử lý', 662000, NULL, NULL, N'', N'Offline', CAST(N'2023-12-05T10:42:04.527' AS DateTime))
INSERT [dbo].[Order] ([Id], [CustomerId], [TellerId], [StaffId], [ShippingCode], [ShippingMoney], [CustomerPhoneNumber], [CustomerName], [Address], [PaymentMethod], [Status], [TotalAmount], [CancellationReason], [CancellationDate], [LicensePlate], [OrderType], [OrderDate]) VALUES (N'OR1BAB0D1C', N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', NULL, NULL, N'LF7LQF', 0, N'0937709179', N'Trung Customer', N'444 khu phố 8, Phường Tương Bình Hiệp, Thành phố Thủ Dầu Một, Tỉnh Bình Dương', N'VNPay', N'Hoàn thành', 1095000, NULL, NULL, NULL, N'Online', CAST(N'2023-12-05T13:29:32.043' AS DateTime))
INSERT [dbo].[Order] ([Id], [CustomerId], [TellerId], [StaffId], [ShippingCode], [ShippingMoney], [CustomerPhoneNumber], [CustomerName], [Address], [PaymentMethod], [Status], [TotalAmount], [CancellationReason], [CancellationDate], [LicensePlate], [OrderType], [OrderDate]) VALUES (N'OR35E76522', N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', N'a8596a65-25ef-4fd3-9c54-ea43c2ea50bf', N'0dbc753e-3960-4cb8-b37e-ccb8c7458584', NULL, NULL, N'0937709179', N'Trung Customer', NULL, N'Tiền mặt', N'Hoàn thành', 260000, NULL, NULL, N'76D59912', N'Offline', CAST(N'2023-12-05T12:58:49.873' AS DateTime))
INSERT [dbo].[Order] ([Id], [CustomerId], [TellerId], [StaffId], [ShippingCode], [ShippingMoney], [CustomerPhoneNumber], [CustomerName], [Address], [PaymentMethod], [Status], [TotalAmount], [CancellationReason], [CancellationDate], [LicensePlate], [OrderType], [OrderDate]) VALUES (N'OR3751B099', NULL, N'a8596a65-25ef-4fd3-9c54-ea43c2ea50bf', N'0dbc753e-3960-4cb8-b37e-ccb8c7458584', NULL, NULL, N'0937709179', N'Trung Nguyễn', NULL, N'VNPay', N'Hoàn thành', 3005000, NULL, NULL, N'76D59912', N'Offline', CAST(N'2023-12-05T12:28:31.077' AS DateTime))
INSERT [dbo].[Order] ([Id], [CustomerId], [TellerId], [StaffId], [ShippingCode], [ShippingMoney], [CustomerPhoneNumber], [CustomerName], [Address], [PaymentMethod], [Status], [TotalAmount], [CancellationReason], [CancellationDate], [LicensePlate], [OrderType], [OrderDate]) VALUES (N'OR47852610', NULL, N'535f7a78-2351-4a4a-abb4-fdbf07eb24d5', NULL, NULL, NULL, N'0242342342', N'Trung', NULL, NULL, N'Chờ xử lý', 2632000, NULL, NULL, N'', N'Offline', CAST(N'2023-12-05T12:52:05.713' AS DateTime))
INSERT [dbo].[Order] ([Id], [CustomerId], [TellerId], [StaffId], [ShippingCode], [ShippingMoney], [CustomerPhoneNumber], [CustomerName], [Address], [PaymentMethod], [Status], [TotalAmount], [CancellationReason], [CancellationDate], [LicensePlate], [OrderType], [OrderDate]) VALUES (N'OR494BA715', NULL, N'a8596a65-25ef-4fd3-9c54-ea43c2ea50bf', NULL, NULL, NULL, N'0369852147', N'Trung Gà', NULL, N'Tiền mặt', N'Hoàn thành', 3310000, NULL, NULL, N'51D25541', N'Offline', CAST(N'2023-12-05T08:37:43.813' AS DateTime))
INSERT [dbo].[Order] ([Id], [CustomerId], [TellerId], [StaffId], [ShippingCode], [ShippingMoney], [CustomerPhoneNumber], [CustomerName], [Address], [PaymentMethod], [Status], [TotalAmount], [CancellationReason], [CancellationDate], [LicensePlate], [OrderType], [OrderDate]) VALUES (N'OR796084B4', NULL, N'a8596a65-25ef-4fd3-9c54-ea43c2ea50bf', NULL, NULL, NULL, N'0933258741', N'Lại Thanh Tuấn', NULL, N'Tiền mặt', N'Đã thanh toán', 872000, NULL, NULL, N'51D253321', N'Offline', CAST(N'2023-12-05T08:10:15.263' AS DateTime))
GO

INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'0d9a6a8f-87f8-4246-9929-0182645d3933', N'OR494BA715', N'7d08f9f3-0c77-464a-83a9-b425b4dbf20d', NULL, N'f183c05a-e7de-4d98-9af0-af7e5acf9751', 10, 100000, 0, 1000000, CAST(N'2023-12-05T15:37:42.973' AS DateTime), NULL, CAST(N'2023-12-05T08:37:44.193' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'f1f0dc2c-96b4-45e7-a195-02a2a242b9e3', N'OR10E6A3E4', N'0f6e7327-31c2-49f8-a55d-bad962c61dc1', NULL, NULL, 2, 120000, 0, 240000, CAST(N'2023-12-05T19:03:39.623' AS DateTime), NULL, CAST(N'2023-12-05T12:03:39.660' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'68aa9b37-9b11-40bd-b5e8-1bd0df0b38a5', N'OR494BA715', N'0a6ae4dc-15ee-451c-84b8-52630b774063', NULL, N'f183c05a-e7de-4d98-9af0-af7e5acf9751', 20, 60000, 0, 1200000, CAST(N'2023-12-05T15:37:43.230' AS DateTime), NULL, CAST(N'2023-12-05T08:37:44.193' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'42b30408-1cbf-4e66-9d5e-2bc99f44fed3', N'OR494BA715', N'e2baef67-625c-4870-afba-8b2808291f77', NULL, NULL, 30, 25000, 0, 750000, CAST(N'2023-12-05T15:37:43.473' AS DateTime), NULL, CAST(N'2023-12-05T08:37:44.193' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'2dd0202e-6b53-4e8e-a0d3-386f8ce14889', N'OR1BAB0D1C', N'697d7a94-d584-4328-b170-90734611c5fe', NULL, NULL, 1, 400000, 0, 400000, NULL, NULL, CAST(N'2023-12-05T13:29:32.047' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'f69c167e-45a3-4319-a081-43b232a1dbc0', N'OR3751B099', NULL, N'd31d4c92-27e7-430c-bd5f-93c3bdd0d43b', NULL, 0, 90000, 0, 90000, CAST(N'2023-12-05T19:28:31.060' AS DateTime), CAST(N'2024-03-05T19:28:31.063' AS DateTime), CAST(N'2023-12-05T12:28:31.080' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'ff44776c-a399-4e48-b8af-56a573638c5b', N'OR35E76522', NULL, N'e7e3a283-c377-44cc-bd57-8a555dc93882', NULL, 0, 60000, 0, 60000, CAST(N'2023-12-05T19:58:49.467' AS DateTime), NULL, CAST(N'2023-12-05T12:58:49.887' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'66078a3f-5fc4-4c0c-8498-62d1f78881f9', N'OR796084B4', N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', NULL, NULL, 1, 400000, 0, 400000, CAST(N'2023-12-05T15:10:13.550' AS DateTime), NULL, CAST(N'2023-12-05T08:10:15.773' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'b358adb5-72af-4a11-bb24-72b717acbb1f', N'OR10E6A3E4', N'7d08f9f3-0c77-464a-83a9-b425b4dbf20d', NULL, N'f183c05a-e7de-4d98-9af0-af7e5acf9751', 4, 100000, 1, 410000, CAST(N'2023-12-05T19:03:39.620' AS DateTime), CAST(N'2024-12-05T12:03:39.623' AS DateTime), CAST(N'2023-12-05T12:03:39.653' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'c99d1b9a-2238-4fa1-881b-81259bba510c', N'OR47852610', N'6ec0109b-13f8-44b2-afba-890faacfe6c4', NULL, N'f183c05a-e7de-4d98-9af0-af7e5acf9751', 1, 472000, 0, 472000, CAST(N'2023-12-05T20:17:44.773' AS DateTime), NULL, CAST(N'2023-12-05T13:17:44.800' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'c5876897-7d7d-441a-91d2-9193acb413c4', N'OR3751B099', N'8be691d2-6758-4d88-9a60-2beeacf9032e', NULL, NULL, 1, 2900000, 1, 2915000, CAST(N'2023-12-05T19:28:31.050' AS DateTime), NULL, CAST(N'2023-12-05T12:28:31.077' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'69a2e0ef-d5d8-4d2c-9523-a18fdbcb738d', N'OR1BAB0D1C', N'54428065-01a5-4b6a-bee9-ca32afbe5b61', NULL, NULL, 1, 315000, 0, 315000, NULL, NULL, CAST(N'2023-12-05T13:29:32.050' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'0330170c-1bd0-4e1c-98ce-b2b4b1f6d9a7', N'OR1BAB0D1C', N'90a50eac-7623-450c-90d9-708b9d35bf9f', NULL, NULL, 2, 190000, 0, 380000, NULL, NULL, CAST(N'2023-12-05T13:29:32.043' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'ee99198f-f426-49be-8ac7-c69739053114', N'OR47852610', N'0f6e7327-31c2-49f8-a55d-bad962c61dc1', NULL, NULL, 18, 120000, 0, 2160000, CAST(N'2023-12-05T20:17:44.777' AS DateTime), NULL, CAST(N'2023-12-05T13:17:44.800' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'002ffb37-4b70-4ea6-b1fc-d09f51818c38', N'OR494BA715', N'5c51a96c-390d-40ee-9f64-ef315eef4977', NULL, N'f183c05a-e7de-4d98-9af0-af7e5acf9751', 10, 36000, 0, 360000, CAST(N'2023-12-05T15:37:42.520' AS DateTime), NULL, CAST(N'2023-12-05T08:37:44.193' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'94eae1e9-3964-4b93-817e-dc050cd9b806', N'OR35E76522', NULL, N'298a3d10-614f-4d19-b193-63317b5c60ab', NULL, 0, 200000, 0, 200000, CAST(N'2023-12-05T19:58:49.637' AS DateTime), CAST(N'2024-03-05T19:58:49.647' AS DateTime), CAST(N'2023-12-05T12:58:49.883' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'be8fa582-d0fa-4502-9751-e65e03ceab11', N'OR796084B4', N'6ec0109b-13f8-44b2-afba-890faacfe6c4', NULL, N'f183c05a-e7de-4d98-9af0-af7e5acf9751', 1, 472000, 0, 472000, CAST(N'2023-12-05T15:10:13.000' AS DateTime), NULL, CAST(N'2023-12-05T08:10:16.080' AS DateTime))
INSERT [dbo].[OrderDetail] ([Id], [OrderId], [MotobikeProductId], [RepairServiceId], [DiscountId], [Quantity], [Price], [InstUsed], [SubTotalAmount], [WarrantyStartDate], [WarrantyEndDate], [CreateAt]) VALUES (N'8aa6362b-8760-4ad0-8a01-fa55c69909ae', N'OR10E6A3E4', NULL, N'cbf36cb2-fd06-4d4c-b3f4-1f759165a2dd', N'f183c05a-e7de-4d98-9af0-af7e5acf9751', 0, 12000, 0, 12000, CAST(N'2023-12-05T19:03:39.627' AS DateTime), NULL, CAST(N'2023-12-05T12:03:39.643' AS DateTime))
GO

INSERT [dbo].[MaintenanceSchedule] ([Id], [OrderDetailId], [CustomerId], [NextMaintenanceDate], [ReminderDate], [RemiderSend]) VALUES (N'22f00f75-23d9-4fe1-98ff-1b23d9d7c334', N'94eae1e9-3964-4b93-817e-dc050cd9b806', N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', CAST(N'2024-06-05T13:00:07.233' AS DateTime), CAST(N'2024-05-21T13:00:07.233' AS DateTime), 0)
INSERT [dbo].[MaintenanceSchedule] ([Id], [OrderDetailId], [CustomerId], [NextMaintenanceDate], [ReminderDate], [RemiderSend]) VALUES (N'ed077c3c-dd86-4ed8-ba0f-8368046a447e', N'ff44776c-a399-4e48-b8af-56a573638c5b', N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', CAST(N'2024-03-05T13:00:07.203' AS DateTime), CAST(N'2024-02-19T13:00:07.203' AS DateTime), 0)
INSERT [dbo].[MaintenanceSchedule] ([Id], [OrderDetailId], [CustomerId], [NextMaintenanceDate], [ReminderDate], [RemiderSend]) VALUES (N'545b9ca2-3ab1-4e0f-86a6-9601a1cf8f28', N'f69c167e-45a3-4319-a081-43b232a1dbc0', N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', CAST(N'2024-03-05T12:43:19.950' AS DateTime), CAST(N'2024-02-19T12:43:19.950' AS DateTime), 0)
GO

INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'd6476ba8-2221-449d-a239-0118d1277118', N'0dbc753e-3960-4cb8-b37e-ccb8c7458584', N'e35lESXzQTC5doU9Zyb2Kr:APA91bGXMAavYzZhVs2u12T6qrjqtecei5lKyTUqLj-yv5Ezflwpiq1K6-g3AFS08TjotUAaPKQsMYkLDSQGODDIk52ETsYuop-ltau14bR7AxBFU8YQ13vvKf0oTbbTLyAebZGfhJxa', CAST(N'2023-12-04T06:05:32.977' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'cbd4824e-b92a-4441-ba2e-11f62e8872e0', N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', N'ew6F9yofSvu3jnBIFBAbcJ:APA91bFnTx7Wy7rP_hdlrFyQq-jHvUN83s6YfiM0pjEoywCjxSGkM0ARt0XoIS7iMq_HOTaKNJkQs5ailcIw4Tm86jmp39nlmwBSX29HKqGGXb-58NDY0ywQweXBrAuhz-20kCmemOu5', CAST(N'2023-11-28T17:17:12.760' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'77346638-2a09-4481-8f7f-12798658d4fa', N'fe3ac8f8-a097-4a49-bf34-6c6b166630a9', N'eHWOe7IuT46dxCQRp1XKtu:APA91bEDzEkJRfp9djFtPgy152pOiMUjlfxlhyrtHxNF550e3mosKy4hVRJrcqzjNQS9ThaZDrWQCqkgNDxP6twuvgUi7vqJoVwjSpHH_YHdHC74pZzBDVCNk35kWe45tW7G21bLfTK1', CAST(N'2023-12-04T01:01:45.347' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'f84f9fbb-3a45-4d11-889d-16ffbd5fe387', N'a8596a65-25ef-4fd3-9c54-ea43c2ea50bf', N'eSXFRr5ojcHKq7sr4WNp7K:APA91bE-E9llqEkYRalN0Rk4x6_fNsl3qtEwpVFm7N7c_tkjT7DfLpPLxccIVTxIDkAy1_m8kMZA1zlVVBhKuNMaG4VJOl9uhREfzg_ezMxilqH1aSU9bWZf38QwSNOVobaubV2js7tO', CAST(N'2023-11-28T17:42:33.757' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'37b3e1b6-ba1b-4aa9-92bd-28d359a74e3d', N'535f7a78-2351-4a4a-abb4-fdbf07eb24d5', N'evJ20f2yFVzkXDNmh7iW43:APA91bHzECzc1Cd0k_SijvQiqOo_BFjIxHkjffhpFCM6ZGfEiPPS3kchYxdq1VfRJ0rd8tQJpRde5JdemBOwOuxW0B4YIZG7HpG7hS6kEL-CasxtcNIjgktsqOmRbphdbnpvBAxHv7Hm', CAST(N'2023-12-01T10:19:30.680' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'ba7380f7-2379-41f9-b918-2e6fa8361780', N'535f7a78-2351-4a4a-abb4-fdbf07eb24d5', N'eQ_Kh3gz4Yxn4PeoQi4DnW:APA91bHPgZIVDjLqHMVXtRvvurYwPmITwzAkU7-BQ6Dq3Qz_aUJloyFs2rVFlDd1eE3DZpbqeNhA8L-Wb4NxNT01RmBDOmS4SnBH_IOoUBYx4bq4m7GqqswLXekkWpn8KRt04YNVjfmY', CAST(N'2023-11-29T02:11:31.590' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'242a09df-2665-40bd-8e5b-319614c604a3', N'13a98567-6cd6-4d2a-b7e1-35b3a98881e8', N'cxo6_Tl1RuOBz-PGKiDRSn:APA91bGku5_AVwZ7XkMFJkaxRS6BeI2J31yEt1lcXgUnNDNlFJwK4fPC6KE_90xwEm6wOIkABrroz6uSvyynxC_4SD05ouOvG1I1FKB6olyGM-5P2KLx7ks1YR400BQfKYWwcjK3uK80', CAST(N'2023-11-28T17:29:33.030' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'fd04152b-f51a-4230-a597-82584fed3593', N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', N'coCPlh87Tp2ACSHwwROANq:APA91bHvEnZ51Slpxvvf2Zp2v7KZ5PhGls58TbRCco0mkVy49PxuENpOYHpGZXv8lQrFbDuED_qKiIW8ZK9iV1VptuYztZ4611mEc33deyHT0imI0dWie-KEOehgQj58bkS3tkZxnBXM', CAST(N'2023-12-04T05:32:30.983' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'7304feaa-10d3-442b-a688-828084030323', N'fe3ac8f8-a097-4a49-bf34-6c6b166630a9', N'e6MQLIupS_mGc8G6xRYBMi:APA91bHoQlVMtZqBMWLHbb4gkj8d9rBvdcW9zX0AC9FawmbRBJawgtF6e1kJMQsbL4MNkAKqIkslEIJ5z5Lp5W88G0VsJ0onP5wmCvUfXulFeR-WGrJQcnYIdGcnITFIytTNQadYgkzO', CAST(N'2023-11-28T17:19:36.207' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'e711e465-bb1a-43d9-9d6c-909fa2d47699', N'0dbc753e-3960-4cb8-b37e-ccb8c7458584', N'dUhz2aMMQM6CXL0saiT5nj:APA91bHqChaBHCwNXF_M29td_al76qcPj-TuqV0Wv0VZ-ws_lLy3MZbC2kf7VI07YSXMc0VrTK4wrNui5TggqzZp12RhCUsY9DgJlKLeKCBSu2f81Xy-PYWqmaLeBRq3thvN6Uq1y0ek', CAST(N'2023-11-28T17:34:27.517' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'6115467b-0e3e-4b92-ab7d-a8d62a69f248', N'0dbc753e-3960-4cb8-b37e-ccb8c7458584', N'dh6mWTm8Ttq9nHTfcwi68g:APA91bGApN4bZrj9FLZQz-3x1HlsUYA_kzT06JS1Av82kPZ6hjlNDtwrRWvbkQ3BkIyCIKb-pE6S7fJM-ArMnEurwPHyVkexdg0b0Tgg2yXd5W0Ve9R42-zklN8rcObcTUGFOjpSAfSm', CAST(N'2023-12-04T07:45:43.127' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'c9a1a6b6-e0f6-4fb5-a941-a92fe84176e4', N'c9b5df48-4f3f-4028-b69e-4fc59a5dcf58', N'evJ20f2yFVzkXDNmh7iW43:APA91bHzECzc1Cd0k_SijvQiqOo_BFjIxHkjffhpFCM6ZGfEiPPS3kchYxdq1VfRJ0rd8tQJpRde5JdemBOwOuxW0B4YIZG7HpG7hS6kEL-CasxtcNIjgktsqOmRbphdbnpvBAxHv7Hm', CAST(N'2023-12-01T10:16:47.327' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'e70b3bc0-b073-4027-82a4-b7e50e9479f8', N'a8596a65-25ef-4fd3-9c54-ea43c2ea50bf', N'eCgfojuwXmSd7DYp39ojhD:APA91bHVnHRuLvVlx5e-XOCuCDsChf8vQoD3yntRPZI_X2Qy_yAnrM0zqX7lvIByDeItRv7Jv_SAkOJyMSbl-H1jzJS0Ya3IyN4fbrbxDmz-bPrRedIG2hQo6IVHE5AvNKG7s43MJoa0', CAST(N'2023-11-29T00:11:57.070' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'e8682884-8fc6-45db-a54e-d3b8907e684d', N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', N'cHjeapfhRdO9uK08veR-76:APA91bE9wtxfWDokMOiHJqmAakcffhCCkFvBiAeUFFPpxNjo7xF8DV3-ulHfxuoo27E2F98ZgmeDzb2qifUxFTk1osizW40UxgmmAdoFCNB1qwLKb_14xn7Sg9iKEa2VWoW3B8l3y3Uk', CAST(N'2023-12-04T02:46:07.023' AS DateTime))
INSERT [dbo].[DeviceToken] ([Id], [AccountId], [Token], [CreateAt]) VALUES (N'84e6bf0a-398d-4973-8f72-d9a5b0ff7ec5', N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', N'foV9Xk_PRCeroNTLbKsRH4:APA91bF79FwLfzVs7WQAFznA0QmodRW1NoQJWkn_v_HJT_XWAq4akfurgMeF-ilfiNYd0Zf_5AzRNBzELNl2ApvTfmopF19EE1JbTMZC_qT-xcpnxYha6w0bOYWImbGbtozXjJDDupiJ', CAST(N'2023-12-04T07:29:04.113' AS DateTime))
GO



INSERT [dbo].[Notification] ([Id], [AccountId], [Title], [Body], [Type], [Link], [IsRead], [SendDate]) VALUES (N'3fe8c0f4-3643-413a-8f04-09df553df11f', N'a8596a65-25ef-4fd3-9c54-ea43c2ea50bf', N'Đơn sửa chữa của khách hàng Trung Nguyễn đã hoàn thành', N'Đơn sửa chữa của khách hàng đã được sửa xong. Vui lòng tiến hành thanh toán.', N'RepairService', N'OR3751B099', 0, CAST(N'2023-12-05T19:29:16.290' AS DateTime))
INSERT [dbo].[Notification] ([Id], [AccountId], [Title], [Body], [Type], [Link], [IsRead], [SendDate]) VALUES (N'3b31df43-0326-4b70-bb81-0acd2f5e8853', N'0dbc753e-3960-4cb8-b37e-ccb8c7458584', N'Đơn sửa chữa của khách hàng Trung Nguyễn.', N'Đơn hàng OR3751B099 đã được bàn giao cho bạn. Vui lòng tiến hành sửa chữa và xác nhận đã sửa xong sau khi hoàn tất sửa chữa.', N'RepairService', N'OR3751B099', 0, CAST(N'2023-12-05T19:28:31.100' AS DateTime))
INSERT [dbo].[Notification] ([Id], [AccountId], [Title], [Body], [Type], [Link], [IsRead], [SendDate]) VALUES (N'97d2074b-b268-4146-95a7-2b4a3ca48d5c', N'535f7a78-2351-4a4a-abb4-fdbf07eb24d5', N'Đơn sửa chữa của khách hàng Trung Nguyễn đã hoàn thành', N'Đơn sửa chữa của khách hàng đã được sửa xong. Vui lòng tiến hành thanh toán.', N'RepairService', N'OR3751B099', 0, CAST(N'2023-12-05T19:29:16.290' AS DateTime))
INSERT [dbo].[Notification] ([Id], [AccountId], [Title], [Body], [Type], [Link], [IsRead], [SendDate]) VALUES (N'30cb4c62-bf88-4b05-a320-4a05b71d9042', N'0dbc753e-3960-4cb8-b37e-ccb8c7458584', N'Bạn có lịch đặt ngày 06-12-2023.', N'Khách hàng Trung Customer đã đặt bạn để sửa xe. Khách hàng dự kiến tới 06-12-2023. Vui lòng chú ý lịch đặt và tiếp đón khách hàng cẩn thận.', N'Booking', N'3777e3ac-c535-43fd-917a-fcb02ff25d9c', 0, CAST(N'2023-12-05T19:58:02.350' AS DateTime))
INSERT [dbo].[Notification] ([Id], [AccountId], [Title], [Body], [Type], [Link], [IsRead], [SendDate]) VALUES (N'26cbba63-0856-4adb-abe7-632799f6eec5', N'bf15cb35-e214-4f3c-b437-059cdd31d703', N'Đơn sửa chữa của khách hàng Trung01.', N'Đơn hàng OR10E6A3E4 đã được bàn giao cho bạn. Vui lòng tiến hành sửa chữa và xác nhận đã sửa xong sau khi hoàn tất sửa chữa.', N'RepairService', N'OR10E6A3E4', 0, CAST(N'2023-12-05T17:42:04.677' AS DateTime))
INSERT [dbo].[Notification] ([Id], [AccountId], [Title], [Body], [Type], [Link], [IsRead], [SendDate]) VALUES (N'738bdf72-6594-47ee-8ecf-94880b78fcf9', N'0dbc753e-3960-4cb8-b37e-ccb8c7458584', N'Bạn có lịch đặt ngày .', N'Khách hàng Trung Customer đã đặt lịch sữa chữa với bạn. Khách hàng dự kiến tới 02-12-2023. Vui lòng chú ý lịch đặt', N'Booking', N'c2b7d1cc-7a9a-42a8-ada8-3bc63b7d91ca', 0, CAST(N'2023-12-03T20:46:41.783' AS DateTime))
INSERT [dbo].[Notification] ([Id], [AccountId], [Title], [Body], [Type], [Link], [IsRead], [SendDate]) VALUES (N'e744cac8-8811-4c4f-809c-9597527ec37c', N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', N'Nhắc nhở sắp đến lịch bảo trì tiếp theo.', N'Bạn đã sử dụng dịch vụ bảo trì bảo dưỡng Gói bảo dưỡng xe tay ga bên chúng tôi và đã sắp đến hạn bảo dưỡng lần tiếp theo vào ngày 29-11-2023. Để đảm bảo được tình trạng xe tốt nhất bạn nên đặt lịch sửa bảo trì lần tiếp theo hoặc có thể đem xe đến để chúng tôi có thể chăm sóc tốt cho xe của bạn.', N'MaintanenceSchedule', N'b78fc633-db97-4385-8112-07c33c0aca73', 0, CAST(N'2023-11-29T00:45:36.300' AS DateTime))
INSERT [dbo].[Notification] ([Id], [AccountId], [Title], [Body], [Type], [Link], [IsRead], [SendDate]) VALUES (N'74160369-1d54-4f55-9a83-b59851919ccb', N'a8596a65-25ef-4fd3-9c54-ea43c2ea50bf', N'Đơn sửa chữa của khách hàng Trung Customer đã hoàn thành', N'Đơn sửa chữa của khách hàng đã được sửa xong. Vui lòng tiến hành thanh toán.', N'RepairService', N'OR35E76522', 0, CAST(N'2023-12-05T19:59:50.653' AS DateTime))
INSERT [dbo].[Notification] ([Id], [AccountId], [Title], [Body], [Type], [Link], [IsRead], [SendDate]) VALUES (N'5e344f03-5191-4870-838a-d33dfe883efd', N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', N'Giao hàng thành công.', N'Đơn hàng OR1BAB0D1C của bạn được giao thành công. Cảm ơn bạn đã sử dụng dịch vụ bên chúng tôi.', N'Purchase', N'OR1BAB0D1C', 0, CAST(N'2023-12-05T20:31:33.690' AS DateTime))
INSERT [dbo].[Notification] ([Id], [AccountId], [Title], [Body], [Type], [Link], [IsRead], [SendDate]) VALUES (N'50483663-bd95-48d4-aa12-db16422caa90', N'0dbc753e-3960-4cb8-b37e-ccb8c7458584', N'Đơn sửa chữa của khách hàng Trung Customer.', N'Đơn hàng OR35E76522 đã được bàn giao cho bạn. Vui lòng tiến hành sửa chữa và xác nhận đã sửa xong sau khi hoàn tất sửa chữa.', N'RepairService', N'OR35E76522', 0, CAST(N'2023-12-05T19:58:49.910' AS DateTime))
INSERT [dbo].[Notification] ([Id], [AccountId], [Title], [Body], [Type], [Link], [IsRead], [SendDate]) VALUES (N'773f33f8-51a0-4bdf-b26a-f14af5344f8a', N'535f7a78-2351-4a4a-abb4-fdbf07eb24d5', N'Đơn sửa chữa của khách hàng Trung Customer đã hoàn thành', N'Đơn sửa chữa của khách hàng đã được sửa xong. Vui lòng tiến hành thanh toán.', N'RepairService', N'OR35E76522', 1, CAST(N'2023-12-05T19:59:50.653' AS DateTime))
GO

INSERT [dbo].[RepairBooking] ([Id], [CustomerId], [StaffId], [OrderId], [DateBook], [Description], [CancellationReason], [CancellationDate], [Status], [CreateAt]) VALUES (N'3777e3ac-c535-43fd-917a-fcb02ff25d9c', N'1b9712a4-4a3a-4322-ade9-d35ef2059ce7', N'0dbc753e-3960-4cb8-b37e-ccb8c7458584', N'OR35E76522', CAST(N'2023-12-06T12:00:00.000' AS DateTime), N'Xe tôi có tiếng kêu rất khó chịu ở thắng trước', NULL, NULL, N'Đã đến', CAST(N'2023-12-05T12:57:23.863' AS DateTime))
GO

INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'd3795cd4-97ef-48aa-852b-03fd50e11d40', N'Sirius')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'65851614-fccf-40ee-b19a-0429bfebafd3', N'Yamaha')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'30894935-14e8-49eb-9535-083c97ea6c24', N'Sonic 150')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8', N'Lead')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'25e8576e-074b-40a3-8890-0c30a68ab574', N'Exciter 135')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'99d55692-c200-4288-a4fa-14732c7616f8', N'Vario 160')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'cf692b6e-26dc-4fc6-89ad-14e545f74d14', N'Exciter 155')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f', N'Winner 150')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'0090a997-7824-4a9c-95e5-1d0dffab2bd9', N'R15')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'5f2e2f4e-7107-48d6-afa8-1dcd7c0b5ff0', N'Vinfast Feliz S')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'88267592-523d-4c27-b653-2c63ca953b62', N'Vario 150/125')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'5c77a672-cc20-43a9-92a9-2e54e3880708', N'Exciter 150')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'1bf6a1e7-a9fa-478b-80a3-2ef6bddb7703', N'Suzuki')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'46bdf9ca-8592-4fb5-bb96-2f83d6a8556b', N'Vespa Primavera')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'fe2d982a-3409-471a-aa0b-488b27ed17c6', N'SH 160i')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'f7dd1516-76e1-4062-8020-4a5a5e9cd63c', N'NVX')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'77b3ca2c-2be2-4589-8145-58b9acf81af5', N'Medley')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3', N'Vision')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'45e967e2-6a70-4939-8d1b-5d1162eeffed', N'Vespa gts')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'5afba115-b9bc-432c-8b73-6176cc436df1', N'Air blade')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'bc800186-a9b5-42a8-b0ad-687978af57ef', N'Wave')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'cbf95731-938b-4799-8ae3-6f65ffe8382d', N'Yamaha R6')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'79a6f44d-555f-4bd7-897a-78669994f166', N'Future')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f', N'Click 125i/150i')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf', N'Air Blade 160')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'2b6b4774-cd05-4db8-a213-8634d30baca9', N'Luvias')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'16acaad9-1fc1-4304-804d-8ce4eb4cdc54', N'Janus')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'661bfd43-8774-4f49-82f1-8e0ccf9d2815', N'Blade')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'637da2d5-31f8-4749-8999-8f86b73febb2', N'Click 160')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'abfb8468-82d1-4dd9-ad16-90b686d7384a', N'Vespa Lx')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'aeeeb757-4c4a-487e-a591-983325a8b292', N'SH mode')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'88e1149e-5e6c-4313-8401-9b0737e55101', N'Kawasaki Z1000')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'dd551fcd-97dd-4653-83db-9b736383276b', N'Raider 150')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd', N'Winner x')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'e8a45df8-6463-46d1-a690-a9528c53ebbb', N'SH 125i/150i')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62', N'Dream')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'1b3887b3-7fc3-4f91-9306-c50964805f20', N'Axelo 125')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'281aff06-24dd-49ea-bd1e-c9950c51c45b', N'Vespa Sprint')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'9c3a4c64-fb1d-4450-947c-cf6fe297a04e', N'SH 300i')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'dadecb97-ca9f-48ed-bfd7-de953dc73a74', N'Yamaha nouvo')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'5ac617db-265c-4b7a-b1ec-e2fd4372a026', N'Jupiter')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'290203be-30d6-4b78-b9bd-e89440326b81', N'Honda')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'7e2291cc-2006-47b6-a8be-ea867330f1d0', N'SH350i')
INSERT [dbo].[Vehicle] ([Id], [VehicleName]) VALUES (N'722d7be5-fae4-4397-a1b2-eff7c9755523', N'Grande')
GO

INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'9a4165da-7c4f-47b6-802e-08683d87c21d', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'9a4165da-7c4f-47b6-802e-08683d87c21d', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'9a4165da-7c4f-47b6-802e-08683d87c21d', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'dbba0a8c-b3d2-44fb-b5db-0a401b9429d8', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'05eae696-5b61-441f-b423-0cacc320a877', N'99d55692-c200-4288-a4fa-14732c7616f8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'05eae696-5b61-441f-b423-0cacc320a877', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'517bbfd8-bdf0-490a-ab39-14cbfb726314', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'517bbfd8-bdf0-490a-ab39-14cbfb726314', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'517bbfd8-bdf0-490a-ab39-14cbfb726314', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'517bbfd8-bdf0-490a-ab39-14cbfb726314', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'65851614-fccf-40ee-b19a-0429bfebafd3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'30894935-14e8-49eb-9535-083c97ea6c24')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'99d55692-c200-4288-a4fa-14732c7616f8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'0090a997-7824-4a9c-95e5-1d0dffab2bd9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'5f2e2f4e-7107-48d6-afa8-1dcd7c0b5ff0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'1bf6a1e7-a9fa-478b-80a3-2ef6bddb7703')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'46bdf9ca-8592-4fb5-bb96-2f83d6a8556b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'fe2d982a-3409-471a-aa0b-488b27ed17c6')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'f7dd1516-76e1-4062-8020-4a5a5e9cd63c')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'77b3ca2c-2be2-4589-8145-58b9acf81af5')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'45e967e2-6a70-4939-8d1b-5d1162eeffed')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'cbf95731-938b-4799-8ae3-6f65ffe8382d')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'2b6b4774-cd05-4db8-a213-8634d30baca9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'16acaad9-1fc1-4304-804d-8ce4eb4cdc54')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'661bfd43-8774-4f49-82f1-8e0ccf9d2815')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'637da2d5-31f8-4749-8999-8f86b73febb2')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'abfb8468-82d1-4dd9-ad16-90b686d7384a')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'aeeeb757-4c4a-487e-a591-983325a8b292')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'88e1149e-5e6c-4313-8401-9b0737e55101')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'dd551fcd-97dd-4653-83db-9b736383276b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'e8a45df8-6463-46d1-a690-a9528c53ebbb')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'1b3887b3-7fc3-4f91-9306-c50964805f20')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'281aff06-24dd-49ea-bd1e-c9950c51c45b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'9c3a4c64-fb1d-4450-947c-cf6fe297a04e')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'dadecb97-ca9f-48ed-bfd7-de953dc73a74')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'290203be-30d6-4b78-b9bd-e89440326b81')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'7e2291cc-2006-47b6-a8be-ea867330f1d0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', N'722d7be5-fae4-4397-a1b2-eff7c9755523')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'65851614-fccf-40ee-b19a-0429bfebafd3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'30894935-14e8-49eb-9535-083c97ea6c24')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'99d55692-c200-4288-a4fa-14732c7616f8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'0090a997-7824-4a9c-95e5-1d0dffab2bd9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'5f2e2f4e-7107-48d6-afa8-1dcd7c0b5ff0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'1bf6a1e7-a9fa-478b-80a3-2ef6bddb7703')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'46bdf9ca-8592-4fb5-bb96-2f83d6a8556b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'fe2d982a-3409-471a-aa0b-488b27ed17c6')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'f7dd1516-76e1-4062-8020-4a5a5e9cd63c')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'77b3ca2c-2be2-4589-8145-58b9acf81af5')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'45e967e2-6a70-4939-8d1b-5d1162eeffed')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'cbf95731-938b-4799-8ae3-6f65ffe8382d')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'2b6b4774-cd05-4db8-a213-8634d30baca9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'16acaad9-1fc1-4304-804d-8ce4eb4cdc54')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'661bfd43-8774-4f49-82f1-8e0ccf9d2815')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'637da2d5-31f8-4749-8999-8f86b73febb2')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'abfb8468-82d1-4dd9-ad16-90b686d7384a')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'aeeeb757-4c4a-487e-a591-983325a8b292')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'88e1149e-5e6c-4313-8401-9b0737e55101')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'dd551fcd-97dd-4653-83db-9b736383276b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'e8a45df8-6463-46d1-a690-a9528c53ebbb')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'1b3887b3-7fc3-4f91-9306-c50964805f20')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'281aff06-24dd-49ea-bd1e-c9950c51c45b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'9c3a4c64-fb1d-4450-947c-cf6fe297a04e')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'dadecb97-ca9f-48ed-bfd7-de953dc73a74')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'290203be-30d6-4b78-b9bd-e89440326b81')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'7e2291cc-2006-47b6-a8be-ea867330f1d0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', N'722d7be5-fae4-4397-a1b2-eff7c9755523')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'30894935-14e8-49eb-9535-083c97ea6c24')
GO
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'0090a997-7824-4a9c-95e5-1d0dffab2bd9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'cbf95731-938b-4799-8ae3-6f65ffe8382d')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'661bfd43-8774-4f49-82f1-8e0ccf9d2815')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'88e1149e-5e6c-4313-8401-9b0737e55101')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'dd551fcd-97dd-4653-83db-9b736383276b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'1b3887b3-7fc3-4f91-9306-c50964805f20')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'552729dd-cc94-4a35-9f13-257550ec4312', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8be691d2-6758-4d88-9a60-2beeacf9032e', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8be691d2-6758-4d88-9a60-2beeacf9032e', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8be691d2-6758-4d88-9a60-2beeacf9032e', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8be691d2-6758-4d88-9a60-2beeacf9032e', N'16acaad9-1fc1-4304-804d-8ce4eb4cdc54')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'0090a997-7824-4a9c-95e5-1d0dffab2bd9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'cbf95731-938b-4799-8ae3-6f65ffe8382d')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'88e1149e-5e6c-4313-8401-9b0737e55101')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'dd551fcd-97dd-4653-83db-9b736383276b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'1b3887b3-7fc3-4f91-9306-c50964805f20')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'65851614-fccf-40ee-b19a-0429bfebafd3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'30894935-14e8-49eb-9535-083c97ea6c24')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'99d55692-c200-4288-a4fa-14732c7616f8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'0090a997-7824-4a9c-95e5-1d0dffab2bd9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'5f2e2f4e-7107-48d6-afa8-1dcd7c0b5ff0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'1bf6a1e7-a9fa-478b-80a3-2ef6bddb7703')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'46bdf9ca-8592-4fb5-bb96-2f83d6a8556b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'fe2d982a-3409-471a-aa0b-488b27ed17c6')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'f7dd1516-76e1-4062-8020-4a5a5e9cd63c')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'77b3ca2c-2be2-4589-8145-58b9acf81af5')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'45e967e2-6a70-4939-8d1b-5d1162eeffed')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'cbf95731-938b-4799-8ae3-6f65ffe8382d')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'2b6b4774-cd05-4db8-a213-8634d30baca9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'16acaad9-1fc1-4304-804d-8ce4eb4cdc54')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'661bfd43-8774-4f49-82f1-8e0ccf9d2815')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'637da2d5-31f8-4749-8999-8f86b73febb2')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'abfb8468-82d1-4dd9-ad16-90b686d7384a')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'aeeeb757-4c4a-487e-a591-983325a8b292')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'88e1149e-5e6c-4313-8401-9b0737e55101')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'dd551fcd-97dd-4653-83db-9b736383276b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'e8a45df8-6463-46d1-a690-a9528c53ebbb')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'1b3887b3-7fc3-4f91-9306-c50964805f20')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'281aff06-24dd-49ea-bd1e-c9950c51c45b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'9c3a4c64-fb1d-4450-947c-cf6fe297a04e')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'dadecb97-ca9f-48ed-bfd7-de953dc73a74')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'290203be-30d6-4b78-b9bd-e89440326b81')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'7e2291cc-2006-47b6-a8be-ea867330f1d0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b89ee58d-49a9-42eb-8de9-38279cdb7202', N'722d7be5-fae4-4397-a1b2-eff7c9755523')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'65851614-fccf-40ee-b19a-0429bfebafd3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'30894935-14e8-49eb-9535-083c97ea6c24')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'99d55692-c200-4288-a4fa-14732c7616f8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'0090a997-7824-4a9c-95e5-1d0dffab2bd9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'5f2e2f4e-7107-48d6-afa8-1dcd7c0b5ff0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'1bf6a1e7-a9fa-478b-80a3-2ef6bddb7703')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'46bdf9ca-8592-4fb5-bb96-2f83d6a8556b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'fe2d982a-3409-471a-aa0b-488b27ed17c6')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'f7dd1516-76e1-4062-8020-4a5a5e9cd63c')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'77b3ca2c-2be2-4589-8145-58b9acf81af5')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'45e967e2-6a70-4939-8d1b-5d1162eeffed')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'cbf95731-938b-4799-8ae3-6f65ffe8382d')
GO
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'2b6b4774-cd05-4db8-a213-8634d30baca9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'16acaad9-1fc1-4304-804d-8ce4eb4cdc54')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'661bfd43-8774-4f49-82f1-8e0ccf9d2815')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'637da2d5-31f8-4749-8999-8f86b73febb2')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'abfb8468-82d1-4dd9-ad16-90b686d7384a')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'aeeeb757-4c4a-487e-a591-983325a8b292')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'88e1149e-5e6c-4313-8401-9b0737e55101')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'dd551fcd-97dd-4653-83db-9b736383276b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'e8a45df8-6463-46d1-a690-a9528c53ebbb')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'1b3887b3-7fc3-4f91-9306-c50964805f20')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'281aff06-24dd-49ea-bd1e-c9950c51c45b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'9c3a4c64-fb1d-4450-947c-cf6fe297a04e')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'dadecb97-ca9f-48ed-bfd7-de953dc73a74')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'290203be-30d6-4b78-b9bd-e89440326b81')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'7e2291cc-2006-47b6-a8be-ea867330f1d0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', N'722d7be5-fae4-4397-a1b2-eff7c9755523')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'117227fb-4a0b-4d2d-a8c9-47024fec40bf', N'46bdf9ca-8592-4fb5-bb96-2f83d6a8556b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'117227fb-4a0b-4d2d-a8c9-47024fec40bf', N'281aff06-24dd-49ea-bd1e-c9950c51c45b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'117227fb-4a0b-4d2d-a8c9-47024fec40bf', N'722d7be5-fae4-4397-a1b2-eff7c9755523')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'65851614-fccf-40ee-b19a-0429bfebafd3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'30894935-14e8-49eb-9535-083c97ea6c24')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'99d55692-c200-4288-a4fa-14732c7616f8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'0090a997-7824-4a9c-95e5-1d0dffab2bd9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'5f2e2f4e-7107-48d6-afa8-1dcd7c0b5ff0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'1bf6a1e7-a9fa-478b-80a3-2ef6bddb7703')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'46bdf9ca-8592-4fb5-bb96-2f83d6a8556b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'fe2d982a-3409-471a-aa0b-488b27ed17c6')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'f7dd1516-76e1-4062-8020-4a5a5e9cd63c')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'77b3ca2c-2be2-4589-8145-58b9acf81af5')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'45e967e2-6a70-4939-8d1b-5d1162eeffed')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'cbf95731-938b-4799-8ae3-6f65ffe8382d')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'2b6b4774-cd05-4db8-a213-8634d30baca9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'16acaad9-1fc1-4304-804d-8ce4eb4cdc54')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'661bfd43-8774-4f49-82f1-8e0ccf9d2815')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'637da2d5-31f8-4749-8999-8f86b73febb2')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'abfb8468-82d1-4dd9-ad16-90b686d7384a')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'aeeeb757-4c4a-487e-a591-983325a8b292')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'88e1149e-5e6c-4313-8401-9b0737e55101')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'dd551fcd-97dd-4653-83db-9b736383276b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'e8a45df8-6463-46d1-a690-a9528c53ebbb')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'1b3887b3-7fc3-4f91-9306-c50964805f20')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'281aff06-24dd-49ea-bd1e-c9950c51c45b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'9c3a4c64-fb1d-4450-947c-cf6fe297a04e')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'dadecb97-ca9f-48ed-bfd7-de953dc73a74')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'290203be-30d6-4b78-b9bd-e89440326b81')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'7e2291cc-2006-47b6-a8be-ea867330f1d0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0a6ae4dc-15ee-451c-84b8-52630b774063', N'722d7be5-fae4-4397-a1b2-eff7c9755523')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'fe2d982a-3409-471a-aa0b-488b27ed17c6')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'77b3ca2c-2be2-4589-8145-58b9acf81af5')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'45e967e2-6a70-4939-8d1b-5d1162eeffed')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'2b6b4774-cd05-4db8-a213-8634d30baca9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'16acaad9-1fc1-4304-804d-8ce4eb4cdc54')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'abfb8468-82d1-4dd9-ad16-90b686d7384a')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'aeeeb757-4c4a-487e-a591-983325a8b292')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'e8a45df8-6463-46d1-a690-a9528c53ebbb')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'281aff06-24dd-49ea-bd1e-c9950c51c45b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'9c3a4c64-fb1d-4450-947c-cf6fe297a04e')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', N'dadecb97-ca9f-48ed-bfd7-de953dc73a74')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'99d55692-c200-4288-a4fa-14732c7616f8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'46bdf9ca-8592-4fb5-bb96-2f83d6a8556b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'fe2d982a-3409-471a-aa0b-488b27ed17c6')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'77b3ca2c-2be2-4589-8145-58b9acf81af5')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'45e967e2-6a70-4939-8d1b-5d1162eeffed')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'2b6b4774-cd05-4db8-a213-8634d30baca9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'16acaad9-1fc1-4304-804d-8ce4eb4cdc54')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'637da2d5-31f8-4749-8999-8f86b73febb2')
GO
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'abfb8468-82d1-4dd9-ad16-90b686d7384a')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'aeeeb757-4c4a-487e-a591-983325a8b292')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'e8a45df8-6463-46d1-a690-a9528c53ebbb')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'281aff06-24dd-49ea-bd1e-c9950c51c45b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'9c3a4c64-fb1d-4450-947c-cf6fe297a04e')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'dadecb97-ca9f-48ed-bfd7-de953dc73a74')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', N'7e2291cc-2006-47b6-a8be-ea867330f1d0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e94b1dbc-cf97-4f98-bbc2-6b07b4a1948c', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e94b1dbc-cf97-4f98-bbc2-6b07b4a1948c', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'90a50eac-7623-450c-90d9-708b9d35bf9f', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'90a50eac-7623-450c-90d9-708b9d35bf9f', N'65851614-fccf-40ee-b19a-0429bfebafd3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'69cb2891-4b1f-4360-b154-730e62cc20c6', N'dadecb97-ca9f-48ed-bfd7-de953dc73a74')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'65851614-fccf-40ee-b19a-0429bfebafd3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'0090a997-7824-4a9c-95e5-1d0dffab2bd9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'1bf6a1e7-a9fa-478b-80a3-2ef6bddb7703')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'abfb8468-82d1-4dd9-ad16-90b686d7384a')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'aeeeb757-4c4a-487e-a591-983325a8b292')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'88e1149e-5e6c-4313-8401-9b0737e55101')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'dd551fcd-97dd-4653-83db-9b736383276b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'dadecb97-ca9f-48ed-bfd7-de953dc73a74')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'17adf514-5169-497c-af56-825b9671adde', N'290203be-30d6-4b78-b9bd-e89440326b81')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2c291c00-4cbb-4859-a667-870eac4ff447', N'46bdf9ca-8592-4fb5-bb96-2f83d6a8556b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'2c291c00-4cbb-4859-a667-870eac4ff447', N'281aff06-24dd-49ea-bd1e-c9950c51c45b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'6ec0109b-13f8-44b2-afba-890faacfe6c4', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'65851614-fccf-40ee-b19a-0429bfebafd3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'30894935-14e8-49eb-9535-083c97ea6c24')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'99d55692-c200-4288-a4fa-14732c7616f8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'0090a997-7824-4a9c-95e5-1d0dffab2bd9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'5f2e2f4e-7107-48d6-afa8-1dcd7c0b5ff0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'1bf6a1e7-a9fa-478b-80a3-2ef6bddb7703')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'46bdf9ca-8592-4fb5-bb96-2f83d6a8556b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'fe2d982a-3409-471a-aa0b-488b27ed17c6')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'f7dd1516-76e1-4062-8020-4a5a5e9cd63c')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'77b3ca2c-2be2-4589-8145-58b9acf81af5')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'45e967e2-6a70-4939-8d1b-5d1162eeffed')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'cbf95731-938b-4799-8ae3-6f65ffe8382d')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'2b6b4774-cd05-4db8-a213-8634d30baca9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'16acaad9-1fc1-4304-804d-8ce4eb4cdc54')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'661bfd43-8774-4f49-82f1-8e0ccf9d2815')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'637da2d5-31f8-4749-8999-8f86b73febb2')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'abfb8468-82d1-4dd9-ad16-90b686d7384a')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'aeeeb757-4c4a-487e-a591-983325a8b292')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'88e1149e-5e6c-4313-8401-9b0737e55101')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'dd551fcd-97dd-4653-83db-9b736383276b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'e8a45df8-6463-46d1-a690-a9528c53ebbb')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'1b3887b3-7fc3-4f91-9306-c50964805f20')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'281aff06-24dd-49ea-bd1e-c9950c51c45b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'9c3a4c64-fb1d-4450-947c-cf6fe297a04e')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'dadecb97-ca9f-48ed-bfd7-de953dc73a74')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'290203be-30d6-4b78-b9bd-e89440326b81')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'7e2291cc-2006-47b6-a8be-ea867330f1d0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'e2baef67-625c-4870-afba-8b2808291f77', N'722d7be5-fae4-4397-a1b2-eff7c9755523')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'd77dfc4d-3549-41da-a568-8ccb8e6eadec', N'99d55692-c200-4288-a4fa-14732c7616f8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'd77dfc4d-3549-41da-a568-8ccb8e6eadec', N'5f2e2f4e-7107-48d6-afa8-1dcd7c0b5ff0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'd77dfc4d-3549-41da-a568-8ccb8e6eadec', N'f7dd1516-76e1-4062-8020-4a5a5e9cd63c')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'd77dfc4d-3549-41da-a568-8ccb8e6eadec', N'77b3ca2c-2be2-4589-8145-58b9acf81af5')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'd77dfc4d-3549-41da-a568-8ccb8e6eadec', N'637da2d5-31f8-4749-8999-8f86b73febb2')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'83d51422-5756-4490-a774-8eec37a0ac49', N'30894935-14e8-49eb-9535-083c97ea6c24')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'83d51422-5756-4490-a774-8eec37a0ac49', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'83d51422-5756-4490-a774-8eec37a0ac49', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'83d51422-5756-4490-a774-8eec37a0ac49', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'83d51422-5756-4490-a774-8eec37a0ac49', N'0090a997-7824-4a9c-95e5-1d0dffab2bd9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'83d51422-5756-4490-a774-8eec37a0ac49', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'83d51422-5756-4490-a774-8eec37a0ac49', N'cbf95731-938b-4799-8ae3-6f65ffe8382d')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'83d51422-5756-4490-a774-8eec37a0ac49', N'88e1149e-5e6c-4313-8401-9b0737e55101')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'83d51422-5756-4490-a774-8eec37a0ac49', N'dd551fcd-97dd-4653-83db-9b736383276b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'83d51422-5756-4490-a774-8eec37a0ac49', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'697d7a94-d584-4328-b170-90734611c5fe', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'697d7a94-d584-4328-b170-90734611c5fe', N'65851614-fccf-40ee-b19a-0429bfebafd3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'697d7a94-d584-4328-b170-90734611c5fe', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'fa425ec8-9ef0-48c8-a950-9b1ffe7bddb3', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'fa425ec8-9ef0-48c8-a950-9b1ffe7bddb3', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'fa425ec8-9ef0-48c8-a950-9b1ffe7bddb3', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'fa425ec8-9ef0-48c8-a950-9b1ffe7bddb3', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
GO
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'65851614-fccf-40ee-b19a-0429bfebafd3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'30894935-14e8-49eb-9535-083c97ea6c24')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'99d55692-c200-4288-a4fa-14732c7616f8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'0090a997-7824-4a9c-95e5-1d0dffab2bd9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'5f2e2f4e-7107-48d6-afa8-1dcd7c0b5ff0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'1bf6a1e7-a9fa-478b-80a3-2ef6bddb7703')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'46bdf9ca-8592-4fb5-bb96-2f83d6a8556b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'fe2d982a-3409-471a-aa0b-488b27ed17c6')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'f7dd1516-76e1-4062-8020-4a5a5e9cd63c')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'77b3ca2c-2be2-4589-8145-58b9acf81af5')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'45e967e2-6a70-4939-8d1b-5d1162eeffed')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'cbf95731-938b-4799-8ae3-6f65ffe8382d')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'2b6b4774-cd05-4db8-a213-8634d30baca9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'16acaad9-1fc1-4304-804d-8ce4eb4cdc54')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'661bfd43-8774-4f49-82f1-8e0ccf9d2815')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'637da2d5-31f8-4749-8999-8f86b73febb2')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'abfb8468-82d1-4dd9-ad16-90b686d7384a')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'aeeeb757-4c4a-487e-a591-983325a8b292')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'88e1149e-5e6c-4313-8401-9b0737e55101')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'dd551fcd-97dd-4653-83db-9b736383276b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'e8a45df8-6463-46d1-a690-a9528c53ebbb')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'1b3887b3-7fc3-4f91-9306-c50964805f20')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'281aff06-24dd-49ea-bd1e-c9950c51c45b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'9c3a4c64-fb1d-4450-947c-cf6fe297a04e')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'dadecb97-ca9f-48ed-bfd7-de953dc73a74')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'290203be-30d6-4b78-b9bd-e89440326b81')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'7e2291cc-2006-47b6-a8be-ea867330f1d0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'308f2e40-61ac-4c54-94c2-a16e3394cc65', N'722d7be5-fae4-4397-a1b2-eff7c9755523')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'61fe54d1-102e-40af-b124-a6157d1f5095', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'61fe54d1-102e-40af-b124-a6157d1f5095', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'44279e1f-dc22-4a81-adee-a6bd351cb98c', N'aeeeb757-4c4a-487e-a591-983325a8b292')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', N'fe2d982a-3409-471a-aa0b-488b27ed17c6')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', N'16acaad9-1fc1-4304-804d-8ce4eb4cdc54')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', N'abfb8468-82d1-4dd9-ad16-90b686d7384a')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', N'aeeeb757-4c4a-487e-a591-983325a8b292')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', N'e8a45df8-6463-46d1-a690-a9528c53ebbb')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', N'dadecb97-ca9f-48ed-bfd7-de953dc73a74')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'11b1a93f-1b1d-4d61-acf5-ad4b723889a4', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'4a63603c-aea3-42e5-89c6-aeef5a132743', N'99d55692-c200-4288-a4fa-14732c7616f8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'4a63603c-aea3-42e5-89c6-aeef5a132743', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'4a63603c-aea3-42e5-89c6-aeef5a132743', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'4a63603c-aea3-42e5-89c6-aeef5a132743', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'4a63603c-aea3-42e5-89c6-aeef5a132743', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'4a63603c-aea3-42e5-89c6-aeef5a132743', N'637da2d5-31f8-4749-8999-8f86b73febb2')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'7d08f9f3-0c77-464a-83a9-b425b4dbf20d', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0f6e7327-31c2-49f8-a55d-bad962c61dc1', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'0f6e7327-31c2-49f8-a55d-bad962c61dc1', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'99f1dc5f-c056-46b5-922f-bd9642d6ecdd', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'99f1dc5f-c056-46b5-922f-bd9642d6ecdd', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'54428065-01a5-4b6a-bee9-ca32afbe5b61', N'46bdf9ca-8592-4fb5-bb96-2f83d6a8556b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'54428065-01a5-4b6a-bee9-ca32afbe5b61', N'77b3ca2c-2be2-4589-8145-58b9acf81af5')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'54428065-01a5-4b6a-bee9-ca32afbe5b61', N'45e967e2-6a70-4939-8d1b-5d1162eeffed')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'54428065-01a5-4b6a-bee9-ca32afbe5b61', N'abfb8468-82d1-4dd9-ad16-90b686d7384a')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'54428065-01a5-4b6a-bee9-ca32afbe5b61', N'281aff06-24dd-49ea-bd1e-c9950c51c45b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'54428065-01a5-4b6a-bee9-ca32afbe5b61', N'9c3a4c64-fb1d-4450-947c-cf6fe297a04e')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'54428065-01a5-4b6a-bee9-ca32afbe5b61', N'7e2291cc-2006-47b6-a8be-ea867330f1d0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1bfeb98f-9641-47a7-bc07-ca71c1d10f3c', N'99d55692-c200-4288-a4fa-14732c7616f8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1bfeb98f-9641-47a7-bc07-ca71c1d10f3c', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1bfeb98f-9641-47a7-bc07-ca71c1d10f3c', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1bfeb98f-9641-47a7-bc07-ca71c1d10f3c', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1bfeb98f-9641-47a7-bc07-ca71c1d10f3c', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'1bfeb98f-9641-47a7-bc07-ca71c1d10f3c', N'637da2d5-31f8-4749-8999-8f86b73febb2')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'd5c5ee91-cd4a-4f95-b835-cfc918ced4af', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'd5c5ee91-cd4a-4f95-b835-cfc918ced4af', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'd5c5ee91-cd4a-4f95-b835-cfc918ced4af', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'30894935-14e8-49eb-9535-083c97ea6c24')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'0090a997-7824-4a9c-95e5-1d0dffab2bd9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'cbf95731-938b-4799-8ae3-6f65ffe8382d')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'661bfd43-8774-4f49-82f1-8e0ccf9d2815')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'88e1149e-5e6c-4313-8401-9b0737e55101')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'dd551fcd-97dd-4653-83db-9b736383276b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62')
GO
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'1b3887b3-7fc3-4f91-9306-c50964805f20')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'098ee96a-fded-4429-975b-cfca68541c93', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'd3795cd4-97ef-48aa-852b-03fd50e11d40')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'65851614-fccf-40ee-b19a-0429bfebafd3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'30894935-14e8-49eb-9535-083c97ea6c24')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'99d55692-c200-4288-a4fa-14732c7616f8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'cf692b6e-26dc-4fc6-89ad-14e545f74d14')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'0090a997-7824-4a9c-95e5-1d0dffab2bd9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'5f2e2f4e-7107-48d6-afa8-1dcd7c0b5ff0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'1bf6a1e7-a9fa-478b-80a3-2ef6bddb7703')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'46bdf9ca-8592-4fb5-bb96-2f83d6a8556b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'fe2d982a-3409-471a-aa0b-488b27ed17c6')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'f7dd1516-76e1-4062-8020-4a5a5e9cd63c')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'77b3ca2c-2be2-4589-8145-58b9acf81af5')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'45e967e2-6a70-4939-8d1b-5d1162eeffed')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'cbf95731-938b-4799-8ae3-6f65ffe8382d')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'e01cce91-2a5c-4c4e-ae03-7cc9f1f13f2f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'ece9f9dc-8de5-4e9e-8dbb-832a2898baaf')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'2b6b4774-cd05-4db8-a213-8634d30baca9')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'16acaad9-1fc1-4304-804d-8ce4eb4cdc54')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'661bfd43-8774-4f49-82f1-8e0ccf9d2815')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'637da2d5-31f8-4749-8999-8f86b73febb2')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'abfb8468-82d1-4dd9-ad16-90b686d7384a')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'aeeeb757-4c4a-487e-a591-983325a8b292')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'88e1149e-5e6c-4313-8401-9b0737e55101')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'dd551fcd-97dd-4653-83db-9b736383276b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'e8a45df8-6463-46d1-a690-a9528c53ebbb')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'1b3887b3-7fc3-4f91-9306-c50964805f20')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'281aff06-24dd-49ea-bd1e-c9950c51c45b')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'9c3a4c64-fb1d-4450-947c-cf6fe297a04e')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'dadecb97-ca9f-48ed-bfd7-de953dc73a74')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'5ac617db-265c-4b7a-b1ec-e2fd4372a026')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'290203be-30d6-4b78-b9bd-e89440326b81')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'7e2291cc-2006-47b6-a8be-ea867330f1d0')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'80104722-be60-46de-8eb8-d54505adc988', N'722d7be5-fae4-4397-a1b2-eff7c9755523')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8934f72b-b8df-4d45-bad0-dc7b22cf452d', N'1c4937bc-0ca3-46ea-92e6-08a0af4657b8')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8934f72b-b8df-4d45-bad0-dc7b22cf452d', N'88267592-523d-4c27-b653-2c63ca953b62')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8934f72b-b8df-4d45-bad0-dc7b22cf452d', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'8934f72b-b8df-4d45-bad0-dc7b22cf452d', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b5ccf74e-c207-47fe-8693-dcd85ce55df4', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'b5ccf74e-c207-47fe-8693-dcd85ce55df4', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'618ec696-75dc-4988-ba05-deab133e340b', N'25e8576e-074b-40a3-8890-0c30a68ab574')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'618ec696-75dc-4988-ba05-deab133e340b', N'13a707eb-9f07-4e51-a5cd-1a27a40abe9f')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'618ec696-75dc-4988-ba05-deab133e340b', N'5c77a672-cc20-43a9-92a9-2e54e3880708')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'618ec696-75dc-4988-ba05-deab133e340b', N'f5ef6e1a-527f-4ec7-b4e6-9eb658fc4ffd')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'5c51a96c-390d-40ee-9f64-ef315eef4977', N'8e8c208b-fa04-4633-84f7-5b8d5b112ec3')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'5c51a96c-390d-40ee-9f64-ef315eef4977', N'5afba115-b9bc-432c-8b73-6176cc436df1')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'24392438-89aa-4f53-bf4a-f688f65059d2', N'bc800186-a9b5-42a8-b0ad-687978af57ef')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'24392438-89aa-4f53-bf4a-f688f65059d2', N'79a6f44d-555f-4bd7-897a-78669994f166')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'24392438-89aa-4f53-bf4a-f688f65059d2', N'661bfd43-8774-4f49-82f1-8e0ccf9d2815')
INSERT [dbo].[ProductVehicleType] ([MotobikeProductId], [VehicleId]) VALUES (N'24392438-89aa-4f53-bf4a-f688f65059d2', N'48dc7c31-b93f-48f4-9d5e-c1eaf4de2f62')
GO

INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'a7d8b74e-a832-4142-99bf-01d3a8247b89', N'61fe54d1-102e-40af-b124-a6157d1f5095', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fa7d8b74e-a832-4142-99bf-01d3a8247b89?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'3503d8be-e857-43c9-b057-02514eed5dfd', N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F3503d8be-e857-43c9-b057-02514eed5dfd?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'4705c2f6-169e-4929-86a8-02a14687a521', N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F4705c2f6-169e-4929-86a8-02a14687a521?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'6114d6d9-aea3-4685-9571-0341b14a0088', N'098ee96a-fded-4429-975b-cfca68541c93', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F6114d6d9-aea3-4685-9571-0341b14a0088?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'3e8f2d60-17d3-4423-92bf-0344d9aad8ff', N'11b1a93f-1b1d-4d61-acf5-ad4b723889a4', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F3e8f2d60-17d3-4423-92bf-0344d9aad8ff?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'dcde3d57-b1d2-4da1-9fa9-038f366d9a5b', N'6ec0109b-13f8-44b2-afba-890faacfe6c4', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fdcde3d57-b1d2-4da1-9fa9-038f366d9a5b?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'906805ed-10c5-40d2-8afb-043c5a473fa8', N'8be691d2-6758-4d88-9a60-2beeacf9032e', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F906805ed-10c5-40d2-8afb-043c5a473fa8?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'ed0fccad-52f1-44cd-9640-04d15e4ec9d1', N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fed0fccad-52f1-44cd-9640-04d15e4ec9d1?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'6d02f1d2-7369-47af-b6d1-060aaf5a9b19', N'54428065-01a5-4b6a-bee9-ca32afbe5b61', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F6d02f1d2-7369-47af-b6d1-060aaf5a9b19?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'44f9a49a-9cad-415e-831c-07d88c422377', N'2c291c00-4cbb-4859-a667-870eac4ff447', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F44f9a49a-9cad-415e-831c-07d88c422377?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'960e191e-4b1d-48db-9a8e-09d9ad78674a', N'552729dd-cc94-4a35-9f13-257550ec4312', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F960e191e-4b1d-48db-9a8e-09d9ad78674a?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'778e356a-8a97-4043-9d07-09fc3aa80af3', N'098ee96a-fded-4429-975b-cfca68541c93', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F778e356a-8a97-4043-9d07-09fc3aa80af3?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'f11cfd72-651d-438f-a81a-0a07ceec3e94', N'69cb2891-4b1f-4360-b154-730e62cc20c6', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Ff11cfd72-651d-438f-a81a-0a07ceec3e94?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'cb3382c0-4825-4be6-8c72-0aa3d49eee55', NULL, N'1a1b148e-bc6d-4485-a417-26a694413140', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fcb3382c0-4825-4be6-8c72-0aa3d49eee55?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'a1bf1417-18be-4eaf-881e-0f9f3893e4a4', N'dbba0a8c-b3d2-44fb-b5db-0a401b9429d8', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fa1bf1417-18be-4eaf-881e-0f9f3893e4a4?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'eb3ea7c6-ef06-4f93-972d-1125f81e0a76', N'117227fb-4a0b-4d2d-a8c9-47024fec40bf', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Feb3ea7c6-ef06-4f93-972d-1125f81e0a76?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'2a4d1dd9-562f-47c0-8a61-15ffb268f7c5', N'8934f72b-b8df-4d45-bad0-dc7b22cf452d', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F2a4d1dd9-562f-47c0-8a61-15ffb268f7c5?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'7cf290f8-25c6-44ab-b7c9-18755326237e', N'fa425ec8-9ef0-48c8-a950-9b1ffe7bddb3', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F7cf290f8-25c6-44ab-b7c9-18755326237e?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'ef586565-5e19-47e1-9631-1d8f33b70389', NULL, N'd31d4c92-27e7-430c-bd5f-93c3bdd0d43b', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fef586565-5e19-47e1-9631-1d8f33b70389?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'1620b31e-aa0f-4807-9f96-216be2f3fcde', N'6ec0109b-13f8-44b2-afba-890faacfe6c4', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1620b31e-aa0f-4807-9f96-216be2f3fcde?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'4fb45977-6da9-4794-814c-21f78bf27b6a', N'1bfeb98f-9641-47a7-bc07-ca71c1d10f3c', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F4fb45977-6da9-4794-814c-21f78bf27b6a?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'fdcb58fc-f6fc-4895-8699-228c7e6032ce', N'fa425ec8-9ef0-48c8-a950-9b1ffe7bddb3', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Ffdcb58fc-f6fc-4895-8699-228c7e6032ce?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'503f0f31-f913-47a7-aaf6-22ffa4dbc365', NULL, N'cbf36cb2-fd06-4d4c-b3f4-1f759165a2dd', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F503f0f31-f913-47a7-aaf6-22ffa4dbc365?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'1f9b6373-0e34-4373-a954-248f0aa54718', N'44279e1f-dc22-4a81-adee-a6bd351cb98c', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1f9b6373-0e34-4373-a954-248f0aa54718?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'33768a15-f59a-4c30-8e4e-25046afb7cd8', N'697d7a94-d584-4328-b170-90734611c5fe', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F33768a15-f59a-4c30-8e4e-25046afb7cd8?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'795b49fc-9c23-4b26-a802-263911dce2df', N'e2baef67-625c-4870-afba-8b2808291f77', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F795b49fc-9c23-4b26-a802-263911dce2df?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'7b28757c-fff8-40be-a5f0-26dc6a52c876', N'117227fb-4a0b-4d2d-a8c9-47024fec40bf', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F7b28757c-fff8-40be-a5f0-26dc6a52c876?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'77e86813-2bdf-4fd6-8e8c-29120eb5ff92', N'17adf514-5169-497c-af56-825b9671adde', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F77e86813-2bdf-4fd6-8e8c-29120eb5ff92?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'dddd9505-50d3-4426-8b78-2932175940d9', NULL, N'1a1b148e-bc6d-4485-a417-26a694413140', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fdddd9505-50d3-4426-8b78-2932175940d9?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'f7c74f58-3465-49e6-b81b-2c1e15e50224', N'80104722-be60-46de-8eb8-d54505adc988', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Ff7c74f58-3465-49e6-b81b-2c1e15e50224?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'97845a98-8e4f-4900-8e1b-2e1dc0e6503d', N'b89ee58d-49a9-42eb-8de9-38279cdb7202', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F97845a98-8e4f-4900-8e1b-2e1dc0e6503d?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'3aa77c99-5e51-40e3-a6b2-313a2eca1ce9', NULL, N'e2d8889c-4fc4-4d9b-897b-1b231c64549f', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F3aa77c99-5e51-40e3-a6b2-313a2eca1ce9?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'e58d2764-c860-43f0-a7e2-334bb7087fc3', N'697d7a94-d584-4328-b170-90734611c5fe', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fe58d2764-c860-43f0-a7e2-334bb7087fc3?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'ab1127c2-c445-42c3-8ea1-34e22d6c4b63', N'7d08f9f3-0c77-464a-83a9-b425b4dbf20d', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fab1127c2-c445-42c3-8ea1-34e22d6c4b63?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'c3a1b591-9a65-488c-ad20-360c0b858436', N'80104722-be60-46de-8eb8-d54505adc988', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fc3a1b591-9a65-488c-ad20-360c0b858436?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'a4ecbcf7-b10f-4530-9a4f-370991d58809', NULL, N'e2d8889c-4fc4-4d9b-897b-1b231c64549f', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fa4ecbcf7-b10f-4530-9a4f-370991d58809?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'f1d2ece9-f04d-4062-af2d-397c6ba2aa08', NULL, N'3281a3eb-34e3-44f3-9cbc-1c06a80e328a', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Ff1d2ece9-f04d-4062-af2d-397c6ba2aa08?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'a41d94a1-6b74-4292-a804-39da3aeae3ad', N'308f2e40-61ac-4c54-94c2-a16e3394cc65', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fa41d94a1-6b74-4292-a804-39da3aeae3ad?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'447a6ad3-2492-4714-bf54-3a0f47a1ae61', N'e94b1dbc-cf97-4f98-bbc2-6b07b4a1948c', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F447a6ad3-2492-4714-bf54-3a0f47a1ae61?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'b16a94b2-c2af-4774-a985-3a95515e2a28', N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fb16a94b2-c2af-4774-a985-3a95515e2a28?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'0089396d-6f4c-4878-b2de-3ada9f2e70e4', N'90a50eac-7623-450c-90d9-708b9d35bf9f', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F0089396d-6f4c-4878-b2de-3ada9f2e70e4?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'34a51485-f4e8-4fdf-ac9d-3af31fd55180', N'1bfeb98f-9641-47a7-bc07-ca71c1d10f3c', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F34a51485-f4e8-4fdf-ac9d-3af31fd55180?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'dd570eea-621f-4a4a-afc7-3b2c5096a10d', N'e2baef67-625c-4870-afba-8b2808291f77', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fdd570eea-621f-4a4a-afc7-3b2c5096a10d?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'295e320a-a327-425d-a15a-3b5bddea3d3b', NULL, N'1a1b148e-bc6d-4485-a417-26a694413140', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F295e320a-a327-425d-a15a-3b5bddea3d3b?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'dd04ecab-3cb1-4b6f-ae75-3c69534810bd', N'618ec696-75dc-4988-ba05-deab133e340b', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fdd04ecab-3cb1-4b6f-ae75-3c69534810bd?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'a3c139b5-6d55-4c1a-89bb-3d2a9115db6d', NULL, N'e7e3a283-c377-44cc-bd57-8a555dc93882', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fa3c139b5-6d55-4c1a-89bb-3d2a9115db6d?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'a12413e1-1052-4fb9-a378-3d5076da1f24', N'd5c5ee91-cd4a-4f95-b835-cfc918ced4af', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fa12413e1-1052-4fb9-a378-3d5076da1f24?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'37249c60-721e-45ac-af86-3e9acd5af589', NULL, N'e2d8889c-4fc4-4d9b-897b-1b231c64549f', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F37249c60-721e-45ac-af86-3e9acd5af589?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'7037582e-663d-461c-95ba-41d6eb1b1b69', N'098ee96a-fded-4429-975b-cfca68541c93', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F7037582e-663d-461c-95ba-41d6eb1b1b69?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'bdd2a542-c096-43e0-bb11-4484fe125317', N'44279e1f-dc22-4a81-adee-a6bd351cb98c', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fbdd2a542-c096-43e0-bb11-4484fe125317?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'14f07c23-8633-4985-a34a-4641e92b1f1f', N'0f6e7327-31c2-49f8-a55d-bad962c61dc1', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F14f07c23-8633-4985-a34a-4641e92b1f1f?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'643a9860-a1de-411e-8fbf-4664c25d5b69', N'e2baef67-625c-4870-afba-8b2808291f77', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F643a9860-a1de-411e-8fbf-4664c25d5b69?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'be682f63-e11b-4f85-b16c-49f87d781717', N'61fe54d1-102e-40af-b124-a6157d1f5095', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fbe682f63-e11b-4f85-b16c-49f87d781717?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'0e7f2968-e1af-48e3-bd05-4b4341bec7c6', N'b89ee58d-49a9-42eb-8de9-38279cdb7202', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F0e7f2968-e1af-48e3-bd05-4b4341bec7c6?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'a0cdb8c1-9cd0-4026-9a27-4c4e89decdb0', N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fa0cdb8c1-9cd0-4026-9a27-4c4e89decdb0?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'146ab26e-1ee8-4d5f-9056-4f8d6717fd38', N'05eae696-5b61-441f-b423-0cacc320a877', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F146ab26e-1ee8-4d5f-9056-4f8d6717fd38?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'c2d61771-ce52-4491-9a02-512e75b57279', N'618ec696-75dc-4988-ba05-deab133e340b', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fc2d61771-ce52-4491-9a02-512e75b57279?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'7a59b22a-2bd4-478b-9b55-51fc831fe77d', N'80104722-be60-46de-8eb8-d54505adc988', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F7a59b22a-2bd4-478b-9b55-51fc831fe77d?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'9bc8c66d-fa3c-4889-b40b-525a66ae2280', N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F9bc8c66d-fa3c-4889-b40b-525a66ae2280?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'c143afd8-f375-46f6-80ef-5362b23d61d9', N'618ec696-75dc-4988-ba05-deab133e340b', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fc143afd8-f375-46f6-80ef-5362b23d61d9?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'bda72bf3-ece5-46ff-a887-545e26eec7a2', N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fbda72bf3-ece5-46ff-a887-545e26eec7a2?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'b23115df-347d-468b-a4d9-548df42b6c7e', N'0f6e7327-31c2-49f8-a55d-bad962c61dc1', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fb23115df-347d-468b-a4d9-548df42b6c7e?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'c9d80e51-69b0-4264-bf83-57d94bcb832e', N'5c51a96c-390d-40ee-9f64-ef315eef4977', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fc9d80e51-69b0-4264-bf83-57d94bcb832e?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'f8eb0328-18b3-4db0-9aee-59f99aae42b2', N'17adf514-5169-497c-af56-825b9671adde', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Ff8eb0328-18b3-4db0-9aee-59f99aae42b2?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'dfdeaed9-adf0-4e07-93f0-5e0b85bf0842', NULL, N'd31d4c92-27e7-430c-bd5f-93c3bdd0d43b', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fdfdeaed9-adf0-4e07-93f0-5e0b85bf0842?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'044944f5-88b5-4c34-9843-6174aa0094c2', NULL, N'298a3d10-614f-4d19-b193-63317b5c60ab', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F044944f5-88b5-4c34-9843-6174aa0094c2?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'e587b39d-8628-4a36-9e29-65654d2fe17d', N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fe587b39d-8628-4a36-9e29-65654d2fe17d?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'04aad4af-5831-42c9-b870-666023cc6c99', N'99f1dc5f-c056-46b5-922f-bd9642d6ecdd', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F04aad4af-5831-42c9-b870-666023cc6c99?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'7f03a763-b906-4910-8085-6af7e9768515', NULL, N'55f153b4-5cc5-4aca-9932-a29e5eacf77c', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F7f03a763-b906-4910-8085-6af7e9768515?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'd8fcb23d-cc05-4ef4-871d-6b2fe7c7e085', N'4a63603c-aea3-42e5-89c6-aeef5a132743', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fd8fcb23d-cc05-4ef4-871d-6b2fe7c7e085?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'6f7df0dc-c2ef-493c-b7c2-6be0c8c45400', N'90a50eac-7623-450c-90d9-708b9d35bf9f', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F6f7df0dc-c2ef-493c-b7c2-6be0c8c45400?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'a29145e1-5868-4827-92a7-6f76e113dbd2', N'b5ccf74e-c207-47fe-8693-dcd85ce55df4', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fa29145e1-5868-4827-92a7-6f76e113dbd2?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'71d7405b-8149-403c-a3f8-73829389af93', N'b89ee58d-49a9-42eb-8de9-38279cdb7202', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F71d7405b-8149-403c-a3f8-73829389af93?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'e5ba32c0-271e-4e58-8d02-747718da00d2', N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fe5ba32c0-271e-4e58-8d02-747718da00d2?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'ec273c46-e6c0-4e8a-b505-75089e2b68ae', N'8934f72b-b8df-4d45-bad0-dc7b22cf452d', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fec273c46-e6c0-4e8a-b505-75089e2b68ae?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'd4f90b0e-ac8b-46fe-891e-77859e0251e1', N'8be691d2-6758-4d88-9a60-2beeacf9032e', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fd4f90b0e-ac8b-46fe-891e-77859e0251e1?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'e04151b2-aaef-4b97-a18d-78fc1bcc74e1', N'54428065-01a5-4b6a-bee9-ca32afbe5b61', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fe04151b2-aaef-4b97-a18d-78fc1bcc74e1?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'f0facade-5003-451a-9d92-79c44a51c48a', N'8934f72b-b8df-4d45-bad0-dc7b22cf452d', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Ff0facade-5003-451a-9d92-79c44a51c48a?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'1cc7a1d7-6e46-4a0c-9e17-79f1a3558def', N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1cc7a1d7-6e46-4a0c-9e17-79f1a3558def?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'1a57d5ee-495a-46b0-b5a9-7a59e8eaebba', N'517bbfd8-bdf0-490a-ab39-14cbfb726314', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1a57d5ee-495a-46b0-b5a9-7a59e8eaebba?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'7843ae47-98f8-4d67-a7dc-7d6b550c5371', N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F7843ae47-98f8-4d67-a7dc-7d6b550c5371?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'daf2533e-fb4d-489f-83e0-7dae2f1e811d', N'17adf514-5169-497c-af56-825b9671adde', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fdaf2533e-fb4d-489f-83e0-7dae2f1e811d?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'860a50ee-647b-4921-b4cc-8150fcea6e79', NULL, N'e0fcf573-4320-4558-9282-09c2b56717a6', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F860a50ee-647b-4921-b4cc-8150fcea6e79?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'9409957f-5ed9-4fc3-a433-826f2396e5cd', N'6ec0109b-13f8-44b2-afba-890faacfe6c4', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F9409957f-5ed9-4fc3-a433-826f2396e5cd?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'33781cef-cd77-450f-b08a-833613cb2537', NULL, N'3281a3eb-34e3-44f3-9cbc-1c06a80e328a', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F33781cef-cd77-450f-b08a-833613cb2537?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'a0ac21c9-5c59-4344-958d-860662727d9d', N'552729dd-cc94-4a35-9f13-257550ec4312', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fa0ac21c9-5c59-4344-958d-860662727d9d?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'35dca367-a922-4e69-a479-86ad897bf2d2', N'8be691d2-6758-4d88-9a60-2beeacf9032e', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F35dca367-a922-4e69-a479-86ad897bf2d2?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'1cf34a6d-7f43-4210-a9ac-8b1d1b30ddcf', N'61fe54d1-102e-40af-b124-a6157d1f5095', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1cf34a6d-7f43-4210-a9ac-8b1d1b30ddcf?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'51ade8ac-63d4-4130-810f-8e64c100c4cd', N'117227fb-4a0b-4d2d-a8c9-47024fec40bf', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F51ade8ac-63d4-4130-810f-8e64c100c4cd?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'a52ad6ea-4ae7-4f83-9d73-8ec00409c948', N'2c291c00-4cbb-4859-a667-870eac4ff447', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fa52ad6ea-4ae7-4f83-9d73-8ec00409c948?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'4a3c321d-0dfb-4f35-be80-8eee62c0befc', NULL, N'fa0c001b-4ec0-40c5-b36e-2818649cab24', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F4a3c321d-0dfb-4f35-be80-8eee62c0befc?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'07f4ade4-f518-4023-9350-8fa4d6353c0e', N'54428065-01a5-4b6a-bee9-ca32afbe5b61', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F07f4ade4-f518-4023-9350-8fa4d6353c0e?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'323c9ebb-886b-40f3-8262-9005860a8c92', N'24392438-89aa-4f53-bf4a-f688f65059d2', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F323c9ebb-886b-40f3-8262-9005860a8c92?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'3e2ca43f-0890-41a8-9352-917a23b6ec2a', N'05eae696-5b61-441f-b423-0cacc320a877', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F3e2ca43f-0890-41a8-9352-917a23b6ec2a?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'90427969-df01-4053-ba5d-92278634a564', N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F90427969-df01-4053-ba5d-92278634a564?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'76ce37e3-28a2-4812-a039-92865e70dab9', N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F76ce37e3-28a2-4812-a039-92865e70dab9?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'c0c6f996-124c-4d93-9ca9-92dc0a34de60', NULL, N'cbf36cb2-fd06-4d4c-b3f4-1f759165a2dd', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fc0c6f996-124c-4d93-9ca9-92dc0a34de60?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'fc1a9aaf-28d7-43d2-8b62-9416965d8311', N'99f1dc5f-c056-46b5-922f-bd9642d6ecdd', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Ffc1a9aaf-28d7-43d2-8b62-9416965d8311?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'78de5f13-41e8-4e73-b3c5-949309d07910', N'308f2e40-61ac-4c54-94c2-a16e3394cc65', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F78de5f13-41e8-4e73-b3c5-949309d07910?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'8fb96d42-35ac-4695-8eba-94a74c45e5be', N'9a4165da-7c4f-47b6-802e-08683d87c21d', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F8fb96d42-35ac-4695-8eba-94a74c45e5be?alt=media')
GO
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'6ae32a51-91cf-492c-a657-951804c385f4', N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F6ae32a51-91cf-492c-a657-951804c385f4?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'b66fefdd-9e5a-4c99-ba75-953b56b199ab', N'e94b1dbc-cf97-4f98-bbc2-6b07b4a1948c', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fb66fefdd-9e5a-4c99-ba75-953b56b199ab?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'b9f2e3f9-f521-4254-8d1f-978858f09f04', N'308f2e40-61ac-4c54-94c2-a16e3394cc65', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fb9f2e3f9-f521-4254-8d1f-978858f09f04?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'17a166a2-2e96-4cca-8213-9906fdb909db', N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F17a166a2-2e96-4cca-8213-9906fdb909db?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'62ea60fc-fcd6-4d0a-aafb-9cdf6d3a27c0', N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F62ea60fc-fcd6-4d0a-aafb-9cdf6d3a27c0?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'00d7d234-969c-4105-bdae-9f790c609b89', N'44279e1f-dc22-4a81-adee-a6bd351cb98c', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F00d7d234-969c-4105-bdae-9f790c609b89?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'ef2fe244-4e08-40a4-a0e0-9fcf5f2d9536', N'dbba0a8c-b3d2-44fb-b5db-0a401b9429d8', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fef2fe244-4e08-40a4-a0e0-9fcf5f2d9536?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'cf4ecccf-3e38-4083-b585-a123dd94dc20', NULL, N'e2d8889c-4fc4-4d9b-897b-1b231c64549f', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fcf4ecccf-3e38-4083-b585-a123dd94dc20?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'78f03fdd-7fe6-4c56-9972-a2607e291472', N'dbba0a8c-b3d2-44fb-b5db-0a401b9429d8', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F78f03fdd-7fe6-4c56-9972-a2607e291472?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'246eb324-31d8-46ce-97cc-a71d2fb503ac', N'618ec696-75dc-4988-ba05-deab133e340b', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F246eb324-31d8-46ce-97cc-a71d2fb503ac?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'3ec1f156-9aaa-48e8-9c4d-a84a6c658bd6', N'05eae696-5b61-441f-b423-0cacc320a877', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F3ec1f156-9aaa-48e8-9c4d-a84a6c658bd6?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'98df71e2-b0a8-45d7-bc17-a87e1f744f98', N'11b1a93f-1b1d-4d61-acf5-ad4b723889a4', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F98df71e2-b0a8-45d7-bc17-a87e1f744f98?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'41086c90-9e03-442a-adf4-ad6fd33d4de2', NULL, N'298a3d10-614f-4d19-b193-63317b5c60ab', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F41086c90-9e03-442a-adf4-ad6fd33d4de2?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'55c3d5e4-6130-4b4d-a0d2-adf2719d3e83', N'69cb2891-4b1f-4360-b154-730e62cc20c6', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F55c3d5e4-6130-4b4d-a0d2-adf2719d3e83?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'0cd90a5e-1352-4738-9bf3-b24a83e8375d', N'80104722-be60-46de-8eb8-d54505adc988', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F0cd90a5e-1352-4738-9bf3-b24a83e8375d?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'aee5747f-f8db-4cf5-8d33-b24ca4ef7468', N'd77dfc4d-3549-41da-a568-8ccb8e6eadec', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Faee5747f-f8db-4cf5-8d33-b24ca4ef7468?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'a2d02df1-be12-4048-9fa0-b387423345c7', NULL, N'e7e3a283-c377-44cc-bd57-8a555dc93882', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fa2d02df1-be12-4048-9fa0-b387423345c7?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'508c4d59-6bf5-4e16-b2ef-b826912d4c93', NULL, N'e7e3a283-c377-44cc-bd57-8a555dc93882', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F508c4d59-6bf5-4e16-b2ef-b826912d4c93?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'22fd42f8-c885-4b67-87b5-ba8917b81317', N'b5ccf74e-c207-47fe-8693-dcd85ce55df4', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F22fd42f8-c885-4b67-87b5-ba8917b81317?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'ef5dc7d9-4b97-4183-bbe7-bbadacf3fbde', N'517bbfd8-bdf0-490a-ab39-14cbfb726314', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fef5dc7d9-4b97-4183-bbe7-bbadacf3fbde?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'57ef008f-aeb8-4e02-a507-bbe27cb413b2', NULL, N'55f153b4-5cc5-4aca-9932-a29e5eacf77c', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F57ef008f-aeb8-4e02-a507-bbe27cb413b2?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'2f344fcf-a894-43e2-a270-bd3c0566ce9c', N'4a63603c-aea3-42e5-89c6-aeef5a132743', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F2f344fcf-a894-43e2-a270-bd3c0566ce9c?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'a3ca9aa0-aa91-4eb7-9685-bf6d92e748d6', NULL, N'3281a3eb-34e3-44f3-9cbc-1c06a80e328a', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fa3ca9aa0-aa91-4eb7-9685-bf6d92e748d6?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'1f9822a7-98ec-4518-80eb-bfae6cadd319', NULL, N'3281a3eb-34e3-44f3-9cbc-1c06a80e328a', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F1f9822a7-98ec-4518-80eb-bfae6cadd319?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'7cfa45f2-11d6-4210-9f94-c1e8afe383f5', NULL, N'298a3d10-614f-4d19-b193-63317b5c60ab', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F7cfa45f2-11d6-4210-9f94-c1e8afe383f5?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'dec8fd78-0090-4d8b-8540-c21bb37e9349', N'098ee96a-fded-4429-975b-cfca68541c93', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fdec8fd78-0090-4d8b-8540-c21bb37e9349?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'7f8e4c1e-6d2d-4373-8169-c6c15cef912f', NULL, N'd31d4c92-27e7-430c-bd5f-93c3bdd0d43b', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F7f8e4c1e-6d2d-4373-8169-c6c15cef912f?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'980579dd-4a93-43b8-b09b-c8a680bd3773', N'24392438-89aa-4f53-bf4a-f688f65059d2', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F980579dd-4a93-43b8-b09b-c8a680bd3773?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'd12ab093-c4d6-4add-8afb-cce52098c638', NULL, N'ca9eeb5b-5f99-4f3d-807f-5f71ed013d59', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fd12ab093-c4d6-4add-8afb-cce52098c638?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'0a32e638-b667-4702-b1c6-ccee4514eafe', N'9a4165da-7c4f-47b6-802e-08683d87c21d', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F0a32e638-b667-4702-b1c6-ccee4514eafe?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'720a7fd6-d0c6-4cfa-87e8-d1ab797f9d63', NULL, N'ca9eeb5b-5f99-4f3d-807f-5f71ed013d59', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F720a7fd6-d0c6-4cfa-87e8-d1ab797f9d63?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'9f849c81-46fc-4ce8-b8a2-d27535e95c54', N'5c51a96c-390d-40ee-9f64-ef315eef4977', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F9f849c81-46fc-4ce8-b8a2-d27535e95c54?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'bdf70191-746f-442e-ae34-d37e45d9c909', N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fbdf70191-746f-442e-ae34-d37e45d9c909?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'4fd5e64d-b788-4e8a-9b59-d61de82caa76', N'e94b1dbc-cf97-4f98-bbc2-6b07b4a1948c', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F4fd5e64d-b788-4e8a-9b59-d61de82caa76?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'26711a43-49b0-47a3-8128-d89915df76c5', N'0a6ae4dc-15ee-451c-84b8-52630b774063', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F26711a43-49b0-47a3-8128-d89915df76c5?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'37de5a3e-943a-4cff-a330-db32526892a0', NULL, N'e0fcf573-4320-4558-9282-09c2b56717a6', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F37de5a3e-943a-4cff-a330-db32526892a0?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'eba2aa60-8ed1-4ddb-8ab2-de9727e50afb', N'83d51422-5756-4490-a774-8eec37a0ac49', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Feba2aa60-8ed1-4ddb-8ab2-de9727e50afb?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'e29f0841-9bba-407b-9e3b-e1d6b5d66c54', N'83d51422-5756-4490-a774-8eec37a0ac49', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fe29f0841-9bba-407b-9e3b-e1d6b5d66c54?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'76dbcb43-49be-49c6-944d-e527b5484920', N'd5c5ee91-cd4a-4f95-b835-cfc918ced4af', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F76dbcb43-49be-49c6-944d-e527b5484920?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'edbaa6d6-6dbf-495a-b638-e84513730cf2', NULL, N'fa0c001b-4ec0-40c5-b36e-2818649cab24', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fedbaa6d6-6dbf-495a-b638-e84513730cf2?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'106bf043-6631-4322-9483-eca5e674dedd', N'e94b1dbc-cf97-4f98-bbc2-6b07b4a1948c', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F106bf043-6631-4322-9483-eca5e674dedd?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'559de6a5-eb21-4ab5-9baf-edf17c4d0c24', N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F559de6a5-eb21-4ab5-9baf-edf17c4d0c24?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'359aa672-fa58-47d8-bf07-eefe26dcef2c', NULL, N'55f153b4-5cc5-4aca-9932-a29e5eacf77c', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F359aa672-fa58-47d8-bf07-eefe26dcef2c?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'd333d8ba-23cb-4bf3-831b-efbfd296994c', N'9a4165da-7c4f-47b6-802e-08683d87c21d', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fd333d8ba-23cb-4bf3-831b-efbfd296994c?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'38dbb24b-cf6a-46f8-8df1-f30e984b9088', N'83d51422-5756-4490-a774-8eec37a0ac49', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F38dbb24b-cf6a-46f8-8df1-f30e984b9088?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'a5245913-e292-47fd-a46b-f31502abf674', N'2c291c00-4cbb-4859-a667-870eac4ff447', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Fa5245913-e292-47fd-a46b-f31502abf674?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'55cef26c-c601-4b19-9f2b-f999fb69a4ce', NULL, N'e7e3a283-c377-44cc-bd57-8a555dc93882', 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F55cef26c-c601-4b19-9f2b-f999fb69a4ce?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'989c91ff-ba8c-432c-84e4-f9a2ec0735a0', N'11b1a93f-1b1d-4d61-acf5-ad4b723889a4', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F989c91ff-ba8c-432c-84e4-f9a2ec0735a0?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'746ab210-9573-4cf3-82f6-fd791fd91f28', N'99f1dc5f-c056-46b5-922f-bd9642d6ecdd', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2F746ab210-9573-4cf3-82f6-fd791fd91f28?alt=media')
INSERT [dbo].[Image] ([Id], [MotobikeProductId], [RepairServiceId], [Thumbnail], [ImageUrl]) VALUES (N'fcb2f3a3-9d3a-417a-8dbf-fee31673742b', N'697d7a94-d584-4328-b170-90734611c5fe', NULL, 0, N'https://firebasestorage.googleapis.com/v0/b/arths-45678.appspot.com/o/attachments%2Ffcb2f3a3-9d3a-417a-8dbf-fee31673742b?alt=media')
GO

INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'2486d46d-47f5-4783-88e4-02bb6418cbab', N'b89ee58d-49a9-42eb-8de9-38279cdb7202', CAST(N'2023-10-06T14:42:23.123' AS DateTime), 150000, CAST(N'2023-10-06T14:42:29.093' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'e4d7141b-df63-48ac-9b3d-030ffc956375', N'1bfeb98f-9641-47a7-bc07-ca71c1d10f3c', CAST(N'2023-10-06T09:25:44.900' AS DateTime), 594000, CAST(N'2023-10-06T09:25:48.990' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'578320a0-64e8-427d-aeb1-0584d4a22d03', N'2e71f703-aac0-4fa3-90ce-1b5dffe652b8', CAST(N'2023-10-06T14:44:30.163' AS DateTime), 1300000, CAST(N'2023-10-06T14:44:35.000' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'dd8369c9-9f7a-4191-a324-0eb47749d7e7', N'8be691d2-6758-4d88-9a60-2beeacf9032e', CAST(N'2023-10-06T09:02:40.087' AS DateTime), 2900000, CAST(N'2023-10-06T09:02:46.103' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'cf223bef-2f3d-4c92-8c47-11a67945b346', N'90a50eac-7623-450c-90d9-708b9d35bf9f', CAST(N'2023-10-06T03:24:25.420' AS DateTime), 190000, CAST(N'2023-10-06T03:24:29.413' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'd89db07d-5bc1-43f6-bead-159e857774cb', N'31433c2f-5ec2-4537-af00-2c2c214d5ffe', CAST(N'2023-10-05T08:22:39.560' AS DateTime), 260000, CAST(N'2023-10-05T08:22:44.930' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'63fbf6da-199c-4c2f-842e-1bf3462cc778', N'67cbbb9a-63ea-4f01-8d2e-3df2cb859dea', CAST(N'2023-10-06T14:35:36.867' AS DateTime), 350000, CAST(N'2023-10-06T14:35:40.620' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'221ff7e4-8e56-4e6a-a6b6-2761688c7c01', N'e94b1dbc-cf97-4f98-bbc2-6b07b4a1948c', CAST(N'2023-10-06T09:05:52.190' AS DateTime), 2020000, CAST(N'2023-10-06T09:06:00.383' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'3f564e19-0125-472b-8b2f-312617735805', N'1e2a69b5-70cf-4545-9451-a95d2267c6e1', CAST(N'2023-10-06T12:46:44.047' AS DateTime), 165000, CAST(N'2023-10-06T12:46:51.130' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'7b965b97-a918-40e1-aea9-3461bd23771e', N'80104722-be60-46de-8eb8-d54505adc988', CAST(N'2023-10-06T14:39:00.480' AS DateTime), 75000, CAST(N'2023-10-06T14:39:07.727' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'61983231-1b77-4f3e-bda6-3c57cc36808d', N'05eae696-5b61-441f-b423-0cacc320a877', CAST(N'2023-10-06T14:26:25.027' AS DateTime), 350000, CAST(N'2023-10-06T14:26:31.183' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'b6a74f94-5778-4db8-95f8-468f8824c5f7', N'4a63603c-aea3-42e5-89c6-aeef5a132743', CAST(N'2023-10-06T09:28:21.350' AS DateTime), 686000, CAST(N'2023-10-06T09:28:25.510' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'e736aecc-550a-4447-98ba-55ff3a3124dc', N'd5c5ee91-cd4a-4f95-b835-cfc918ced4af', CAST(N'2023-11-09T07:04:58.580' AS DateTime), 11111, CAST(N'2023-11-09T07:05:01.553' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'a6c2da8f-6d5f-4784-b5c7-566aba093f68', N'61fe54d1-102e-40af-b124-a6157d1f5095', CAST(N'2023-10-06T03:20:27.443' AS DateTime), 380000, CAST(N'2023-10-06T03:20:35.030' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'd77471bf-0303-4d15-a15d-6070cf2ddaf8', N'9a4165da-7c4f-47b6-802e-08683d87c21d', CAST(N'2023-10-15T05:06:42.930' AS DateTime), 1120000, CAST(N'2023-10-15T05:06:43.480' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'299227e9-5204-4503-aaf0-630c01869197', N'8934f72b-b8df-4d45-bad0-dc7b22cf452d', CAST(N'2023-10-06T07:40:15.897' AS DateTime), 145000, CAST(N'2023-10-06T07:40:21.377' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'75986c54-c4c5-430f-982a-679a9ab6cd36', N'd5c5ee91-cd4a-4f95-b835-cfc918ced4af', CAST(N'2023-11-12T12:52:40.423' AS DateTime), 11111, CAST(N'2023-11-12T12:52:41.077' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'e9c4db8c-1b6e-4ecf-9266-6af7f2538261', N'83d51422-5756-4490-a774-8eec37a0ac49', CAST(N'2023-10-05T08:39:01.373' AS DateTime), 260000, CAST(N'2023-10-05T08:39:06.967' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'956efb78-3345-4aed-b8cc-730ffdc360ef', N'44279e1f-dc22-4a81-adee-a6bd351cb98c', CAST(N'2023-10-06T07:30:40.327' AS DateTime), 125000, CAST(N'2023-10-06T07:30:45.650' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'd4686774-247f-4660-bd3d-75db4639cd86', N'117227fb-4a0b-4d2d-a8c9-47024fec40bf', CAST(N'2023-10-05T08:51:51.557' AS DateTime), 945000, CAST(N'2023-10-05T08:51:57.780' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'2aec94d3-33e5-4952-8b3d-7dc44989c795', N'b5ccf74e-c207-47fe-8693-dcd85ce55df4', CAST(N'2023-10-04T13:29:16.833' AS DateTime), 125000, CAST(N'2023-10-04T13:29:20.003' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'dc6b5e2b-a055-462d-b191-8772d31e41dd', N'11b1a93f-1b1d-4d61-acf5-ad4b723889a4', CAST(N'2023-10-05T06:10:36.413' AS DateTime), 380000, CAST(N'2023-10-05T06:10:42.667' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'd203d9d0-3e30-4a5f-8489-892697f31e81', N'69cb2891-4b1f-4360-b154-730e62cc20c6', CAST(N'2023-10-06T07:23:15.157' AS DateTime), 85000, CAST(N'2023-10-06T07:23:20.480' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'8a3b709d-dd6c-40f3-8981-93c547e2e915', N'308f2e40-61ac-4c54-94c2-a16e3394cc65', CAST(N'2023-10-06T14:52:09.633' AS DateTime), 220000, CAST(N'2023-10-06T14:52:15.317' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'96db0e18-75c3-4ec1-9a71-9901fdf052c6', N'0f6e7327-31c2-49f8-a55d-bad962c61dc1', CAST(N'2023-11-27T12:17:55.137' AS DateTime), 120000, CAST(N'2023-11-27T12:17:57.877' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'b0fc54f9-998a-4f28-995d-aa7f1f51f673', N'7d08f9f3-0c77-464a-83a9-b425b4dbf20d', CAST(N'2023-10-06T15:01:02.290' AS DateTime), 250000, CAST(N'2023-10-06T15:01:04.923' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'7a506213-1169-4899-a249-ab4691afab0e', N'517bbfd8-bdf0-490a-ab39-14cbfb726314', CAST(N'2023-10-06T09:33:03.100' AS DateTime), 610000, CAST(N'2023-10-06T09:33:07.173' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'e217cb40-ae7f-42c1-9bec-b06428f2576c', N'618ec696-75dc-4988-ba05-deab133e340b', CAST(N'2023-10-05T06:40:21.467' AS DateTime), 550000, CAST(N'2023-10-05T06:40:28.897' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'd01fbcd3-31cc-4377-85ff-b52d400654c7', N'23ef7d64-0d0f-42f9-a5de-64012e53df3d', CAST(N'2023-10-06T12:57:38.113' AS DateTime), 300000, CAST(N'2023-10-06T12:57:42.227' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'daf9f1ec-fcf4-48b3-bbcd-b8635c352181', N'2c291c00-4cbb-4859-a667-870eac4ff447', CAST(N'2023-10-06T07:44:28.860' AS DateTime), 175000, CAST(N'2023-10-06T07:44:34.753' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'6612045c-7d86-483a-9dca-b8758ada628e', N'3c68deb3-8753-4d91-ba4e-55d4ca554ac3', CAST(N'2023-10-06T13:15:22.933' AS DateTime), 180000, CAST(N'2023-10-06T13:15:26.703' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'f22e3c2a-40d2-4a07-ac89-bd22b0a54226', N'17adf514-5169-497c-af56-825b9671adde', CAST(N'2023-10-06T07:57:20.727' AS DateTime), 1050000, CAST(N'2023-10-06T07:57:26.920' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'577e2881-62e0-47e0-9f0e-c2c198755388', N'd77dfc4d-3549-41da-a568-8ccb8e6eadec', CAST(N'2023-10-06T09:16:37.500' AS DateTime), 1085000, CAST(N'2023-10-06T09:16:39.603' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'75c5dbc7-c9b7-41b1-a791-c4366d5748cd', N'697d7a94-d584-4328-b170-90734611c5fe', CAST(N'2023-10-05T06:26:05.053' AS DateTime), 400000, CAST(N'2023-10-05T06:26:09.877' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'ff7942f4-3b9e-4bda-91cc-c6f258357cb4', N'5c51a96c-390d-40ee-9f64-ef315eef4977', CAST(N'2023-10-06T14:55:43.410' AS DateTime), 90000, CAST(N'2023-10-06T14:55:47.283' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'81e836a4-a8bc-4f9a-9a02-c75d29af7333', N'54428065-01a5-4b6a-bee9-ca32afbe5b61', CAST(N'2023-10-05T07:55:38.027' AS DateTime), 315000, CAST(N'2023-10-05T07:55:43.167' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'09985f66-38fa-4edb-83c7-ccd5fdec7500', N'e2baef67-625c-4870-afba-8b2808291f77', CAST(N'2023-10-06T14:37:23.347' AS DateTime), 25000, CAST(N'2023-10-06T14:37:28.427' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'5da801ca-e3f7-48a5-8dc7-d4f3bd5b4525', N'99f1dc5f-c056-46b5-922f-bd9642d6ecdd', CAST(N'2023-10-06T09:10:32.457' AS DateTime), 3400000, CAST(N'2023-10-06T09:10:38.640' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'e0bb8240-c50e-4b5b-a80b-dd5d13e03571', N'24392438-89aa-4f53-bf4a-f688f65059d2', CAST(N'2023-10-06T08:58:55.507' AS DateTime), 2850000, CAST(N'2023-10-06T08:59:00.827' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'23cd837b-657b-4170-970b-dfd96a3584de', N'fa425ec8-9ef0-48c8-a950-9b1ffe7bddb3', CAST(N'2023-10-06T09:33:47.393' AS DateTime), 1060000, CAST(N'2023-10-06T09:33:51.347' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'd324465c-ce35-4f63-a251-e3919165cefc', N'd5c5ee91-cd4a-4f95-b835-cfc918ced4af', CAST(N'2023-12-09T16:31:43.330' AS DateTime), 90000, CAST(N'2023-12-09T23:31:43.400' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'c7f9e424-adb5-4850-8ae2-e4b99a73860c', N'0a6ae4dc-15ee-451c-84b8-52630b774063', CAST(N'2023-10-06T14:40:32.370' AS DateTime), 150000, CAST(N'2023-10-06T14:40:34.107' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'eca961a3-a0b6-4703-9808-e92d18fee3b2', N'dbba0a8c-b3d2-44fb-b5db-0a401b9429d8', CAST(N'2023-10-06T14:21:23.590' AS DateTime), 1200000, CAST(N'2023-10-06T14:21:30.303' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'c1447f48-fc0b-4bfc-a8cf-ea49424b1c0d', N'552729dd-cc94-4a35-9f13-257550ec4312', CAST(N'2023-10-06T13:08:17.270' AS DateTime), 350000, CAST(N'2023-10-06T13:08:21.027' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'9fd7aa77-a4fb-45da-a769-eae62b192cdf', N'8356c843-6a5c-4ebe-88b2-20e2def76d3b', CAST(N'2023-10-06T14:33:59.580' AS DateTime), 400000, CAST(N'2023-10-06T14:34:05.383' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'9f20ad40-6a2c-4c91-a60a-eece377bb9d1', N'9a4165da-7c4f-47b6-802e-08683d87c21d', CAST(N'2023-10-05T08:46:28.937' AS DateTime), 1125000, CAST(N'2023-10-05T08:46:34.797' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'167682b2-8063-4640-a7a0-f31318145281', N'6ec0109b-13f8-44b2-afba-890faacfe6c4', CAST(N'2023-10-06T14:58:24.847' AS DateTime), 1180000, CAST(N'2023-10-06T14:58:30.093' AS DateTime))
INSERT [dbo].[MotobikeProductPrice] ([Id], [MotobikeProductId], [DateApply], [PriceCurrent], [CreateAt]) VALUES (N'e0b31c5d-ebb4-44da-8b9e-fda2a2201c0c', N'098ee96a-fded-4429-975b-cfca68541c93', CAST(N'2023-10-06T13:05:54.843' AS DateTime), 275000, CAST(N'2023-10-06T13:06:02.303' AS DateTime))
GO

INSERT [dbo].[RevenueStore] ([Id], [OrderId], [TotalAmount], [Type], [PaymentMethod], [Status], [UpdateAt], [TransactionDate]) VALUES (N'231205_OR35E76522', N'OR35E76522', 260000, N'Thanh toán hóa đơn mua hàng - sửa chữa của cửa hàng Thanh Huy', N'Tiền mặt', N'Thành công', NULL, CAST(N'2023-12-05T13:00:02.343' AS DateTime))
INSERT [dbo].[RevenueStore] ([Id], [OrderId], [TotalAmount], [Type], [PaymentMethod], [Status], [UpdateAt], [TransactionDate]) VALUES (N'231205_OR494BA715', N'OR494BA715', 3310000, N'Thanh toán hóa đơn mua hàng - sửa chữa của cửa hàng Thanh Huy', N'Tiền mặt', N'Thành công', NULL, CAST(N'2023-12-05T08:37:49.637' AS DateTime))
INSERT [dbo].[RevenueStore] ([Id], [OrderId], [TotalAmount], [Type], [PaymentMethod], [Status], [UpdateAt], [TransactionDate]) VALUES (N'231205_OR796084B4', N'OR796084B4', 872000, N'Thanh toán hóa đơn mua hàng - sửa chữa của cửa hàng Thanh Huy', N'Tiền mặt', N'Thành công', NULL, CAST(N'2023-12-05T08:16:59.480' AS DateTime))
INSERT [dbo].[RevenueStore] ([Id], [OrderId], [TotalAmount], [Type], [PaymentMethod], [Status], [UpdateAt], [TransactionDate]) VALUES (N'231205194203961_OR3751B099', N'OR3751B099', 3005000, N'Thanh toán hóa đơn của cửa hàng.', N'VNPay', N'Thành công', CAST(N'2023-12-05T12:43:00.100' AS DateTime), CAST(N'2023-12-05T12:42:03.980' AS DateTime))
INSERT [dbo].[RevenueStore] ([Id], [OrderId], [TotalAmount], [Type], [PaymentMethod], [Status], [UpdateAt], [TransactionDate]) VALUES (N'231205202932451_OR1BAB0D1C', N'OR1BAB0D1C', 1095000, N'Thanh toán hóa đơn của cửa hàng.', N'VNPay', N'Thành công', CAST(N'2023-12-05T13:30:06.633' AS DateTime), CAST(N'2023-12-05T13:29:32.487' AS DateTime))
GO
INSERT [dbo].[Configuration] ([Id], [TotalStaff], [WorkHours], [ServiceTime], [NonBookingPercentage], [ShippingMoney]) VALUES (N'config', 10, 2, 2, 50, 20000)
GO